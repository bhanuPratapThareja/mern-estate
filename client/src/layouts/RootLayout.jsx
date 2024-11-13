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
  const [isRefreshTokenExpired, setupInterceptors, ejectInterceptors] = useAxiosInterceptors()

  useEffect(() => {
      setupInterceptors()
      return () => {
        ejectInterceptors()
      }
  }, [])

  useEffect(() => {
    console.log('isRefreshTokenExpired: ', isRefreshTokenExpired)
    if(isRefreshTokenExpired) {
      dispatch(signout())
    }
  }, [isRefreshTokenExpired])

  return (
    <>
      <NewToast />
      <NewModal />
      <div className="flex flex-col justify-between h-[100vh]">
          <div className="">
            <Header />
          </div>
          <div className="pt-16">
            <Outlet />
          </div>
      </div>
    </>
  )
}
