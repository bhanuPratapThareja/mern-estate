import { useSelector } from 'react-redux'

import ProfileForm from '../components/Profile/ProfileForm'
import ProfileAuth from "../components/Profile/ProfileAuth"
import ProfileListings from '../components/Profile/ProfileListings'

export default function () {
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
