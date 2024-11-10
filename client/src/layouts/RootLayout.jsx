import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import { useDispatch } from 'react-redux'

import Header from "../components/Header"
import NewToast from "../shared/NewToast"
import NewModal from '../shared/NewModal'

import { signout } from '../store'
import { useAxiosInterceptors } from '../hooks/axios-interceptors-hook'

export default function RootLayout() {
  const dispatch = useDispatch()
  const [isAuthTokenExpired, setupInterceptors, ejectInterceptors] = useAxiosInterceptors()

  useEffect(() => {
    if(isAuthTokenExpired) {
      dispatch(signout())
    } else {
      setupInterceptors()
      return () => {
        ejectInterceptors()
      }
    }
  }, [isAuthTokenExpired])

  return (
    <>
      <NewToast />
      <NewModal />
      <div className="relative">
          <div className="fixed h-[80px] w-[100%] z-10">
            <Header />
          </div>
          <div className="absolute top-[80px] w-[100%]">
            <Outlet />
          </div>
      </div>
    </>
  )
}
