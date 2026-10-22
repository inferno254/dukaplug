// src/components/layout/Header.tsx
'use client';

import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useAppContext } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { page, go, cartCount, location, openLocation } = useAppContext();
  const { user, logout } = useAuth();

  const displayName = user?.name
    ? user.name
    : user?.email
    ? user.email.split('@')[0]
    : null;

  return (
    <header className="header">
      <button className="brand-button" onClick={() => go('home')}>
        <Logo />
      </button>
      <button className="location-pill" onClick={openLocation}>
        <Icon name="pin" size={18} />
        <span>
          <small>Delivering to</small>
          {location.name}
        </span>
        <span>^.^</span>
      </button>
      <nav className="desktop-nav">
        <ThemeToggle />
        <LanguageToggle />
        <button className="cart-button" onClick={() => go('checkout')}>
          <Icon name="cart" />
          <span>{cartCount}</span>
        </button>
        {user ? (
          <div className="profile-menu" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className={`nav-profile-button ${page === 'profile' ? 'active' : ''}`}
              onClick={() => go('profile')}
              title={displayName || 'Account'}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span className="profile-avatar-mini">
                {(displayName || '?').charAt(0).toUpperCase()}
              </span>
              <span className="profile-name">{displayName || 'Account'}</span>
            </button>
            <button
              className="logout-button"
              onClick={logout}
              title="Log out"
              aria-label="Log out"
            >
              <Icon name="logout" size={18} />
            </button>
          </div>
        ) : (
          <a className="login-button" href="/login">
            Log in
          </a>
        )}
      </nav>
    </header>
  );
}