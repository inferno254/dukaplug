'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

interface Profile {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: string;
}

export default function ProfileContent({ go }: { go: (p: string) => void }) {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => setProfile(data))
      .catch(() => {});
  }, [user]);

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
  const phone = profile?.phone || user.phone || '+254 712 345 678';

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <div>
          <span className="kicker">KARIBU BACK</span>
          <h1>{name}</h1>
          <p>{phone}</p>
        </div>
        <button>Edit profile</button>
      </section>
      <div className="profile-grid">
        <section>
          <h2>Your DukaPlug</h2>
          {[
            ["pin", "Saved addresses", "Home, Campus"],
            ["receipt", "Order history", "View past orders"],
            ["heart", "Favourite shops", "Saved spots"],
          ].map(([icon, title, copy]) => (
            <button key={title} className="profile-link">
              <span><Icon name={icon} /></span>
              <div>
                <b>{title}</b>
                <small>{copy}</small>
              </div>
              <Icon name="chevron" />
            </button>
          ))}
        </section>
        <section className="recent-orders">
          <h2>Recent order</h2>
          <div className="recent-card">
            <img src="https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200" alt="" />
            <div>
              <span className="delivered">Delivered</span>
              <h3>Mama Njeri's Kitchen</h3>
              <p>2 items · KES 860</p>
              <small>Saturday, 12:58 PM</small>
              <Button variant="ghost" onClick={() => go('/shop')}>
                Order again
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}