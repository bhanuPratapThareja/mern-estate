import { useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import Modal from '../../shared/Modal'
import { deleteUser, signoutUser } from '../../store'
import { SIGN_OUT, DELETE } from "../../utils/types";

export default function ProfileAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalRef = useRef()
  const [modalData, setModalData] = useState({})
  const { currentUser  } = useSelector(state => state.user)
    
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
      let modalBody;
      if(mode === SIGN_OUT) {
        modalBody = 'Are you sure you want to sign out?'
      } else {
        modalBody = 'Are you sure you want to delete your account? This cannot be undone.'
      }
      setModalData({ mode, body: modalBody })
      modalRef.current.showModal()
    }

    const onPressOk = () => {
      if(modalData.mode === SIGN_OUT) {
        console.log('you are being signedout')
        onSignout()
      } else if(modalData.mode === DELETE) {
        console.log('you are being deleted')
        onDelete()
      }
    }

    return (
        <>
          <Modal
            ref={modalRef}
            header={modalData.mode === SIGN_OUT ? 'Sign Out' : 'Delete'}
            body={modalData.body}
            onPressOk={onPressOk}
          />
          
          <div className="flex justify-between my-2">
              <span onClick={() => profileAuthHandler(DELETE)} className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
              <span onClick={() => profileAuthHandler(SIGN_OUT)} className="text-red-700 cursor-pointer font-semibold">Sign out</span>
          </div>
        </>
    )
}
