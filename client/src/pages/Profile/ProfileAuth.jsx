import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { deleteUser, signoutUser } from '../../store'
import { SIGN_OUT, DELETE } from "../../utils/types";
import { modalSliceActions } from '../../store'

export default function ProfileAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mode, setMode] = useState('')
  const { currentUser  } = useSelector(state => state.user)
  const { confirm } = useSelector(state => state.modal)
    
  const onDelete = () => {
        dispatch(deleteUser({ userId: currentUser.id, mode: DELETE }))
          .unwrap()
          .then(() => {
            navigate('/auth')
          })
    }
    
    const onSignout = () => {
        dispatch(signoutUser({ mode: SIGN_OUT}))
          .unwrap()
          .then(() => navigate('/auth'))
    }

    const profileAuthHandler = mode => {
      setMode(mode)
      let header; let body;
      if(mode === SIGN_OUT) {
        header = 'Sign Out'
        body = 'Are you sure you want to sign out?'
      } else {
        header = 'Delete'
        body = 'Are you sure you want to delete your account? This cannot be undone.'
      }
      dispatch(modalSliceActions.showModal({ header, body }))
    }

    const onPressOk = () => {
      if(mode === SIGN_OUT) {
        onSignout()
      } else if(mode === DELETE) {
        onDelete()
      }
    }

    if(confirm) {
      setTimeout(onPressOk, 500);
    }

    return (
      <div className="flex justify-between my-2">
          <span onClick={() => profileAuthHandler(DELETE)} className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
          <span onClick={() => profileAuthHandler(SIGN_OUT)} className="text-red-700 cursor-pointer font-semibold">Sign out</span>
      </div>
    )
}
