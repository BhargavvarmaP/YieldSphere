import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addNotification } from '../store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Validate token and fetch user data
          const response = await fetch('/api/auth/validate', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem('authToken', token);
      setUser(user);
      
      dispatch(addNotification({
        type: 'success',
        message: 'Login successful',
      }));
      
      navigate('/dashboard');
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Login failed. Please check your credentials.',
      }));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      navigate('/');
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      dispatch(addNotification({
        type: 'success',
        message: 'Registration successful. Please verify your email.',
      }));

      navigate('/login');
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Registration failed. Please try again.',
      }));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Password reset request failed');
      }

      dispatch(addNotification({
        type: 'success',
        message: 'Password reset instructions sent to your email.',
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to send password reset instructions.',
      }));
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);

      dispatch(addNotification({
        type: 'success',
        message: 'Profile updated successfully',
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to update profile',
      }));
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email/${token}`);
      
      if (!response.ok) {
        throw new Error('Email verification failed');
      }

      dispatch(addNotification({
        type: 'success',
        message: 'Email verified successfully',
      }));

      if (user) {
        setUser({ ...user, isVerified: true });
      }
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Email verification failed',
      }));
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
