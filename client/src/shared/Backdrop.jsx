export default function Backdrop({ onClick, applyTransition }) {
  return (
    <div 
        className={`fixed top-0 left-0 min-h-screen w-screen bg-black z-10
            transition-opacity duration-300 ease-in-out ${!applyTransition ? 'opacity-0' : 'opacity-50'}
          `}
        onClick={onClick}
    >    
    </div>
  )
}
