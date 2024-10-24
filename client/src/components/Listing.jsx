import { Link } from 'react-router-dom'

export default function Listing({ listing, onDeleteListing, onEditListing }) {
  return (
    <div className='border-2 rounded-lg p-3 flex gap-4 justify-between items-center'>
        <Link to={`/listing/${listing.id}`}>
            <img 
            src={listing.imageUrls[0]} 
            alt="listing cover" 
            className='h-16 w-16 object-contain rounded-lg'
            />
        </Link>
        <Link to={`/listing/${listing.id}`} className='text-slate-700 font-semibold hover:underline truncate flex-1'>
            <p>{listing.name}</p>
        </Link>
        <div className='flex flex-col items-center'>
            <button onClick={() => onDeleteListing(listing.id)} className='text-red-700'>Delete</button>
            <button onClick={() => onEditListing(listing)} className='text-green-700'>Edit</button>
        </div>
    </div>
  )
}
