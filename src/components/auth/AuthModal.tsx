'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { UserCheck, Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, login, register, switchDemoUser } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sync tab with context if opened specifically
  React.useEffect(() => {
    setTab(authModalTab);
  }, [authModalTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (tab === 'login') {
        if (!email) {
          setError('Please enter your email');
          setIsLoading(false);
          return;
        }
        await login(email, password);
      } else {
        if (!name || !email) {
          setError('Please fill in all fields');
          setIsLoading(false);
          return;
        }
        await register(name, email, password);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      title={tab === 'login' ? 'Log in or sign up' : 'Create your account'}
      maxWidth="md"
    >
      <div className="space-y-5">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#222222] tracking-tight">
            {tab === 'login' ? 'Welcome to HavenStay' : 'Experience extraordinary stays'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {tab === 'login'
              ? 'Sign in to access your bookings, wishlists, and host messages.'
              : 'Join a global community of travelers and world-class hosts.'}
          </p>
        </div>

        {/* Quick Demo Switcher */}
        <div className="rounded-2xl bg-rose-50/60 p-3.5 border border-rose-100 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF385C]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instant Demo Account One-Click Switch</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                switchDemoUser('guest');
                closeAuthModal();
              }}
              className="flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 bg-white text-gray-800 rounded-xl border border-rose-200 hover:border-[#FF385C] hover:text-[#FF385C] transition-colors shadow-2xs"
            >
              <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Guest (Aarav)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                switchDemoUser('host');
                closeAuthModal();
              }}
              className="flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 bg-white text-gray-800 rounded-xl border border-rose-200 hover:border-[#FF385C] hover:text-[#FF385C] transition-colors shadow-2xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Superhost (Rohan)</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Full Legal Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm text-[#222222] placeholder-gray-400 focus:border-black focus:outline-hidden transition-colors"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm text-[#222222] placeholder-gray-400 focus:border-black focus:outline-hidden transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm text-[#222222] placeholder-gray-400 focus:border-black focus:outline-hidden transition-colors"
              required
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            {tab === 'login' ? 'Continue' : 'Agree & Create Account'}
          </Button>
        </form>

        <div className="relative flex items-center justify-center py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-gray-400 font-medium">
            or
          </span>
        </div>

        {/* Social Logins */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              login('google.user@gmail.com', 'demo');
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-2.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => {
              login('apple.user@icloud.com', 'demo');
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-2.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-4 w-4 fill-current text-black" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.07.62-2.73 1.39-.58.67-1.1 1.77-.96 2.82 1.05.08 2.12-.52 2.75-1.28" />
            </svg>
            Continue with Apple
          </button>
        </div>

        {/* Tab switch link */}
        <div className="text-center pt-2">
          {tab === 'login' ? (
            <p className="text-xs text-gray-600">
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('register')}
                className="font-semibold text-black underline underline-offset-2 hover:text-[#FF385C]"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('login')}
                className="font-semibold text-black underline underline-offset-2 hover:text-[#FF385C]"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
