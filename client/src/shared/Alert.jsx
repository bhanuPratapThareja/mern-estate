import { useEffect, useState } from "react"

export default function Alert({ type, message }) {
  let classes = ''

  switch(type) {
    case 'success':
      classes = 'border-green-600 text-green-600'
      break;
    case 'error':
      classes = 'border-red-700 text-red-700'
      break;
    case 'warning':
      classes = 'border-yellow-600 text-yellow-600'
      break;
    case 'info':
      classes = 'border-teal-500 text-teal-500'
      break;
  }

  return (
    <div 
      className={`w-full rounded-md mt-1 ${classes}`}>
       <p className={`text-sm font-semibold`}>{message}</p>
    </div>
  )
}
