import { createBrowserRouter, Navigate } from 'react-router-dom'

import RootLayout from '../layouts/RootLayout'
import PrivateRoutes from '../routes/PrivateRoutes'

import Home from '../pages/Home'
import Auth from '../pages/Auth'
import About from '../pages/About'
import Profile from '../pages/Profile/Profile'
import CreateListing from '../pages/Listings/CreateListing'
import ListingPage from '../pages/Listings/ListingPage'
import SearchPage from '../pages/SearchPage'
import PageNotFound from '../pages/PageNotFound'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/home',
                element: <Navigate to='/' />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/auth',
                element: <Auth />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/listing/:listingId',
                element: <ListingPage />
            },
            {
                path: '/search',
                element: <SearchPage />
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
                    {
                        path: '/edit-listing/:listingId',
                        element: <CreateListing />
                    },
                ]
            },
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    }
])