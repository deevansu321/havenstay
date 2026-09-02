'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { Mail, Lock, Sparkles, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchDemoUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    router.push('/');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-airbnb-card space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#222222]">Welcome back</h1>
          <p className="text-xs text-gray-500">Sign in to your HavenStay account</p>
        </div>

        {/* Demo Fast Switch */}
        <div className="rounded-2xl bg-rose-50/70 p-3.5 border border-rose-100 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF385C]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instant Demo Quick-Login</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                switchDemoUser('guest');
                router.push('/');
              }}
              className="py-2 px-3 bg-white text-gray-800 rounded-xl border border-rose-200 text-xs font-semibold hover:border-[#FF385C] shadow-2xs"
            >
              Guest (Aarav)
            </button>
            <button
              type="button"
              onClick={() => {
                switchDemoUser('host');
                router.push('/');
              }}
              className="py-2 px-3 bg-white text-gray-800 rounded-xl border border-rose-200 text-xs font-semibold hover:border-[#FF385C] shadow-2xs"
            >
              Superhost (Rohan)
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-black focus:outline-hidden"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-black focus:outline-hidden"
            />
          </div>

          <Button type="submit" variant="primary" fullWidth isLoading={isLoading} className="py-3.5">
            Log in
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-600">
          Don’t have an account?{' '}
          <Link href="/register" className="font-bold text-black underline hover:text-[#FF385C]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
