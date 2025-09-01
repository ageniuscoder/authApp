import { useState, useEffect, useMemo,useCallback } from 'react';
import { authAPI } from '../services/api.js';
import { getToken, setToken, removeToken, isTokenExpired } from '../utils/auth.js';
import { AuthContext} from './Auth.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {        //i can do like that or i can use self calling functions here
      try {
        const token = getToken();
        if (token && !isTokenExpired(token)) {
          // Verify token with backend and get user profile
          const userProfile = await authAPI.getProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
        } else {
          // Token is expired or doesn't exist
          removeToken();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        removeToken();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.token) {
        setToken(response.token);
        const userProfile = await authAPI.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
        return { success: true, user: userProfile };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  },[]);

  const signup = useCallback(async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.signup(userData);
      
      if (response.id && response.username) {
        const tokenResponse = await authAPI.login({ identifier: response.username, password: userData.password });
        setToken(tokenResponse.token);
        const userProfile = await authAPI.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
        return { success: true, user: userProfile };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Signup failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || error.response?.data?.errors || error.message || 'Signup failed' 
      };
    } finally {
      setLoading(false);
    }
  },[]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  },[]);

  const value = useMemo(() => (
    {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
  }
  ),[user,loading,isAuthenticated,login,signup,logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};