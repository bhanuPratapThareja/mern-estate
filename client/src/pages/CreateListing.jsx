import { useState } from 'react'
import { useImageUpload } from '../hooks/useImageUpload'

export default function CreateListing() {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({ imageUrls: [] })
    const [imageUploadError, setImageUploadError] = useState('')
    const [uploading, setUploading] = useState(false)
    const { uploadImage } = useImageUpload() 

    const handleImageSubmit = () => {
        const promises = []
        if(files.length && files.length + formData.imageUrls.length < 7) {
            setUploading(true)
            for(let i = 0; i < files.length; i++) {
                promises.push(uploadImage(files[i]))
            }
            Promise.all(promises)
                .then(urls => {
                    console.log('urlsL ', urls)
                    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls] })
                })
                .catch(err => {
                    console.log('upload err: ', err)
                    setImageUploadError('Image upload failed (2 mb max per image)')
                })
                .finally(() => {
                    setUploading(false)
                })
        } else {
            console.log('max err')
            setImageUploadError('You can only upload upto 6 images per listing.')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('formData: ', formData)
    }

    const onRemoveImage = index => {
        const filteredImageUrls = formData.imageUrls.filter((url, i) => i !== index)
        setFormData({ ...formData, imageUrls: filteredImageUrls })
    }
    
    console.log(formData)
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a listing</h1>
            <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit} noValidate>
                
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
                        <input type="file" onChange={e => setFiles(e.target.files)} id='images' accept='image/*' multiple className='border-2 p-3 border-grey-300 rounded w-full' />
                        <button disabled={uploading} onClick={handleImageSubmit} type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                     <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                    
                     {formData.imageUrls.length > 0 && formData.imageUrls.map((url, i) => (
                        <div className='flex justify-between p-3 border-2 items-center' key={url}>
                            <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={() => onRemoveImage(i)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                        </div>
                     ))}

                    <button type='submit' className='p-3 bg-slate-700 rounded-lg text-white uppercase disabled:opacity-70 hover:opacity-95'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}
