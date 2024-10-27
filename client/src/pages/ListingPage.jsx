import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SwipePhotos from "../components/SwipePhotos";
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";

import { getListing } from "../store/actions/listingActions";
import Contact from "../components/Contact";

export default function ListingPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [contact, setContact] = useState(false)

  // const { listings: { selectedListing: listing, loading, error} } = useSelector(
  //   (state) => state
  // );
  // const { currentUser } = useSelector(state => state.user)

  const { listing, loading, error, currentUser} = useSelector(state => {
    const { listings: { selectedListing, loading, error }, user: { currentUser} } = state
    return { listing: selectedListing, loading, error, currentUser }
  })

  useEffect(() => {
    dispatch(getListing(params.listingId));
  }, []);

  if (!listing) {
    <p>No Listing Selected</p>;
  }

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && (
        <div className="flex flex-col items-center">
          
          <div className="w-full">
            <SwipePhotos images={listing.imageUrls} />
          </div>

          <div className="p-2 my-7 flex flex-col gap-4 max-w-4xl mx-auto">
            <div className="">
                <p className="text-2xl text-slate-700 font-semibold">{listing.name} - 
                $
                {listing.discountPrice
                    ? listing.discountPrice.toLocaleString("en-US")
                    : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
                </p>
            </div>
            <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${listing.regularPrice - listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
                <span className="font-semibold text-black">Description - {' '}</span>
               {/* {listing.description} */}
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio dolorem molestiae quas dicta voluptate quibusdam neque minus eveniet sit dolore fugit possimus iste perspiciatis similique facere, ratione, placeat, quod necessitatibus!
            </p>
            <ul className="text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap">
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBed className="text-lg" />
                    {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className="text-lg" />
                    {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaParking className="text-lg" />
                    {listing.parking} {listing.parking ? 'Parking' : 'No Parking'}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaChair className="text-lg" />
                    {listing.furnished} {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
            </ul>
          
            {currentUser && listing.userRef !== currentUser.id && !contact &&
              <button onClick={() => setContact(true)} className="bg-[#242D36] text-white w-full p-3 rounded-md uppercase hover:opacity-95">
                Contact Landlord
              </button>
            }
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
