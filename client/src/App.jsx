import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"

import { router } from './routes/Routes'

export default function App() {
  return (
    <Suspense fallback={<></>}>
        <RouterProvider router={router} />
    </Suspense>
  )
}
