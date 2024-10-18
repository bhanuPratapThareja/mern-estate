import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'

import { userSliceActions } from '../redux/store.js'

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const { displayName, email, photoURL } = result.user
            const res = await axios.post('/api/auth/google', {
                displayName, email, photoURL
            })
            dispatch(userSliceActions.addSignedInUser(res.data))
            navigate('/')
        } catch (error) {
            console.log('Could not sigh in with google ', error)
        }
    }

  return (
    <button
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
      onClick={handleGoogleClick}
    >
      Continue With Google
    </button>
  );
}
