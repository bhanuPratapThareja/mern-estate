import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch, } from "react-redux"
import { useNavigate } from "react-router-dom"

import Modal from '../../shared/Modal'
import Listing from "../Listings/Listing"
import { deleteListing, fetchListings, toastActions } from '../../store'
import { SUCCESS, ERROR } from "../../utils/types"

export default function ProfileListings() {
    const { currentUser  } = useSelector(state => state.user)
    const { listings, fetchError } = useSelector(state => state.listings)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const modalRef = useRef()
    const [activeListing, setActiveListing] = useState()

    useEffect(() => {
        dispatch(fetchListings(currentUser.id))
    }, [])

    const handleFetchListings = () => {
        dispatch(fetchListings(currentUser.id))
    }

    const deleteListingHandler = listing => {
        setActiveListing(listing)
        modalRef.current.showModal()
    }

    const onDeleteListing = () => {
        console.log('activeListing: ', activeListing)

        dispatch(deleteListing(activeListing.id))
            .unwrap()
            .then((res) => {
                dispatch(toastActions.showToast({ type: SUCCESS, header: res.status, body: res.message }))
            })
            .catch((err) => {
                dispatch(toastActions.showToast({ type: ERROR, header: err.response.data.status, body: err.response.data.message }))
            })
    }

    const editListingHandler = listing => {
        navigate(`/edit-listing/${listing.id}`, { state: { listing } })
    }

    return (
        <>

            <Modal
                ref={modalRef}
                onPressOk={onDeleteListing}
                header={`Delete Listing`}
                body="Are you sure you want to delete this listing?"
            />

            <button onClick={handleFetchListings} className='text-green-700 w-full'>Show Listings</button>
            {fetchError && <p className='text-red-700'>Error showing listings</p>}

            {listings.length ? <div className='flex flex-col gap-4'>
                <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>

                {listings.map(listing => 
                    <Listing  
                        key={listing.id} 
                        listing={listing} 
                        deleteListingHandler={deleteListingHandler}
                        editListingHandler={editListingHandler}
                    />
                )}
                
            </div> : null}
        </>
    )
}
