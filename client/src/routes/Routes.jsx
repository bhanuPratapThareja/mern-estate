import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '../layouts/RootLayout'
import PrivateRoutes from '../routes/PrivateRoutes'

import Home from '../pages/Home'
import Signin from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import About from '../pages/About'
import Profile from '../pages/Profile'
import CreateListing from '../pages/CreateListing'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
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
                element: <PrivateRoutes />,
                children: [
                    {
                        path: '/profile',
                        element: <Profile />
                    },
                    {
                        path: '/create-listing',
                        element: <CreateListing />
                    },
                ]
            },
        ]
    }
])