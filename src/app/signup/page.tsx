'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

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
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-[var(--cream)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(15,20,16,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,20,16,.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating doodles */}
      <span className="absolute top-10 left-10 text-[var(--yellow)] text-7xl rotate-[-15deg]" aria-hidden="true">✦</span>
      <span className="absolute bottom-10 right-10 text-[var(--yellow)] text-7xl rotate-30" aria-hidden="true">~</span>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        {/* Card */}
        <div className="bg-white border border-[var(--line)] rounded-[32px] p-8 md:p-12 shadow-[0_18px_55px_rgba(15,20,16,0.11)]">
          <h1 className="mb-2 text-center font-[Bricolage_Grotesque] text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--ink)]">Create account</h1>
          <p className="mb-8 text-center text-[var(--deep)]/60 text-base">Join DukaPlug and start ordering</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-[14px] bg-red-50 border border-red-200 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--ink)]">Name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full min-h-[52px] px-4 py-3 bg-white border border-[var(--line)] rounded-[16px] text-[var(--ink)] placeholder-[var(--deep)]/30 focus:outline-none focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--mint)] transition-colors"
                placeholder="Your name"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[var(--ink)]">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full min-h-[52px] px-4 py-3 bg-white border border-[var(--line)] rounded-[16px] text-[var(--ink)] placeholder-[var(--deep)]/30 focus:outline-none focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--mint)] transition-colors"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[var(--ink)]">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[52px] px-4 py-3 bg-white border border-[var(--line)] rounded-[16px] text-[var(--ink)] placeholder-[var(--deep)]/30 focus:outline-none focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--mint)] transition-colors"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="yellow"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--deep)]/50">
            Already have an account?{' '}
            <a href="/login" className="text-[var(--green)] font-semibold hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </main>
  );
}