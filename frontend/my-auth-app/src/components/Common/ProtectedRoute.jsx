import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth.js'
import LoadingSpinner from './LoadingSpinner.jsx'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute