import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../shared/Button'
import { createListing, toastSliceActions } from '../../store'
import { useImageUpload } from '../../hooks/image-upload-hook'
import { SUCCESS, ERROR } from '../../utils/types'

const INITIAL_FORM = {
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    regularPrice: 100000,
    discountPrice: 90000,
    offer: false,
    parking: false,
    furnished: false
}

export default function CreateListing() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState(INITIAL_FORM)
    const [imageUploadError, setImageUploadError] = useState('')
    const [uploading, setUploading] = useState(false)
    const [mode, setMode] = useState('create')

    const [,,uploadImage] = useImageUpload()
    const { creating, error } = useSelector(state => state.listings)

    useEffect(() => {
        if(location.state) {
            setMode('edit')
            setFormData({ ...location.state.listing })
        }
    }, [])

    const handleImageSubmit = () => {
        setImageUploadError('')
        const promises = []
        if(files.length && files.length + formData.imageUrls.length < 7) {
            setUploading(true)
            for(let i = 0; i < files.length; i++) {
                promises.push(uploadImage(files[i]))
            }
            Promise.all(promises)
                .then(urls => {
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

    const onRemoveImage = index => {
        const filteredImageUrls = formData.imageUrls.filter((url, i) => i !== index)
        setFormData({ ...formData, imageUrls: filteredImageUrls })
    }

    const handleChange = (e, inputType, radioName) => {
        let { name, value, checked, id, type } = e.target
         const newFormData = { ...formData }
        if(inputType === 'checkbox') {
            value = checked
        }
        if(inputType === 'radio') {
           name = radioName
           value = id
        }
        if(type === 'number' && value) {
            value = +value
        }
       
        newFormData[name] = value
        setFormData(newFormData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createListing({ listing: formData, mode }))
            .unwrap()
            .then((res) => {
                console.log('res: ', res)
                setFormData(INITIAL_FORM)
                dispatch(toastSliceActions.showToast({ type: SUCCESS, header: res.status, body: res.message }))
            })
            .catch((err) => {
                console.log('catch: ', err)
                const { status, message } = err?.response?.data || err
                dispatch(toastSliceActions.showToast({ type: ERROR, header: status, body: message }))
            })
    }
    
    return (
        <main className='p-3 max-w-5xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>{mode === 'edit' ? 'Edit' : 'Create'} listing</h1>
            <form className='flex flex-col sm:flex-row gap-8' onSubmit={handleSubmit} noValidate>
                
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' name='name' id='name' value={formData.name} onChange={handleChange} maxLength={62} minLength={10} required className='border p-3 rounded-lg' />
                    <textarea type="text" placeholder='Description' name='description' id='description' value={formData.description} onChange={handleChange} required className='border p-3 rounded-lg' />
                    <input type="text" placeholder='Address' name='address' id='address' value={formData.address} onChange={handleChange} required className='border p-3 rounded-lg' />

                    <div className='flex gap-6 flex-wrap'>

                        <fieldset id="type" name='type' className='flex gap-2' >
                            <div className='flex gap-2 items-center'>
                                <input type="radio" name='type' id='sale' className='w-5 h-5' checked={formData.type === 'sale'} onChange={(e) => handleChange(e, 'radio', 'type')} />
                                <label htmlFor="sale">Sale</label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="radio" name='type' id='rent' className='w-5 h-5' checked={formData.type === 'rent'} onChange={(e) => handleChange(e, 'radio', 'type')} />
                                <label htmlFor="rent">Rent</label>
                            </div>
                        </fieldset>

                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" name='parking' id='parking' className='w-5 h-5' checked={formData.parking} onChange={(e) => handleChange(e, 'checkbox')} />
                            <label htmlFor="parking">Parking Spot</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" name='furnished' id='furnished' className='w-5 h-5' checked={formData.furnished} onChange={(e) => handleChange(e, 'checkbox')}  />
                            <label htmlFor="furnished">Furnished</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" name='offer' id='offer' className='w-5 h-5' checked={formData.offer} onChange={(e) => handleChange(e, 'checkbox')} />
                            <label htmlFor="offer">Offer</label>
                        </div>
                    </div>

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2 items-center'>
                                <input type="number" name='bedrooms' id='bedrooms' value={formData.bedrooms} onChange={handleChange} min={1} max={10} className='border border-grey-300 p-3 rounded-lg' required />
                                <label htmlFor="bedrooms">Beds</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                                <input type="number" name='bathrooms' id='bathrooms' value={formData.bathrooms} onChange={handleChange} min={1} max={10} className='border border-grey-300 p-3 rounded-lg' required />
                                <label htmlFor="bathrooms">Baths</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                                <input type="number" name='regularPrice' id='regularPrice' value={formData.regularPrice} onChange={handleChange} min={50} max={100000} className='border border-grey-300 p-3 rounded-lg' required />
                                <div className='flex flex-col items-center'>
                                    <label htmlFor="regularPrice">Regular price</label>
                                    <span className='text-xs'>($ / month)</span>
                                </div>
                        </div>
                        {formData.offer && <div className='flex gap-2 items-center'>
                                <input type="number" name='discountPrice' id='discountPrice' value={formData.discountPrice} onChange={handleChange} min={0} max={100000} className='border border-grey-300 p-3 rounded-lg' required />
                                <div className='flex flex-col items-center'>
                                    <label htmlFor="discountPrice">Discounted price</label>
                                    <span className='text-xs'>($ / month)</span>
                                </div>
                        </div>}
                    </div>

                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input type="file" onChange={e => setFiles(e.target.files)} id='images' accept='image/*' multiple className='border-2 p-3 border-grey-300 rounded w-full' />
                        <button  onClick={handleImageSubmit} type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
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
{/* 
                    <button type='submit' className='p-3 bg-slate-700 rounded-lg text-white uppercase disabled:opacity-70 hover:opacity-95'>
                        {mode === 'edit' ? 'Edit Listing' : creating ? 'Creating...' : 'Create Listing'}
                    </button> */}
                    <Button 
                        type="submit" 
                        text={mode === 'edit' ? 'Edit Listing' : (mode === 'edit' && creating) ? 'Editing...' :  mode === 'create' ? 'Create Listing' : 'Creating...'} 
                        className="bg-slate-700"
                    />
                    {/* {error && <p className='text-red-700 text-sm font-semibold'>{error.message}</p>} */}
                </div>
            </form>
        </main>
    )
}
