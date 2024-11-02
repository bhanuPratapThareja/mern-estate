export default function Button({ type, text, disabled, className, onClick }) {

  const classes = 'text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-75'

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
