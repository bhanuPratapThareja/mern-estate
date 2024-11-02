import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import Button from '../../shared/Button'
import { updateUser  } from '../../store'
import { useImageUpload } from '../../hooks/image-upload-hook'

const INITIAL_USER_STATE = { username: '', email: '', password: '', avatar: '' }

export default function ProfileForm() {
    const navigate = useNavigate()
    const fileRef = useRef()
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState(INITIAL_USER_STATE)
    const { currentUser, updating, error } = useSelector(state => state.user)
    const { imageUploadProgress, imagerUploadError, imageUrl, uploadImage } = useImageUpload()
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(file) {
          uploadImage(file)
        }
    }, [file])
    
    useEffect(() => {
    if(imageUrl) {
        setFormData({ ...formData, avatar: imageUrl })
    }
    }, [imageUrl])

    const onHandleUpdate = e => {
        e.preventDefault()
        setUpdateSuccess(false)
        dispatch(updateUser({ formData, id: currentUser.id }))
          .unwrap()
          .then(() => {
            setFormData(INITIAL_USER_STATE)
            setUpdateSuccess(true)
          })
      }
    
      const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
      }

    return (
        <form className="flex flex-col gap-4">
            <input 
              type="file" 
              name="avatar"
              ref={fileRef} 
              hidden 
              accept='image/*'
              value={''}
              onChange={e => setFile(e.target.files[0])}
            />
            <img 
              src={formData.avatar || currentUser.avatar} 
              alt="avatar"
              onClick={() => fileRef.current.click()}
              className="rounded-full h-24 w-24 object-cover cursor-pointer my-2 self-center" 
            />
            <p className='self-center'>
            {imagerUploadError ? 
                <span className='text-red-700'>Error Image Upload (image must be less than 2mb)</span> : 
                imageUploadProgress > 0 && imageUploadProgress < 100 ? 
                <span className='text-slate-700'>{`Uploading ${imageUploadProgress}%`}</span> :
                imageUploadProgress === 100 ? 
                    <span className='text-green-700'>Image Uploaded Successfully!</span> :
                    null
            }  
            </p>      
            <input type="text" value={formData.username} name='username' placeholder="User Name" onChange={handleChange} className="border p-3 rounded-lg" />
            <input type="email" value={formData.email} name='email' placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg" />
            <input type="password" value={formData.password} name='password' placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg" />

            <Button type="button" text={updating ? 'Updating': 'Update'} className="bg-slate-700" onClick={onHandleUpdate} />
            <Button type="button" text="Create Listing" className="bg-green-700" onClick={() => navigate('/create-listing')} />

            <p className='text-red-700'>{error ? error.message : ''}</p>
            <p className='text-green-700'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
        </form>
    )
}
