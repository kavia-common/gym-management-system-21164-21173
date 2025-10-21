import React from 'react';
import { colors } from '../../theme/colors';

// PUBLIC_INTERFACE
export default function TopBar() {
  /** Top navigation bar with app title and profile placeholder. */
  const barStyle = {
    gridArea: 'topbar',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    padding: '0 .75rem',
    height: 60,
  };

  return (
    <header style={barStyle}>
      <div style={{ fontWeight: 800, color: colors.primary }}>
        {process.env.REACT_APP_APP_NAME || 'Gym Manager'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: colors.gradient,
            border: `1px solid ${colors.border}`,
          }}
          aria-hidden="true"
        />
        <span style={{ color: colors.muted, fontSize: '.9rem' }}>Profile</span>
      </div>
    </header>
  );
}
