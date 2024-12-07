import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import RootLayout from '../layouts/RootLayout'
import PrivateRoutes from '../routes/PrivateRoutes'

import Home from '../pages/Home'
import About from '../pages/About'
import Auth from '../pages/Auth'

const PageNotFound = lazy(() => import('../pages/PageNotFound'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const CreateListing = lazy(() => import('../pages/Listings/CreateListing'))
const ListingPage = lazy(() => import('../pages/Listings/ListingPage'))
const SearchPage = lazy(() => import('../pages/SearchPage'))

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