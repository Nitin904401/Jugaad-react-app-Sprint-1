// AuthContext - User authentication state management
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../api/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, validate token here
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { login: apiLogin } = await import('../api/auth');
      const loggedInUser = await apiLogin(email, password);
      setUser(loggedInUser);
      localStorage.setItem('authToken', loggedInUser.token || '');
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    setIsLoading(true);
    try {
      const { register: apiRegister } = await import('../api/auth');
      const newUser = await apiRegister(email, password, name, role as 'customer' | 'vendor' | 'admin');
      setUser(newUser);
      localStorage.setItem('authToken', newUser.token || '');
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { logout: apiLogout } = await import('../api/auth');
      await apiLogout();
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
