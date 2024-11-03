export default function Button({ type, text, disabled, className, onClick }) {

  const classes = 'capitalize text-white flex justify-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-75 min-w-[100px]'

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
