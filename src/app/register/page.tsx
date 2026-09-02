'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    await register(name, email, password);
    setIsLoading(false);
    router.push('/');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-airbnb-card space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#222222]">Create your account</h1>
          <p className="text-xs text-gray-500">Join HavenStay to book and host exceptional stays</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Full Legal Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-black focus:outline-hidden"
            />
          </div>

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
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-black focus:outline-hidden"
            />
          </div>

          <Button type="submit" variant="primary" fullWidth isLoading={isLoading} className="py-3.5">
            Agree & Create Account
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-black underline hover:text-[#FF385C]">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
