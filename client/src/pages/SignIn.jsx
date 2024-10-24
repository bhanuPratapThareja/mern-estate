import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import { signInUser } from '../store';
import OAuth from '../components/OAuth';

const INITIAL_STATE = {
  email: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  },
  formError: null,
  loading: false
}

const reducer = (state, action) => {
  const { name, value } = action.payload
  const newFormState = { ...state }
  switch (action.type) {
    case 'INPUT_CHANGE':
      newFormState[name].value = value
      return newFormState
    default:
      return state
  }
}

export default function SignIn() {
  const [formState, dispatchFunction] = useReducer(reducer, INITIAL_STATE)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading } = useSelector(state => state.user)

  const handleChange = e => {
    const { name, value } = e.target
    const payload = { name, value }
    dispatchFunction({ type: 'INPUT_CHANGE', payload })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = {
      email: formState.email.value,
      password: formState.password.value
    }
    
    dispatch(signInUser(data))
      .unwrap()
      .then(() => navigate('/'))
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
          value={formState.email.value}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          name="password"
          value={formState.password.value}
          onChange={handleChange}
        />
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
