import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {

  const {user, logoutUser} = useAuth()
  return (
    <nav className='flex justify-between items-center md:px-24 px-8 py-3 shadow-md w-full'>
      <Link to='/' className='md:text-3xl font-bold text-blue-800'>Stack<span className='text-blue-500'>BUILD</span></Link>
      <div className="">
        {user ? (
          <div className="md:flex flex-wrap items-center space-x-3">
            <h1 className="tracking-wider font-light">{user.email}</h1>
            <button onClick={logoutUser} className="bg-blue-400 text-white text-center font-bold tracking-wider px-8 py-2 rounded-md">Logout</button>
          </div>
        ) : (
          <Link
            to='/register'
            className='bg-blue-500 text-white text-center font-bold tracking-wider px-12 py-2 rounded-md'
          >
              SignUp
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar