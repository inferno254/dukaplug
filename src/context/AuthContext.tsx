// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export type User = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  locationDetail: string | null;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  clearAuth: () => void;
  updateProfile: (updates: Partial<Omit<User, 'id'>>) => Promise<{ error?: string }>;
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
        supabase.auth.getSession().then(async ({ data: { session } }) => {
          if (session?.user?.id === parsed.id) {
            // Refresh profile data (location may have changed)
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', parsed.id)
              .maybeSingle();

            const authUser: User = {
              id: parsed.id,
              name: profile?.name || parsed.name,
              email: profile?.email || parsed.email,
              phone: profile?.phone || parsed.phone || null,
              location: profile?.location || parsed.location || null,
              locationDetail: profile?.location_detail || parsed.locationDetail || null,
            };
            setUser(authUser);
            localStorage.setItem('authUser', JSON.stringify(authUser));
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

  const clearAuth = useCallback(() => {
    localStorage.removeItem('authUser');
    setUser(null);
  }, []);

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
          location: profile?.location || null,
          locationDetail: profile?.location_detail || null,
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
        // Create profile with default HQ location
        await supabase.from('profiles').insert({
          id: data.user.id,
          name,
          email,
          location: 'HQ · Kitui',
          location_detail: 'DukaPlug HQ, Top Notch, Kitui',
        });

        const authUser: User = {
          id: data.user.id,
          name,
          email,
          phone: null,
          location: 'HQ · Kitui',
          locationDetail: 'DukaPlug HQ, Top Notch, Kitui',
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

  const updateProfile = async (updates: Partial<Omit<User, 'id'>>): Promise<{ error?: string }> => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .maybeSingle();

      if (error) return { error: error.message };

      const updated: User = {
        ...user,
        name: data?.name || user.name,
        email: data?.email || user.email,
        phone: data?.phone || user.phone,
        location: data?.location || user.location,
        locationDetail: data?.location_detail || user.locationDetail,
      };
      setUser(updated);
      localStorage.setItem('authUser', JSON.stringify(updated));
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Update failed' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('authUser');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, clearAuth, updateProfile, loading }}>
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