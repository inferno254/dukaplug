'use client';

import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useAppContext } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { page, go, cartCount, location, openLocation } = useAppContext();
  const { user, logout } = useAuth();

  // Smart name display: first name only, fallback to email prefix
  const displayName = user?.name
    ? user.name.split(' ')[0]
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
      <div className="nav-search">
        <Icon name="search" />
        <input
          aria-label="Search DukaPlug"
          placeholder="Search food, groceries, shops..."
        />
      </div>
      <nav className="desktop-nav">
        <button className={page === 'vendor' ? 'active' : ''} onClick={() => go('vendor')}>
          Sell on DukaPlug
        </button>
        <button className="cart-button" onClick={() => go('checkout')}>
          <Icon name="cart" />
          <span>{cartCount}</span>
        </button>
        {user ? (
          <button
            className={`nav-profile-button ${page === 'profile' ? 'active' : ''}`}
            onClick={() => go('profile')}
            title={user.name || displayName || 'Account'}
          >
            <span className="profile-avatar-mini">
              {(displayName || '?').charAt(0).toUpperCase()}
            </span>
            <span className="profile-name">{displayName || 'Account'}</span>
          </button>
        ) : (
          <a className="login-button" href="/login">
            Log in
          </a>
        )}
        <ThemeToggle />
        <LanguageToggle />
      </nav>
    </header>
  );
}