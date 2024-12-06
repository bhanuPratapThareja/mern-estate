export default function Button({ type, text, disabled, className, onClick }) {

  const classes = 'capitalize text-white text-sm flex justify-center rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-75 min-w-[100px]'

  return (
    <button 
      type={type} 
      disabled={disabled}
      className={`${classes} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
