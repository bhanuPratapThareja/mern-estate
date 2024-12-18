import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = e => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  return (
    <header className="bg-slate-400/50 backdrop-blur-sm shadow-md fixed w-full z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-lg flex flex-wrap">
            <span className="text-slate-700">Mern</span>
            <span className="text-slate-900">Estate</span>
          </h1>
        </Link>
        
        <form onSubmit={handleSubmit} noValidate className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs bg-slate-100 focus:outline-none w-28 sm:w-60"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-500" />
          </button>
        </form>

        <ul className="flex gap-4 text-sm items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline font-bold">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline font-bold">
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? 
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" /> : 
              <li className="text-slate-700 text-md font-bold">Sign in</li>
            }
          </Link>
        </ul>
      </div>
    </header>
  );
}
