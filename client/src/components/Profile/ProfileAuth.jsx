import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { deleteUser, signoutUser } from '../../store'
import { userSliceActions } from '../../store'

export default function ProfileAuth() {
    const { currentUser  } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
          .unwrap()
          .then(() => navigate('/sign-in'))
    }

    return (
        <div className="flex justify-between my-2">
            <span onClick={onDeleteUser} className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
            <span onClick={onSignout} className="text-red-700 cursor-pointer font-semibold">Sign out</span>
        </div>
    )
}
