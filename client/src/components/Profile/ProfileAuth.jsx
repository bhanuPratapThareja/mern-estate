import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { deleteUser, signoutUser } from '../../store'
import { SIGN_OUT, DELETE } from "../../utils/types";

export default function ProfileAuth() {
    const { currentUser  } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onDeleteUser = () => {
        dispatch(deleteUser({ userId: currentUser.id, mode: DELETE }))
          // .unwrap()
          // .then(() => {
          //   navigate('/auth')
          // })
    }
    
    const onSignout = () => {
        dispatch(signoutUser({ mode: SIGN_OUT}))
          // .unwrap()
          // .then(() => navigate('/auth'))
    }

    return (
        <div className="flex justify-between my-2">
            <span onClick={onDeleteUser} className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
            <span onClick={onSignout} className="text-red-700 cursor-pointer font-semibold">Sign out</span>
        </div>
    )
}
