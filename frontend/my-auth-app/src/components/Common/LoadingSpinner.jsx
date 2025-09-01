import React from 'react'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mb-6`}></div>
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-transparent border-t-secondary-400 absolute top-0 left-0 mb-6`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="text-gray-700 font-semibold text-lg animate-pulse-soft">{text}</p>
    </div>
  )
}

export default LoadingSpinner