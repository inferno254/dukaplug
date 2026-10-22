// src/components/pages/ProfileContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

interface Profile {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  location: string | null;
  location_detail: string | null;
  created_at: string;
}

export default function ProfileContent({ go }: { go: (p: string) => void }) {
  const { user, loading: authLoading, logout } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) return;
      try {
        const res = await fetch('/api/profile', {
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!cancelled && data) {
          setProfile(data);
          setPhone(data.phone || '');
          setLocation(data.location || '');
        }
      } catch {
        // ignore
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    if (!token) { setSaving(false); return; }
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, location, location_detail: 'Top Notch, Kitui' }),
      });
      const data = await res.json();
      if (data) setProfile(data);
    } catch {
      // ignore
    }
    setSaving(false);
  };

  if (authLoading) {
    return (
      <main className="profile-page">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile-page">
        <p>Please log in to view your profile.</p>
        <Button variant="yellow" onClick={() => go('/login')}>
          Log in
        </Button>
      </main>
    );
  }

  const name = profile?.name || user.name || 'User';
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const phoneDisplay = profile?.phone || user.phone || '+254 712 345 678';

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <div>
          <span className="kicker">My account</span>
          <h1>{name}</h1>
          <p>{profile?.email || user.email || 'No email'}</p>
          <Button variant="yellow" onClick={logout}>Log out</Button>
        </div>
      </div>

      <div className="profile-grid">
        <section>
          <h3>Account details</h3>
          <div className="profile-link">
            <span><Icon name="user" /></span>
            <div>
              <b>Full name</b>
              <small>{name}</small>
            </div>
          </div>
          <div className="profile-link">
            <span><Icon name="mail" /></span>
            <div>
              <b>Email</b>
              <small>{profile?.email || user.email || '—'}</small>
            </div>
          </div>
          <div className="profile-link">
            <span><Icon name="phone" /></span>
            <div>
              <b>Phone</b>
              <small>{phoneDisplay}</small>
            </div>
          </div>
        </section>

        <section>
          <h3>Delivery location</h3>
          <div className="profile-link">
            <span><Icon name="pin" /></span>
            <div>
              <b>Current</b>
              <small>{profile?.location_detail || profile?.location || 'Top Notch, Kitui'}</small>
            </div>
          </div>
          <label className="profile-link">
            <span><Icon name="pin" /></span>
            <div>
              <b>Location</b>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%' }}
              />
            </div>
          </label>
          <label className="profile-link">
            <span><Icon name="phone" /></span>
            <div>
              <b>Phone</b>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%' }}
              />
            </div>
          </label>
          <Button variant="yellow" onClick={handleSave} disabled={saving} className="w-full mt-3">
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
        </section>
      </div>
    </main>
  );
}