import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { axiosInstance } from "../utils/axios-instance";

import Button from '../shared/Button'
import { userSliceActions } from '../store'

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const { displayName, email, photoURL } = result.user
            const res = await axiosInstance.post('/api/auth/google', {
                displayName, email, photoURL
            })
            dispatch(userSliceActions.addSignedInUser(res.data))
            navigate('/')
        } catch (error) {
            console.log('Could not sigh in with google ', error)
        }
    }

  return (
    <Button
      type="button" 
      text="Continue With Google"
      className="bg-red-700" 
      onClick={handleGoogleClick}
    />
  );
}
