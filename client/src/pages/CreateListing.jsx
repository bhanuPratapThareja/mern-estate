import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Name' name='name' id='name' maxLength={62} minLength={10} required className='border p-3 rounded-lg' />
                <textarea type="text" placeholder='Description' name='description' id='description' required className='border p-3 rounded-lg' />
                <input type="text" placeholder='Address' name='address' id='address' required className='border p-3 rounded-lg' />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" name='sell' id='sell' className='w-5' />
                        <label htmlFor="sale">Sell</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name='rent' id='rent' className='w-5' />
                        <label htmlFor="rent">Rent</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name='parkingSpot' id='parkingSpot' className='w-5' />
                        <label htmlFor="parkingSpot">Parking Spot</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name='furnished' id='furnished' className='w-5' />
                        <label htmlFor="furnished">Furnished</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name='offer' id='offer' className='w-5' />
                        <label htmlFor="offer">Offer</label>
                    </div>
                </div>

                <div className='flex gap-6 flex-wrap'>
                   <div className='flex gap-2 items-center'>
                        <input type="number" name='bedrooms' id='bedrooms' min={1} max={10} className='border border-grey-300 p-3 rounded-lg' required />
                        <label htmlFor="bedrooms">Beds</label>
                   </div>
                   <div className='flex gap-2 items-center'>
                        <input type="number" name='bathrooms' id='bathrooms' min={1} max={10} className='border border-grey-300 p-3 rounded-lg' required />
                        <label htmlFor="bathrooms">Baths</label>
                   </div>
                   <div className='flex gap-2 items-center'>
                        <input type="number" name='regularPrice' id='regularPrice' min={1} max={10} className='border border-grey-300 p-3 rounded-lg' required />
                        <div className='flex flex-col items-center'>
                            <label htmlFor="regularPrice">Regular price</label>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                   </div>
                   <div className='flex gap-2 items-center'>
                        <input type="number" name='discountedPrice' id='discountedPrice' min={1} max={10} className='border border-grey-300 p-3 rounded-lg' required />
                        <div className='flex flex-col items-center'>
                            <label htmlFor="discountedPrice">Discounted price</label>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                   </div>
                </div>

            </div>

            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input type="file" id='images' accept='image/*' multiple className='border-2 p-3 border-grey-300 rounded w-full' />
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 bg-slate-700 rounded-lg text-white uppercase disabled:opacity-70 hover:opacity-95'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}
