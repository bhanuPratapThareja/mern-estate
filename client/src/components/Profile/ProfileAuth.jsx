import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { deleteUser, signoutUser } from '../../store'
import { userSliceActions } from '../../store'

export default function ProfileAuth() {
    const { currentUser  } = useSelector(state => state.user)
    const navigate = useNavigate()

    const onDeleteUser = () => {
        dispatch(deleteUser(currentUser.id))
          .unwrap()
          .then(res => {
            navigate('/sign-up')
            setTimeout(() => {
              dispatch(userSliceActions.removeUserState())
            }, 0);
          })
          .catch(err => console.log('del err: ', err))
    }
    
    const onSignout = () => {
        dispatch(signoutUser())
    }

    return (
        <div className="flex justify-between">
            <span onClick={onDeleteUser} className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
            <span onClick={onSignout} className="text-red-700 cursor-pointer font-semibold">Sign out</span>
        </div>
    )
}
