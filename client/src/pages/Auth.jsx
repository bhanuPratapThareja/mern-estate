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
        validations: []
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
          // formUpdateHandler({ email: '' })
        }

        if(mode === SIGN_IN) {
          const signInFormState = INITIAL_FORM_STATE
          delete signInFormState.inputs.username
          formResetHandler(signInFormState)
          formUpdateHandler({ email: signedUpUser.email })
        }
        
        // if(mode === SIGN_IN && signedUpUser) {
        //   formUpdateHandler({ email: signedUpUser.email })
        // }

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
      <div className='flex justify-center'>

        <div className="flex flex-col justify-center bg-white/50 backdrop-blur-sm rounded-lg p-8 gap-4 min-h-[60%] absolute
                        w-[90%] translate-y-[30%]
                        sm:w-[50%]
                        md:w-[40%] 
                        lg:w-[25%] lg:translate-x-[100%] lg:translate-y-[10%]">
            
            
            <h1 className="text-xl text-slate-800 font-semibold ml-1">Sign {mode === SIGN_IN ? 'In' : 'Up' }</h1>
            
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 h-full">
              {mode !== SIGN_IN  && <>
                <input
                    type="text"
                    className="border p-2 rounded-md text-sm text-slate-700"
                    placeholder={username?.placeholder}
                    id={username?.name}
                    name={username?.name}
                    value={username?.value || ''}
                    disabled={loading}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                  />
                  {username?.error && <FormError message={username?.error} /> }
                </>}
                <input
                  type="email"
                  className="border p-2 rounded-md text-sm text-slate-700"
                  placeholder={email.placeholder}
                  id={email.name}
                  name={email.name}
                  value={email.value}
                  disabled={loading}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                />
                {email.error && <FormError message={email.error} /> }

                <input
                  type="password"
                  className="border p-2 rounded-md text-sm text-slate-700"
                  placeholder={password.placeholder}
                  id={password.name}
                  name={password.name}
                  value={password.value}
                  minLength={password.minLength}
                  disabled={loading}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                />
                {password.error && <FormError message={password.error} /> }
                
                <Button type="submit" disabled={loading} text={loading ? 'Please Wait' : mode === SIGN_IN ? 'Sign In' : 'Sign Up'} className="bg-slate-700" />
                <OAuth loading={loading} />

                <div className="flex gap-2 ml-1 text-xs">
                  <p>{mode === SIGN_IN ? 'Dont have an account?' : 'Already have an account?'}</p>
                  <button type='button' onClick={handleAuthMode} className='text-blue-900 font-semibold underline text-nowrap'>{mode === SIGN_IN ? 'Sign Up' : 'Sign In'}</button>
            </div>

            </form>
      
        </div>
          
          <div id="login-background"></div>
      </div>
    )
}
