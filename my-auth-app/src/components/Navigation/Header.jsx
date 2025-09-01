import { Link, NavLink,useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth.js'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }


  return (
    <header className="bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-soft sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-colored">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              AuthApp
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  className={({isActive}) => (isActive ? "text-red-500":"text-gray-300")}
                >
                  Profile
                </NavLink>
                
                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center shadow-medium">
                      <span className="text-white text-sm font-semibold">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-800 font-semibold">
                      {user?.username || 'User'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 text-gray-600 hover:text-red-600 font-semibold transition-all duration-300 hover:bg-red-50 rounded-xl hover:shadow-soft"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({isActive})=>(isActive ? "text-green-600":"text-orange-500")}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({isActive})=>(isActive ? "text-green-600":"text-orange-500")}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header