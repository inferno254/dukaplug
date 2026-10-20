'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Demo signup – log in with the demo credentials
    login('erick@example.com', 'erick123');
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F0A] text-[#F6F4EC] p-6">
      <h1 className="mb-6 text-4xl font-bold text-[#4CA82E]">DukaPlug Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm uppercase text-[#9EB29C]">Name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded px-3 py-2 bg-[#121910] border border-[#1E2B1A] text-[#F6F4EC] focus:outline-none focus:ring-2 focus:ring-[#4CA82E]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm uppercase text-[#9EB29C]">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded px-3 py-2 bg-[#121910] border border-[#1E2B1A] text-[#F6F4EC] focus:outline-none focus:ring-2 focus:ring-[#4CA82E]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm uppercase text-[#9EB29C]">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded px-3 py-2 bg-[#121910] border border-[#1E2B1A] text-[#F6F4EC] focus:outline-none focus:ring-2 focus:ring-[#4CA82E]"
          />
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        <Button
          type="submit"
          variant="yellow"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
      <p className="mt-4 text-xs text-[#9EB29C]">
        Already have an account?{' '}
        <a href="/login" className="text-[#4CA82E] underline">
          Log in
        </a>
      </p>
    </main>
  );
}