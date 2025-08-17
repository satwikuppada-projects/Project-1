import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@school.edu',
    name: 'Sarah Johnson',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date(),
    lastLoginAt: new Date(),
  },
  {
    id: 'teacher-1',
    email: 'teacher@school.edu',
    name: 'Michael Chen',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date(),
    lastLoginAt: new Date(),
  },
  {
    id: 'parent-1',
    email: 'parent@school.edu',
    name: 'Emily Davis',
    role: 'parent',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date(),
    lastLoginAt: new Date(),
  },
  {
    id: 'student-1',
    email: 'student@school.edu',
    name: 'Alex Kumar',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date(),
    lastLoginAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('school_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      const updatedUser = { ...foundUser, lastLoginAt: new Date() };
      setUser(updatedUser);
      localStorage.setItem('school_user', JSON.stringify(updatedUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('school_user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('school_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}