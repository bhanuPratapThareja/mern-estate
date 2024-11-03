export default function Progress({ progress }) {
  return (
    <div className='relative flex items-center w-[100%]'>
        <div className='relative w-full h-2.5  overflow-hidden rounded-3xl bg-gray-100'>
          <div role='progressbar' style={{ width: `${progress}%` }} className='flex h-full items-center justify-center bg-indigo-600  text-white rounded-3xl'></div>
        </div>
        <span className='ml-2 rounded-full text-gray-800 text-xs font-medium flex justify-center items-center '>{progress}%</span>
    </div>
  )
}
