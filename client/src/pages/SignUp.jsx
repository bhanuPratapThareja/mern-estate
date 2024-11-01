import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

import OAuth from '../components/OAuth';
import { useForm } from '../hooks/form-hook'
import { VALIDATORS } from '../utils/types';

const INITIAL_FORM_STATE = {
  inputs: {
    username: {
      name: 'username',
      placeholder: 'User Name',
      displayName: 'User Name',
      value: '',
      error: '',
      touched: false,
      validations: [VALIDATORS.REQUIRED]
    },
    email: {
      name: 'email',
      placeholder: 'Email',
      displayName: 'Email ID',
      value: '',
      error: '',
      touched: false,
      validations: [VALIDATORS.REQUIRED, VALIDATORS.EMAIL]
    },
    password: {
      name: 'password',
      placeholder: 'Password',
      displayName: 'Password',
      value: '',
      error: '',
      touched: false,
      minLength: 8,
      validations: [VALIDATORS.REQUIRED, VALIDATORS.MIN_LENGTH, VALIDATORS.ALPHA_NUMERIC]
    }
  },
  formError: null,
}

export default function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formState, changeHandler, blurHandler] = useForm(INITIAL_FORM_STATE) 

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const data = {
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    }

    console.log(data)
    
    try {
      await axios.post('/api/auth/signup', data)
      navigate('/sign-in')
    } catch (error) {
      console.log('sign up err: ', error)
    } finally {
      setLoading(false)
    }
  }

  const { username, email, password } = formState.inputs
// console.log(email)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder={username.placeholder}
          id={username.name}
          name={username.name}
          value={username.value}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        {username.error && <p className='text-sm text-red-700 font-semibold ml-1'>{username.error}</p>}

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

        <button type='submit' disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>

        <OAuth />
      </form>
      
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
    </div>
  );
}
