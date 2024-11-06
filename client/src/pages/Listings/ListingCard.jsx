import { Link } from "react-router-dom"
import { MdLocationOn } from "react-icons/md";

export default function ListingCard({ listing, index }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden w-full sm:w-[250px]">
        <Link to={`/listing/${listing.id}`}>
            <img 
                src={listing.imageUrls[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyy8VtAm-3cfsMEDx515red4NlQrw8JO0ag&s'} 
                alt={`listing ${index+1} cover`}
                className="h-[320px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
             />
             <div className="p-3 flex flex-col gap-2">
                <p className="text-lg font-semibold text-slate-700 truncate">{listing.name}</p>
                <div className="flex items-center gap-1">
                    <MdLocationOn className="h-4 w-4 text-green-700" style={{ fontSize: '4rem'}} />
                    <p className="text-sm text-grey-600">{listing.address}</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 min-h-10">{listing.description}</p>
                <p className="text-slate-500 mt-2 font-semibold">
                    ${listing.offer ? 
                    listing.discountPrice.toLocaleString('en-US') : 
                    listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                </p>
                <div className="font-bold text-xs text-slate-700 flex gap-4">
                    <div className="">
                        {listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}
                    </div>
                    <div className="">
                        {listing.bathrooms} bath{listing.bedrooms > 1 ? 's' : ''}
                    </div>
                </div>
             </div>
        </Link>
    </div>
  )
}
