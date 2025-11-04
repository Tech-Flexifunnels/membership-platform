import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const isAuth = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();
    
    if (isAuth && currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Update local state after successful API login
    const mockUser = {
      id: 'user_001',
      name: email.split('@')[0],
      email: email,
      avatar: null,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    return { success: true, user: mockUser };
  };

  const logout = async () => {
    // Call API logout
    await authService.logout();
    
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('courseProgress');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
