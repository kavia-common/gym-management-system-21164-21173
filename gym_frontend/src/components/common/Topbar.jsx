import React from 'react';
import Button from './Button';
import { useAuthStore } from '../../state/authStore';

// PUBLIC_INTERFACE
export default function Topbar() {
  /** Topbar with page title placeholder and account actions. */
  const { user, signOut } = useAuthStore();

  return (
    <header className="topbar">
      <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
        {process.env.REACT_APP_APP_NAME || 'Gym Manager'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span className="text-muted" style={{ fontSize: '.9rem' }}>
          {user?.name || 'User'}
        </span>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </header>
  );
}
