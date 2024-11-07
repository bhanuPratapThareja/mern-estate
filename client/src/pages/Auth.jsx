import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import OAuth from '../components/OAuth';
import Button from '../shared/Button'
import FormError from '../shared/FormError';

import { authUser } from '../store';
import { useForm } from '../hooks/form-hook';
import { ERROR, SIGN_IN, SIGN_UP, SUCCESS, VALIDATORS } from '../utils/types';
import { toastSliceActions } from '../store';

const INITIAL_FORM_STATE = {
    inputs: {
      email: {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        displayName: 'Email ID',
        value: '',
        error: '',
        touched: false,
        validations: [VALIDATORS.REQUIRED, VALIDATORS.EMAIL]
      },
      password: {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        displayName: 'Password',
        value: '',
        error: '',
        touched: false,
        minLength: 8,
        maxLength: 16,
        validations: []
      }
    },
    isFormValid: false,
}

const userName = {
  name: 'username',
  type: 'text',
  placeholder: 'User Name',
  displayName: 'User Name',
  value: '',
  error: '',
  touched: false,
  minLength: 4,
  maxLength: 20,
  validations: [VALIDATORS.REQUIRED, VALIDATORS.MIN_LENGTH, VALIDATORS.MAX_LENGTH]
}

export default function Auth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [mode, setMode] = useState(SIGN_IN)

    const { loading, error, signedUpUser } = useSelector(state => state.user)
    const { formState, changeHandler, blurHandler, formValidateHandler, formUpdateHandler, formResetHandler } = useForm(INITIAL_FORM_STATE)

    useEffect(() => {
        if(mode === SIGN_UP) {
          const signUpFormState = INITIAL_FORM_STATE
          signUpFormState.inputs.username = userName
          formResetHandler(signUpFormState)
          // for(let key in signUpFormState.inputs) {
          //   formUpdateHandler({ [key]: signUpFormState.inputs[key].value })
          // }
        }

        if(mode === SIGN_IN) {
          const signInFormState = INITIAL_FORM_STATE
          delete signInFormState.inputs.username
          formResetHandler(signInFormState)
          // for(let key in signInFormState.inputs) {
          //   if(key === 'password') continue;
          //   formUpdateHandler({ [key]: signInFormState.inputs[key].value })
          // }
        }
        
        if(mode === SIGN_IN && signedUpUser) {
          formUpdateHandler({ email: signedUpUser.email })
        }

      }, [mode])

    const handleAuthMode = () => {
      const authMode = mode === SIGN_IN ? SIGN_UP : SIGN_IN
      setMode(authMode)
    }

    const handleSubmit = async e => {
      e.preventDefault()
      formValidateHandler()
      if(!formState.isFormValid) {
        return
      }

      const user = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      }
      if(mode === SIGN_UP) {
        user.username = formState.inputs.username.value
      }

      dispatch(authUser({ user, mode }))
        .unwrap()
        .then((res) => {
          console.log('success: ', res)
          if(mode === SIGN_IN) {
            navigate('/')
          } else {
            setMode(SIGN_IN)
            dispatch(toastSliceActions.showToast({ type: SUCCESS, header: res.status, body: res.message }))
          }
      
        })
        .catch(err => {
          console.log('catch: ', err)
          dispatch(toastSliceActions.showToast({ type: ERROR, header: err.response.data.status, body: err.response.data.message }))
        })
    }
    const { username, email, password } = formState.inputs

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign {mode === SIGN_IN ? 'In' : 'Up' }</h1>
            
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {mode !== SIGN_IN  && <>
                  <input
                  type="text"
                    className="border p-3 rounded-lg"
                    placeholder={username?.placeholder}
                    id={username?.name}
                    name={username?.name}
                    value={username?.value || ''}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                  />
                  {username?.error && <FormError message={username?.error} /> }
                </>}
            <input
                type="email"
                className="border p-3 rounded-lg"
                placeholder={email.placeholder}
                id={email.name}
                name={email.name}
                value={email.value}
                onChange={changeHandler}
                onBlur={blurHandler}
                />
                {email.error && <FormError message={email.error} /> }

                <input
                type="password"
                className="border p-3 rounded-lg"
                placeholder={password.placeholder}
                id={password.name}
                name={password.name}
                value={password.value}
                minLength={password.minLength}
                onChange={changeHandler}
                onBlur={blurHandler}
                />
                {password.error && <FormError message={password.error} /> }
                
                <Button type="submit" text={loading ? 'Loading...' : mode === SIGN_IN ? 'Sing In' : 'Sign Up'} className="bg-slate-700" />
                <OAuth />
            </form>
      
            <div className="flex gap-2 mt-5">
                <p>{mode === SIGN_IN ? 'Dont have an account?' : 'Already have an account?'}</p>
                <button onClick={handleAuthMode} className='text-blue-700 font-semibold underline'>{mode === SIGN_IN ? 'Sign Up' : 'Sign In'}</button>
            </div>
        </div>
    )
}
