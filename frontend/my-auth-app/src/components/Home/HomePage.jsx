import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth.js'

const HomePage = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-200/30 to-accent-200/30 rounded-full blur-3xl animate-float animation-delay-400"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in text-balance">
              Welcome to{' '}
              <span className="gradient-text animate-glow">
                AuthApp
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-16 animate-slide-up animation-delay-200 leading-relaxed text-balance">
              A modern, secure authentication system built with React and designed for
              seamless integration with your Go backend API.
            </p>
          </div>

          {isAuthenticated ? (
            <div className="space-y-8 animate-slide-up animation-delay-400">
              <div className="glass-card p-10 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
                  <span className="text-white text-2xl">👋</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Hello, {user?.username || 'User'}! 👋
                </h2>
                <p className="text-lg text-gray-600 mb-8 text-balance">
                  You're successfully authenticated. Explore your profile or manage your account.
                </p>
                <Link
                  to="/profile"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Go to Profile</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up animation-delay-400">
              <Link
                to="/login"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Sign In</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </Link>
              <Link
                to="/signup"
                className="btn-outline inline-flex items-center space-x-2"
              >
                <span>Create Account</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up animation-delay-200 text-balance">
              Built with modern web technologies and security best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="card-interactive p-8 text-center group animate-slide-up">
              <div className="feature-icon bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-6 group-hover:animate-bounce-soft">
                <span className="text-white text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Authentication</h3>
              <p className="text-gray-600 leading-relaxed">JWT-based authentication with automatic token refresh and secure storage.</p>
            </div>

            <div className="card-interactive p-8 text-center group animate-slide-up animation-delay-200">
              <div className="feature-icon bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 group-hover:animate-bounce-soft">
                <span className="text-white text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast & Responsive</h3>
              <p className="text-gray-600 leading-relaxed">Built with React and modern CSS for lightning-fast, responsive user experiences.</p>
            </div>

            <div className="card-interactive p-8 text-center group animate-slide-up animation-delay-400">
              <div className="feature-icon bg-gradient-to-br from-accent-500 to-accent-600 mx-auto mb-6 group-hover:animate-bounce-soft">
                <span className="text-white text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Design</h3>
              <p className="text-gray-600 leading-relaxed">Clean, professional interface with smooth animations and intuitive navigation.</p>
            </div>

            <div className="card-interactive p-8 text-center group animate-slide-up animation-delay-600">
              <div className="feature-icon bg-gradient-to-br from-purple-500 to-purple-600 mx-auto mb-6 group-hover:animate-bounce-soft">
                <span className="text-white text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Protected Routes</h3>
              <p className="text-gray-600 leading-relaxed">Automatic route protection with seamless redirects for authenticated users.</p>
            </div>

            <div className="card-interactive p-8 text-center group animate-slide-up">
              <div className="feature-icon bg-gradient-to-br from-pink-500 to-pink-600 mx-auto mb-6 group-hover:animate-bounce-soft">
                <span className="text-white text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile Ready</h3>
              <p className="text-gray-600 leading-relaxed">Fully responsive design optimized for mobile devices and tablets.</p>
            </div>

            <div className="card-interactive p-8 text-center group animate-slide-up animation-delay-200">
              <div className="feature-icon bg-gradient-to-br from-indigo-500 to-indigo-600 mx-auto mb-6 group-hover:animate-bounce-soft">
                <span className="text-white text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto Token Refresh</h3>
              <p className="text-gray-600 leading-relaxed">Intelligent token management with automatic refresh for uninterrupted sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-primary-25">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">Ready for Your Go Backend</h2>
          <p className="text-xl text-gray-600 mb-12 animate-slide-up animation-delay-200 text-balance">
            This frontend is specifically designed to integrate seamlessly with your existing Go API endpoints.
          </p>
          <div className="bg-gray-900 rounded-3xl p-10 text-left shadow-large animate-slide-up animation-delay-400">
            <div className="flex items-center mb-6">
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse-soft"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse-soft animation-delay-200"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse-soft animation-delay-400"></div>
              </div>
              <span className="text-gray-400 text-lg font-semibold ml-4">Integration Example</span>
            </div>
            <pre className="text-green-400 text-base overflow-x-auto leading-relaxed">
              <code>{`// Expected Go API endpoints:
POST /login     - User login
POST /register  - User registration
GET  /api/profile   - Get user profile`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage