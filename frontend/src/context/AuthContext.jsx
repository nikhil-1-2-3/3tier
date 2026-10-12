import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.auth.me();
        if (response.success && response.user) {
          setUser(response.user);
        }
      } catch (err) {
        // Not logged in or session expired
        setUser(null);
        localStorage.removeItem('lw_token');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.auth.login({ email, password });
    if (response.success && response.user) {
      setUser(response.user);
      if (response.token) {
        localStorage.setItem('lw_token', response.token);
      }
    }
    return response;
  };

  const signup = async (userData) => {
    const response = await api.auth.signup(userData);
    if (response.success && response.user) {
      setUser(response.user);
      if (response.token) {
        localStorage.setItem('lw_token', response.token);
      }
    }
    return response;
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      console.warn('Logout API warning:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('lw_token');
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
