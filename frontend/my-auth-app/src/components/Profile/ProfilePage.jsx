
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth.js'
import LoadingSpinner from '../Common/LoadingSpinner.jsx'


const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth()
  
  if (authLoading) {
    return <LoadingSpinner text="Loading user profile..." />
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="relative max-w-md w-full space-y-8 animate-slide-up">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-8 animate-bounce-soft shadow-large">
            <span className="text-white text-3xl font-bold">P</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Your Profile</h2>
          <p className="text-lg text-gray-600 text-balance">Manage your account information</p>
        </div>

        <div className="glass-card p-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-800 mb-2">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={user?.username || ''}
                className="input-field cursor-not-allowed bg-gray-100/70"
                disabled
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user?.email || ''}
                className="input-field cursor-not-allowed bg-gray-100/70"
                disabled
              />
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                <Link to="/" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-colors duration-300">Go back to Home</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage