'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DEMO_EMAIL = "demo@dukaplug.com";
const DEMO_PASS = "demo123";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const demoEmail = "demo@dukaplug.com";
    const demoPass = "demo123";
    const initLog = `Demo credentials – email: ${demoEmail}, password: ${demoPass}`;
    setLogs([initLog]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp} - Attempted login with email: ${email}, password: ${'*'.repeat(password.length)}`;
    console.log(logEntry);
    setLogs((prev) => [logEntry, ...prev]);

    if (email === DEMO_EMAIL && password === DEMO_PASS) {
      alert('Login successful (demo)');
      router.push('/'); // redirect to home page
    } else {
      alert('Invalid credentials – try demo@dukaplug.com / demo123');
    }

    setEmail('');
    setPassword('');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F0A] text-[#F6F4EC] p-6">
      <h1 className="mb-6 text-4xl font-bold text-[#4CA82E]">DukaPlug Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
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
        <button
          type="submit"
          className="w-full rounded bg-[#4CA82E] py-2 font-bold uppercase text-black hover:opacity-90 transition"
        >
          Sign In
        </button>
      </form>
      <section className="mt-8 w-full max-w-lg">
        <h2 className="mb-2 text-xl font-semibold text-[#FFC400]">Demo Logs</h2>
        <pre className="max-h-48 overflow-y-auto rounded bg-[#121910] p-3 text-xs text-[#9EB29C]">
{logs.map((log, i) => (`${i + 1}. ${log}\n`)).join('')}
        </pre>
      </section>
    </main>
  );
}

