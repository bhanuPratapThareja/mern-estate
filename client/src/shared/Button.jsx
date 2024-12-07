export default function Button({ type, disabled, className, children, ...rest }) {

  const classes = 'capitalize text-white text-sm flex justify-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-75 min-w-[100px]'

  return (
    <button 
      type={type} 
      disabled={disabled}
      className={`${classes} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
