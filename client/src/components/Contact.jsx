import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getContact } from '../store'

export default function Contact({ listing }) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')

    const { data: landlord, loading, error } = useSelector(state => state.contact)

    useEffect(() => {
        fetchOwnerContact()
    }, [])

    const fetchOwnerContact = () => {
        dispatch(getContact(listing.userRef))
    }

    const handleChange = e => {
        setMessage(e.target.value)
    }

    console.log(message)

    return (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username}</span>{' '}
                for <span className='font-semibold lowercase'>{listing.name}</span>
            </p>
            <textarea 
                value={message} 
                placeholder='Enter your message here...'
                name='message' 
                id='message' 
                rows={2}
                className='w-full border outline-none p-3 rounded-lg'
                onChange={handleChange}>
            </textarea>
            <Link 
                to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                    className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                >
                    Send Message
            </Link>
        </div>
    )
}
