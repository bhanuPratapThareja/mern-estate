import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SwipePhotos from "../../components/SwipePhotos";
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";

import { getListing } from "../../store/actions/listingActions";
import Contact from "../../components/Contact";
import Button from "../../shared/Button";

export default function ListingPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [contact, setContact] = useState(false)

  const { listing, loading, error, currentUser} = useSelector(state => {
    const { listings: { selectedListing, loading, error }, user: { currentUser } } = state
    return { listing: selectedListing, loading, error, currentUser }
  })

  useEffect(() => {
    dispatch(getListing(params.listingId));
  }, []);

  if (!listing) {
    <p className="border-2 border-green-500">No Listing Selected</p>;
  }

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading</p>}
      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-4xl font-semibold text-slate-700">Something went wrong!</p>
        </div>
      )}
      {listing && (
        <div className="flex flex-col items-center">
          
          <div className="w-full -mt-12">
            <SwipePhotos images={listing.imageUrls} />
          </div>

          <div className="p-2 my-7 flex flex-col gap-4 max-w-4xl mx-auto">
            <div className="">
                <p className="text-2xl text-slate-700 font-semibold">{listing.name} - 
                $
                {listing.offer && listing.discountPrice
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
                  ${listing.regularPrice - listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
                <span className="font-semibold text-black">Description - {' '}</span>
               {listing.description}
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
          
            {currentUser && listing.userRef === currentUser.id && !contact &&
              <Button onClick={() => setContact(true)} className="bg-[#242D36]">
                Contact Landlord
              </Button>
            }
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
