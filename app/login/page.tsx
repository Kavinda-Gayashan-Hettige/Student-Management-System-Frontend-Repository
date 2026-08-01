'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios'; 

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      
      const token = response.data;

     
      localStorage.setItem('token', token);

     
      router.push('/dashboard');
    } catch (err: any) {
      
      if (err.response) {
       
        setError(err.response.data.message || 'Invalid username or password / Access Denied');
      } else if (err.request) {
      
        setError('Unable to connect to the server. Please check if backend is running.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}