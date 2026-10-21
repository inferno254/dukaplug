'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    }
    setLoading(false);
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
          <h1 className="mb-2 text-center font-[Bricolage_Grotesque] text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--ink)]">Welcome back</h1>
          <p className="mb-8 text-center text-[var(--deep)]/60 text-base">Sign in to your DukaPlug account</p>

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
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-h-[52px] px-4 py-3 pr-12 bg-white border border-[var(--line)] rounded-[16px] text-[var(--ink)] placeholder-[var(--deep)]/30 focus:outline-none focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--mint)] transition-colors"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[var(--deep)]/50 hover:text-[var(--ink)] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20a10 10 0 0 1-7.27-3A10 10 0 0 1 12 4a10 10 0 0 1 7.27 3 10 10 0 0 1 .67 10.94Z" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="yellow"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--deep)]/50">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-[var(--green)] font-semibold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
}