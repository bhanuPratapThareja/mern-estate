import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import Button from '../../shared/Button'
import Alert from '../../shared/Alert'
import FormError from '../../shared/FormError'
import Progress from '../../shared/Progress'
import { toastSliceActions, updateUser  } from '../../store'
import { useImageUpload } from '../../hooks/image-upload-hook'
import { useForm } from '../../hooks/form-hook'
import { ERROR, SUCCESS, VALIDATORS } from '../../utils/types'

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
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState()
    const { currentUser, updating, error } = useSelector(state => state.user)
   
    const [imageUploadProgress, imagerUploadError, resetImageUploadProgress, uploadImage] = useImageUpload()

    const {
      formState, changeHandler, blurHandler, formValidateHandler, formUpdateHandler, formResetHandler
     } = useForm(INITIAL_PROFILE_STATE)

    useEffect(() => {
      if(file) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
      }
    }, [file])


    const onSubmitForm = e => {
      e.preventDefault()

      if(previewUrl) {
        resetImageUploadProgress()
        uploadImage(file)
          .then((imageUrl) => {
            formUpdateHandler({ avatar: imageUrl })
            handleFormSubmit()
          })
          .catch((err) => {
            throw new Error(err)
          })
      } else {
        handleFormSubmit()
      }
    }

    const handleFormSubmit = () => {
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
        .then((res) => {
          dispatch(toastSliceActions.showToast({ type: SUCCESS, header: res.status, body: res.message }))
          formResetHandler(INITIAL_PROFILE_STATE)
        })
        .catch(err => {
          dispatch({ type: ERROR, header: err.response.data.status, body: err.response.data.message })
        })
    }
    
    const handleChange = e => {
      changeHandler(e)
    }

    const { username, email, password, avatar } = formState.inputs

    return (
      <form onSubmit={onSubmitForm} noValidate className="flex flex-col gap-4">
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
          src={previewUrl || currentUser.avatar} 
          alt="avatar"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer my-2 self-center" 
        />
        <div className='text-center'>
          {imagerUploadError ? 
              <Alert type="error" message={imagerUploadError} /> : 
              imageUploadProgress > 0 && imageUploadProgress < 100 ? 
                <Progress progress={imageUploadProgress} /> :
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
    
        {username.error && <FormError message={username.error} /> }
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
          {email.error && <FormError message={email.error} /> }

        <input 
          type={password.type} 
          value={password.value} 
          name={password.name} 
          placeholder={password.placeholder} 
          onChange={handleChange} 
          onBlur={blurHandler}
          className="border p-3 rounded-lg" 
        />
          {password.error && <FormError message={password.error} /> }

        <Button type="submit" disabled={!username.value && !email.value && !password.value && !avatar.value && !previewUrl} className="bg-slate-700">
          {updating ? 'Updating': 'Update'}
        </Button>
        <Button type="button" className="bg-green-700" onClick={() => navigate('/create-listing')}>
          Create Listing
        </Button>


        {/* {error && <Alert type="error" message={error.message} />} */}
        {/* {updateSuccess && <Alert type="success" message="User is updated successfully!!" />} */}
      </form>
    )
}
