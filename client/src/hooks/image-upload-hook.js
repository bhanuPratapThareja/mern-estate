import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export const useImageUpload = () => {
    const [imageUploadProgress, setImageUploadProgress] = useState(0)
    const [imagerUploadError, setImageUploadError] = useState('')

    const resetImageUploadProgress = () => {
        setImageUploadProgress(0)
    }

    const uploadImage = (imageFile) => {
        const promise = new Promise((resolve, reject) => {
            if(imageFile.size / 1024 / 1024 > 2) {
                const error = 'Error Image Upload (image must be less than 2mb)'
                setImageUploadError(error)
                reject(error)
                return promise
            }
            setImageUploadProgress(0)
            setImageUploadError(false)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + imageFile.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, imageFile)

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageUploadProgress(Math.round(progress))
            }, err => {
                console.log('hook upload avatar err: ', err)
                setImageUploadError(err)
                reject(err)
            }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadUrl => {
                    resolve(downloadUrl)
                })
                .catch(err => {
                    console.log('getDownloadURL err ', err)
                    setImageUploadError(err)
                    reject(err)
                })
            })
        })
        return promise
    }

    return [imageUploadProgress, imagerUploadError, resetImageUploadProgress, uploadImage]
}
