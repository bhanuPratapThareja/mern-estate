import { useRef } from 'react'
import { useSelector } from 'react-redux'

import ProfileForm from '../components/Profile/ProfileForm'
import ProfileAuth from "../components/Profile/ProfileAuth"
import ProfileListings from '../components/Profile/ProfileListings'
import Toast from '../shared/Toast'
import { ERROR, SUCCESS } from '../utils/types'

export default function () {
  const toastRef = useRef()
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">{currentUser.username}</h1>
      <ProfileForm />
      <ProfileAuth />
      <ProfileListings />
    </div>
  )
}
