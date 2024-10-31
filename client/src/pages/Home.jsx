import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ListingCard from '../components/listings/ListingCard'

export default function Home() {
  const { searchedListings } = useSelector(state => state.listings)

  // console.log('searchedListings home: ', searchedListings)

  let offerListings = [];
  let saleListings = [];
  let rentListings = [];

  if(searchedListings.length) {
    for(let i = 0; i < searchedListings.length; i++) {
      const el = searchedListings[i]
      if(el.offer) {
        if(offerListings.length > 3) break;
        offerListings.push(el)
      }
    }
    for(let i = 0; i < searchedListings.length; i++) {
      const el = searchedListings[i]
      if(el.type === 'sale') {
        if(saleListings.length > 3) break;
        saleListings.push(el)
      }
    }
    for(let i = 0; i < searchedListings.length; i++) {
      const el = searchedListings[i]
      if(el.type === 'rent') {
        if(rentListings.length > 3) break;
        rentListings.push(el)
      }
    }
  }

  return (
    <div>
      {/* top */}

      <div className="flex flex-col gap-6 py-10 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span> <br />place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Mern Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from
        </div>
        <Link to='/search' className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Let's get started</Link>
      </div>
      
      {/* swiper */}

      {/* {offerListings.length >0 && offerListings.map(listing => {
        if(listing.imageUrls.length > 1) {
          return <SwipePhotos images={listing.imageUrls} />
        }
      })} */}
      

      {/* listing results */}
      <div className="max-w-6xl mx-auto p-3 my-4 flex flex-col gap-8">
       
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to="/search?offer=true">Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing, index) => {
                return <ListingCard key={listing.id} listing={listing} index={index}  />
              })}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to="/search?type=sale">Show more places for sale</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing, index) => {
                return <ListingCard key={listing.id} listing={listing} index={index}  />
              })}

            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold'>Recent Offers for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to="/search?type=rent">Show more places for rent</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing, index) => {
                return <ListingCard key={listing.id} listing={listing} index={index}  />
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
