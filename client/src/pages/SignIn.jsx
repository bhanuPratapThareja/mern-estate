import { useState, useReducer } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const INITIAL_STATE = {
  formData: {
    email: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    }
  },
  formError: null,
  loading: false
}

const reducer = (state, action) => {
  const { name, value } = action.payload
  const newFormState = { ...state }
  switch (action.type) {
    case 'INPUT_CHANGE':
      newFormState['formData'][name].value = value
      return newFormState
    default:
      return state
  }
}

export default function SignIn() {
  const [formStata, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const payload = {
      name: e.target.name,
      value: e.target.value
    }
    dispatch({ type: 'INPUT_CHANGE', payload })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const data = {
      email: formStata.formData.email.value,
      password: formStata.formData.password.value
    }

    try {
      await axios.post('/api/auth/signin', data)
      navigate('/')
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          name="email"
          value={formStata.formData.email.value}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          name="password"
          value={formStata.formData.password.value}
          onChange={handleChange}
        />
        <button type='submit' className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <button type='button' className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">
          Sign In With Google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
