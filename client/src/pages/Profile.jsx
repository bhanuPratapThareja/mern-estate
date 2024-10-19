import { useSelector } from "react-redux"

export default function () {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img 
          src={currentUser.avatar} 
          alt="avatar" 
          className="rounded-full h-24 w-24 object-cover cursor-pointer my-2 self-center" 
        />
        <input type="text" placeholder="User Name" className="border p-3 rounded-lg" />
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" />

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-75">Update</button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
