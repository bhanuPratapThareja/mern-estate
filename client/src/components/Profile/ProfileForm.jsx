import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import Button from '../../shared/Button'
import Alert from '../../shared/Alert'
import { updateUser  } from '../../store'
import { useImageUpload } from '../../hooks/image-upload-hook'
import { useForm } from '../../hooks/form-hook'
import { VALIDATORS } from '../../utils/types'

const INITIAL_PROFILE_STATE = { 
  inputs: {
    username: {
      name: 'username',
      type: 'text',
      placeholder: 'User Name',
      displayName: 'User Name',
      value: '',
      error: '',
      touched: false,
      minLength: 4,
      maxLength: 20,
      validations: [VALIDATORS.MIN_LENGTH, VALIDATORS.MAX_LENGTH]
    },
    email: {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      displayName: 'Email ID',
      value: '',
      error: '',
      touched: false,
      validations: [VALIDATORS.EMAIL]
    },
    password: {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      displayName: 'Password',
      value: '',
      error: '',
      touched: false,
      minLength: 8,
      maxLength: 16,
      validations: [VALIDATORS.ALPHA_NUMERIC, VALIDATORS.MIN_LENGTH, VALIDATORS.MAX_LENGTH]
    },
    avatar: {
      name: 'avatar',
      type: 'image',
      placeholder: 'Avatar',
      displayName: 'Profile Image',
      value: '',
      error: '',
      touched: false,
      validations: []
    }
  },
  isFormValid: false
}

export default function ProfileForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fileRef = useRef()
    const imgHelperDivRef = useRef()

    const [file, setFile] = useState(null)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const { currentUser, updating, error } = useSelector(state => state.user)
    
    const [imageUploadProgress, imagerUploadError, uploadImage] = useImageUpload()
    const {
      formState, changeHandler, blurHandler, formValidateHandler, formUpdateHandler, formResetHandler
     } = useForm(INITIAL_PROFILE_STATE)

    useEffect(() => {
      if(file) {
        uploadImage(file)
          .then((imageUrl) => {
            formUpdateHandler({ avatar: imageUrl })
            formValidateHandler()
          })
          .catch(() => {})
      }
    }, [file])

    const onHandleUpdate = e => {
      e.preventDefault()
      formValidateHandler()

      if(!formState.isFormValid) {
        return
      }

      const data = {
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        avatar: formState.inputs.avatar.value
      }

      dispatch(updateUser({ data, id: currentUser.id }))
        .unwrap()
        .then(() => {
          formResetHandler()
          setUpdateSuccess(true)
        })
    }
    
    const handleChange = e => {
      setUpdateSuccess(false)
      changeHandler(e)
    }

    const { username, email, password, avatar } = formState.inputs

    return (
      <form onSubmit={onHandleUpdate} noValidate className="flex flex-col gap-4">
        <input 
          type="file" 
          name="avatar"
          ref={fileRef} 
          hidden 
          accept='image/*'
          value={''}
          onBlur={() => console.log('img blur')}
          onChange={e => setFile(e.target.files[0])}
        />
        <img 
          src={avatar.value || currentUser.avatar} 
          alt="avatar"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer my-2 self-center" 
        />
        <div className='hidden' ref={imgHelperDivRef}></div>
        <div className='self-center'>
        {imagerUploadError ? 
            <Alert type="error" message={imagerUploadError} /> : 
            imageUploadProgress > 0 && imageUploadProgress < 100 ? 
            <Alert type="info" message={`Uploading ${imageUploadProgress}%`} />:
            imageUploadProgress === 100 ? 
                <Alert type="success" message="Image Uploaded Successfully!" /> :
                null
        }  
        </div>      
        <input 
          type={username.type} 
          value={username.value} 
          name={username.name} 
          id={username.name}
          placeholder={username.placeholder} 
          onChange={handleChange} 
          onBlur={blurHandler}
          className="border p-3 rounded-lg" 
        />
        {username.error && <p className='text-sm text-red-700 font-semibold ml-1'>{username.error}</p>}

        <input 
          type={email.type} 
          value={email.value} 
          name={email.name} 
          placeholder={email.placeholder}
          id={email.name}
          onChange={handleChange} 
          onBlur={blurHandler}
          className="border p-3 rounded-lg" 
        />
          {email.error && <p className='text-sm text-red-700 font-semibold ml-1'>{email.error}</p>}

        <input 
          type={password.type} 
          value={password.value} 
          name={password.name} 
          placeholder={password.placeholder} 
          onChange={handleChange} 
          onBlur={blurHandler}
          className="border p-3 rounded-lg" 
        />
          {password.error && <p className='text-sm text-red-700 font-semibold ml-1'>{password.error}</p>}

        <Button type="submit" disabled={!username.value && !email.value && !password.value && !avatar.value} text={updating ? 'Updating': 'Update'} className="bg-slate-700" />
        <Button type="button" text="Create Listing" className="bg-green-700" onClick={() => navigate('/create-listing')} />


        {error && <Alert type="error" message={error.message} />}
        {updateSuccess && <Alert type="success" message="User is updated successfully!!" />}
      </form>
    )
}
