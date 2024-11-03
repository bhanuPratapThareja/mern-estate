export default function Backdrop({ onClick }) {
  return (
    <div 
        className='fixed top-0 left-0 min-h-screen w-screen bg-black opacity-50 z-10'
        onClick={onClick}
    >    
    </div>
  )
}
