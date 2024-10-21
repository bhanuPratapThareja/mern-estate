import { useRef, useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import useImageUpload from '../hooks/useImageUpload'

export default function () {
  const { currentUser } = useSelector(state => state.user)
  const fileRef = useRef()
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({})

  const [imageUploadProgress, imagerUploadError, imageUrl, uploadImage] = useImageUpload()

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

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept='image/*' 
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
        <input type="text" placeholder="User Name" className="border p-3 rounded-lg" />
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" />

        <button onClick={onHandleUpdate} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-75">Update</button>
      </form>

      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-red-700 cursor-pointer font-semibold">Sign out</span>
      </div>
    </div>
  )
}
