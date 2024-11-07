import { useState } from 'react'
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import Header from "../components/Header"
import NewToast from "../shared/NewToast"

export default function RootLayout() {
  return (
    <>
      <NewToast />
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
