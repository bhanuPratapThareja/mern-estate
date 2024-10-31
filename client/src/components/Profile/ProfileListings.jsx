import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import Listing from "../listings/Listing"
import { deleteListing, fetchListings } from '../../store'

export default function ProfileListings() {
    const { currentUser  } = useSelector(state => state.user)
    const { listings, fetchError } = useSelector(state => state.listings)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFetchListings = () => {
        dispatch(fetchListings(currentUser.id))
    }

    const onDeleteListing = listingId => {
        dispatch(deleteListing(listingId))
    }

    const onEditListing = listing => {
        navigate(`/edit-listing/${listing.id}`, { state: { listing } })
    }

    return (
        <>
            <button onClick={handleFetchListings} className='text-green-700 w-full'>Show Listings</button>
            {fetchError && <p className='text-red-700'>Error showing listings</p>}
            
            {listings.length ? <div className='flex flex-col gap-4'>
                <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>

                {listings.map(listing => 
                    <Listing  
                        key={listing.id} 
                        listing={listing} 
                        onDeleteListing={onDeleteListing}
                        onEditListing={onEditListing}
                    />
                )}
                
            </div> : null}
        </>
    )
}
