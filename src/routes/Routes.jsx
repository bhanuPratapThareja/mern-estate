import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import Signin from '../pages/Signin'
import SignUp from '../pages/SignUp'
import About from '../pages/About'
import Profile from '../pages/Profile'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/sign-in',
        element: <Signin />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/profile',
        element: <Profile />
    },
])