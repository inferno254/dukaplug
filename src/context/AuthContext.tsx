// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export type User = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  clearAuth: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session and validate with Supabase
    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Verify session is still valid
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user?.id === parsed.id) {
            setUser(parsed);
          } else {
            localStorage.removeItem('authUser');
          }
          setLoading(false);
        });
      } catch {
        localStorage.removeItem('authUser');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        const authUser: User = {
          id: data.user.id,
          name: profile?.name || data.user.email?.split('@')[0] || 'User',
          email: data.user.email || null,
          phone: profile?.phone || null,
        };

        setUser(authUser);
        localStorage.setItem('authUser', JSON.stringify(authUser));
        router.push('/');
        return {};
      }
      return { error: 'Login failed - no user returned' };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Create profile
        await supabase.from('profiles').insert({
          id: data.user.id,
          name,
          email,
        });

        const authUser: User = {
          id: data.user.id,
          name,
          email,
          phone: null,
        };

        setUser(authUser);
        localStorage.setItem('authUser', JSON.stringify(authUser));
        router.push('/login');
        return {};
      }
      return { error: 'Signup failed - no user returned' };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Signup failed' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('authUser');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, clearAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}