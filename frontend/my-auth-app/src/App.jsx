import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/Auth.js';
import Header from './components/Navigation/Header.jsx'
import HomePage from './components/Home/HomePage.jsx'
import LoginForm from './components/Auth/LoginForm.jsx'
import SignupForm from './components/Auth/SignupForm.jsx'
import ProfilePage from './components/Profile/ProfilePage.jsx'
import ProtectedRoute from './components/Common/ProtectedRoute.jsx'
import LoadingSpinner from './components/Common/LoadingSpinner.jsx'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading application..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App