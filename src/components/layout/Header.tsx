// src/components/layout/Header.tsx
'use client';

import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useAppContext } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { useSearch } from '@/hooks/useSearch';

export default function Header() {
  const { page, go, cartCount, location, openLocation } = useAppContext();
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { results, loading, search, clear } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.name
    ? user.name
    : user?.email
    ? user.email.split('@')[0]
    : null;

  useEffect(() => {
    const t = setTimeout(() => search(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery, search]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery('');
        clear();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [clear]);

  return (
    <header className="header">
      <button className="brand-button" onClick={() => go('home')}>
        <Logo compact={true} />
      </button>
      <div className="nav-search" ref={dropdownRef} style={{ position: 'relative' }}>
        <Icon name="search" />
        <input
          ref={inputRef}
          aria-label="Search DukaPlug"
          placeholder="Search food, groceries, shops..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
        />
        {searchOpen && (
          <div className="search-dropdown">
            {loading ? (
              <p className="search-empty">Searching...</p>
            ) : results.length === 0 ? (
              <p className="search-empty">No results found</p>
            ) : (
              results.map((r) => (
                <button
                  key={r.id}
                  className="search-result"
                  onClick={() => {
                    go('shop');
                    setSearchOpen(false);
                    setSearchQuery('');
                    clear();
                  }}
                >
                  <img src={r.image_url || 'https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=400'} alt={r.name} />
                  <div>
                    <b>{r.name}</b>
                    <small>{r.vendor?.name} · KES {r.price}</small>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
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