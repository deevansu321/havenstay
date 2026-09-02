'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { CURRENT_USER, DEMO_HOST_USER } from '@/data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  switchDemoUser: (role: 'guest' | 'host') => void;
  updateProfile: (updated: Partial<User>) => void;
  updateUserProfile: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(CURRENT_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('airbnb_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }
  }, []);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string): Promise<boolean> => {
    const loggedUser: User = {
      ...CURRENT_USER,
      email,
      name: email.split('@')[0].replace('.', ' '),
    };
    setUser(loggedUser);
    try {
      localStorage.setItem('airbnb_user', JSON.stringify(loggedUser));
    } catch {
      // ignore
    }
    setIsAuthModalOpen(false);
    return true;
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      joinedYear: new Date().getFullYear(),
      isHost: false,
      identityVerified: true,
      tripsCount: 0,
      reviewsCount: 0,
    };
    setUser(newUser);
    try {
      localStorage.setItem('airbnb_user', JSON.stringify(newUser));
    } catch {
      // ignore
    }
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('airbnb_user');
    } catch {
      // ignore
    }
  };

  const switchDemoUser = (role: 'guest' | 'host') => {
    const target = role === 'host' ? DEMO_HOST_USER : CURRENT_USER;
    setUser(target);
    try {
      localStorage.setItem('airbnb_user', JSON.stringify(target));
    } catch {
      // ignore
    }
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!user) return;
    const nextUser = { ...user, ...updated };
    setUser(nextUser);
    try {
      localStorage.setItem('airbnb_user', JSON.stringify(nextUser));
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        switchDemoUser,
        updateProfile,
        updateUserProfile: updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

