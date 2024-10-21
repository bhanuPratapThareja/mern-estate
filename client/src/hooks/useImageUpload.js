import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function useImageUpload() {
    const [imageUploadProgress, setImageUploadProgress] = useState(0)
    const [imagerUploadError, setImageUploadError] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const uploadImage = (imageFile) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setImageUploadProgress(Math.round(progress))
        }, err => {
        console.log('hook upload avatar err: ', err)
        setImageUploadError(true)
        }, () => {
        getDownloadURL(uploadTask.snapshot.ref)
            .then(downloadUrl => {
                setImageUrl(downloadUrl)
            })
        })
    }

    return [imageUploadProgress, imagerUploadError, imageUrl, uploadImage]
}
