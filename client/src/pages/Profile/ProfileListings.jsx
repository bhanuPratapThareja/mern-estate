import { useEffect, useState } from "react"
import { useSelector, useDispatch, } from "react-redux"
import { useNavigate } from "react-router-dom"

import Listing from "../Listings/Listing"
import { deleteListing, fetchListings, toastSliceActions, modalSliceActions } from '../../store'
import { SUCCESS, ERROR } from "../../utils/types"

let count = 0;
export default function ProfileListings() {
    const { currentUser  } = useSelector(state => state.user)
    const { listings, fetchError } = useSelector(state => state.listings)
    const { confirm } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeListing, setActiveListing] = useState(null)

    useEffect(() => {
    //    setTimeout(() => {
    //         dispatch(fetchListings(currentUser.id))
    //    }, 0);
       dispatch(fetchListings(currentUser.id))
    }, [])

    const handleFetchListings = () => {
        dispatch(fetchListings(currentUser.id))
    }

    const deleteListingHandler = listing => {
        setActiveListing(listing)
        count = 0;
        dispatch(modalSliceActions.showModal({
            header: `Delete Listing ${listing.name}`,
            body: "Are you sure you want to delete this listing?"
        }))
    }

    const onDeleteListing = () => {
        console.log('activeListing: ', activeListing)
        if(count) {
            return
        }
        count++;
        dispatch(deleteListing(activeListing.id))
            .unwrap()
            .then((res) => {
                dispatch(toastSliceActions.showToast({ type: SUCCESS, header: res.status, body: res.message }))
            })
            .catch((err) => {
                dispatch(toastSliceActions.showToast({ type: ERROR, header: err.response.data.status, body: err.response.data.message }))
            })
            .finally(() => {
                setActiveListing(null);
            })
    }

    if(confirm && activeListing) {
        setTimeout(onDeleteListing, 500);
    }


    const editListingHandler = listing => {
        navigate(`/edit-listing/${listing.id}`, { state: { listing } })
    }

    return (
        <>
            <button onClick={handleFetchListings} className='text-green-700 w-full'>Show Listings</button>
            {fetchError && <p className='text-red-700'>Error showing listings</p>}

            {listings && listings.length ? <div className='flex flex-col gap-4'>
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
