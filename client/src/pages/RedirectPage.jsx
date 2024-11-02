import { useState } from 'react'

export default function RedirectPage() {
    const [redirectIn, setRedictIn] = useState(5)

    return (
        <div className='border-2 border-red-500 '>
            <h1>You are not signed in and will be redirected to home page in </h1>
        </div>
    )
}
