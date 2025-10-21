import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../theme/colors';

// PUBLIC_INTERFACE
export default function Welcome() {
  /** Neutral landing page with quick navigation to app sections (no authentication). */
  const container = {
    minHeight: '100%',
    display: 'grid',
    placeItems: 'center',
    padding: '2rem',
    background: colors.background,
    color: colors.text,
  };
  const card = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    boxShadow: 'var(--shadow-md)',
    padding: '2rem',
    maxWidth: 720,
    width: '100%',
  };
  const title = {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: 800,
    color: colors.primary,
  };
  const subtitle = {
    marginTop: '.5rem',
    color: colors.muted,
  };
  const ctaRow = {
    marginTop: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.75rem',
  };
  const cta = {
    padding: '.65rem .9rem',
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    background: '#fff',
    color: colors.text,
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <div style={container}>
      <section style={card} aria-label="Welcome">
        <h1 style={title}>{process.env.REACT_APP_APP_NAME || 'Gym Manager'}</h1>
        <p style={subtitle}>
          Welcome to your gym management dashboard. Explore classes, manage bookings, and review memberships.
        </p>
        <div style={ctaRow}>
          <Link to="/dashboard" style={{ ...cta, background: 'rgba(30,58,138,0.06)' }}>
            Go to Dashboard
          </Link>
          <Link to="/classes" style={cta}>View Classes</Link>
          <Link to="/bookings" style={cta}>Manage Bookings</Link>
          <Link to="/memberships" style={cta}>Memberships</Link>
        </div>
      </section>
    </div>
  );
}
