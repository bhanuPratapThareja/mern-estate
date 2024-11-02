import { Outlet } from "react-router-dom"

import Header from "../components/Header"

export default function RootLayout() {
  return (
    <div className="relative">
        <div className="fixed h-[80px] w-[100%] z-10">
          <Header />
        </div>
        <div className="absolute top-[80px] w-[100%]">
          <Outlet />
        </div>
    </div>
  )
}
