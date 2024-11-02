import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import OAuth from '../components/OAuth';
import { signInUser } from '../store';
import { useForm } from '../hooks/form-hook';
import { VALIDATORS } from '../utils/types';

const INITIAL_FORM_STATE = {
  inputs: {
    email: {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      displayName: 'Email',
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
      validations: [VALIDATORS.REQUIRED]
    }
  },
  isFormValid: null
}

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, signedUpUser } = useSelector(state => state.user)
  const [formState, changeHandler, blurHandler, formValidateHandler, updateFormHandler, formResetHandler] = useForm(INITIAL_FORM_STATE)

  useEffect(() => {
    formResetHandler()
    if(signedUpUser) {
      updateFormHandler(signedUpUser)
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    formValidateHandler()
    if(!formState.isFormValid) {
      return
    }

    const data = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    }
    dispatch(signInUser(data))
      .unwrap()
      .then(() => {
        formResetHandler()
        navigate('/')
      })
  }

  const { email, password } = formState.inputs

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
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
        {email.error && <p className='text-sm text-red-700 font-semibold ml-1'>{email.error}</p>}

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
         {password.error && <p className='text-sm text-red-700 font-semibold ml-1'>{password.error}</p>}

        <button type='submit' className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
    </div>
  );
}
