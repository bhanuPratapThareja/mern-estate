import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SwipePhotos from "../components/SwipePhotos";
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";

import { getListing } from "../store/actions/listingActions";

export default function ListingPage() {
  const params = useParams();
  const dispatch = useDispatch();
  SwiperCore.use(Navigation)

  const { selectedListing: listing, loading, error } = useSelector(
    (state) => state.listings
  );

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
            <Swiper navigation>
              {listing.imageUrls.map((url) => {
                return (
                  <SwiperSlide key={url}>
                  <div
                    className='h-[550px] min-w-full' 
                    style={{ background: `url($url) center no-repeat`, backgroundSize: 'cover' }}
                  ></div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          <div className="p-2 my-7 flex flex-col gap-4 max-w-4xl mx-auto">
            <div className="">
                <p className="text-2xl text-slate-700 font-semibold">{'Villa in the clouds'} - 
                $
                {listing.discountPrice
                    ? listing.discountPrice.toLocaleString("en-US")
                    : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
                </p>
            </div>
            <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {'Located at the beach'}
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
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam sequi amet repellat, dolores tempore minus laborum nulla neque odio unde modi nobis labore ad natus veritatis temporibus totam numquam voluptas.
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
          </div>
        </div>
      )}
    </main>
  );
}
