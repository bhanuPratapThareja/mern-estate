import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Button from '../shared/Button'
import ListingCard from "./Listings/ListingCard"
import { searchListings } from "../store"
import { listingSliceActions } from "../store"

const INITIAL_FORM_STATE = {
    searchTerm: '',
    type: 'all',
    offer: false,
    parking: false,
    furnished: false,
    sort: 'createdAt',
    order: 'desc',
    errors: {}
}

export default function SearchPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(INITIAL_FORM_STATE)
    const { searchedListings, loading, error, searchedListingsLength } = useSelector(state => state.listings)

    useEffect(() => {
        handleChangeQuery()
    }, [location.search])

    const handleChangeQuery = () => {
        const urlParams = new URLSearchParams(location.search)

        const searchesFromUrl = {}
        for(let key in formData) {
            if(key === 'errors') continue;
            let value = urlParams.get(key)
            if(key === 'searchTerm' && value === 'null') {
                value = ''
            } 
            searchesFromUrl[key] = value
        }

        setFormData({ 
            ...formData, 
            searchTerm: searchesFromUrl.searchTerm || '',
            type: searchesFromUrl.type || 'all',
            offer: searchesFromUrl.offer === 'true' ? true : false,
            parking: searchesFromUrl.parking === 'true' ? true : false,
            furnished: searchesFromUrl.furnished === 'true' ? true : false,
            sort: searchesFromUrl.sort || 'createdAt',
            order: searchesFromUrl.order || 'desc' 
        })
        getSearchListings(urlParams.toString())
    }

   const getSearchListings = searchQuery => {
    dispatch(listingSliceActions.resetSerchedListings())
    dispatch(searchListings(searchQuery))
   }

    const handleChange = (e, fieldType) => {
        let { name, value, checked, type, id } = e.target
       
        if(type === 'checkbox') {
            value = checked
        } 
        if(type === 'select-one' && id === 'sort') {
            const [sort, order] = value.split('_')
            setFormData({ ...formData, sort, order })
            return
        }
        if(fieldType === 'radio') {
            setFormData({ ...formData, [name]: id })
            return
        }
        setFormData({ ...formData, [name]: value })
    }

    const handleSearch = e => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        
        for(let key in formData) {
            if(key === 'errors') {
              continue
            }
            urlParams.set(key, formData[key])
        }
        
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const onShowMoreClick = () => {
        const numberOfListings = searchedListings.length
        const startIndex = numberOfListings
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString()
        dispatch(searchListings(searchQuery))
    }

    return (
        <div className='flex flex-col md:flex-row md:min-h-screen'>
            <div className='p-7 flex-2 flex-wrap border-b-2 md:border-b-0 md:border-r-2'>

                <form onSubmit={handleSearch} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap' htmlFor="searchTerm">Search Term:</label>
                        <input 
                            type="text" 
                            id='searchTerm' 
                            name='searchTerm' 
                            placeholder='Search'
                            className='border rounded-lg p-3 w-full'
                            value={formData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        
                        <fieldset id="type" name='type' className='flex flex-wrap gap-2' >
                            <div className="flex gap-2 items-center">
                                <input type="radio" name="type" id="all" className='w-5 h-5' checked={formData.type === 'all'} onChange={(e) => handleChange(e, 'radio')} />
                                <label htmlFor="all">Rent & sale</label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="radio" name='type' id='rent' className='w-5 h-5' checked={formData.type === 'rent'} onChange={(e) => handleChange(e, 'radio')} />
                                <label htmlFor="rent">Rent</label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="radio" name='type' id='sale' className='w-5 h-5' checked={formData.type === 'sale'} onChange={(e) => handleChange(e, 'radio')} />
                                <label htmlFor="sale">Sale</label>
                            </div>
                        </fieldset>
                       
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="offer" id="offer" className='w-5 h-5' checked={formData.offer} onChange={handleChange} />
                            <label htmlFor="offer">Offer</label>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex gap-2 items-center">
                            <label htmlFor="type">Amenities:</label>
                            <input type="checkbox" name="parking" id="parking" className='w-5 h-5' checked={formData.parking} onChange={handleChange}  />
                            <label htmlFor="parking">Parking</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="furnished" id="furnished" className='w-5 h-5' checked={formData.furnished} onChange={handleChange}  />
                            <label htmlFor="furnished">Furnished</label>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <label htmlFor="sort">Sort:</label>
                        <select name="sort" id="sort" className='outline-none border rounded-lg p-3 border-r-8 border-r-[#FFFFFF]' value={`${formData.sort}_${formData.order}`} onChange={handleChange}>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <Button type="submit" className="bg-slate-700">Search</Button>
                </form>

            </div>
            
            <div className='p-7 flex-1  flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-semibold text-slate-600'>Listing Results</h1>
                {loading && <p>Searching...</p>} 
                {!loading && !searchedListings.length && (
                    <p className="text-xl text-slate-700">No listings found!</p>
                )}

                <div className="flex flex-row gap-8 flex-wrap justify-center mt-8">
                    {searchedListings.length > 0 && searchedListings.map((listing, index) => 
                        <ListingCard key={listing.id} listing={listing} index={index} />
                    )}
                </div>
                {searchedListingsLength > 8 && <button onClick={onShowMoreClick} className="text-green-700 hover:underline p-7 text-center w-full">
                    Show more
                </button>}
            </div>

           
            
        </div>
    )
}
