import axios from 'axios'
import { getToken, removeToken } from '../utils/auth.js'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication API endpoints
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/login', credentials)
    return response.data
  },

  signup: async (userData) => {
    const response = await api.post('/signup', userData)
    return response.data
  },

  getProfile: async () => {
    console.log("api called");
    const response = await api.get('/api/profile')
    return response.data
  },
}

export default api