import React from 'react';
import { NavLink } from 'react-router-dom';
import { colors } from '../../theme/colors';

// PUBLIC_INTERFACE
export default function SideNav() {
  /** Vertical side navigation with primary routes. */
  const wrapper = {
    gridArea: 'sidebar',
    background: colors.surface,
    borderRight: `1px solid ${colors.border}`,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
  };
  const logo = {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    fontWeight: 800,
    color: colors.primary,
    marginBottom: '.75rem',
  };
  const navLink = ({ isActive }) => ({
    padding: '.55rem .6rem',
    borderRadius: 6,
    color: '#1f2937',
    background: isActive ? 'rgba(30,58,138,0.08)' : 'transparent',
  });

  return (
    <aside style={wrapper}>
      <div style={logo}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            background: colors.gradient,
            border: `1px solid ${colors.border}`,
          }}
          aria-hidden="true"
        />
        <span>{process.env.REACT_APP_APP_NAME || 'Gym Manager'}</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
        <NavLink to="/dashboard" style={navLink} end>Dashboard</NavLink>
        <NavLink to="/classes" style={navLink}>Classes</NavLink>
        <NavLink to="/bookings" style={navLink}>Bookings</NavLink>
        <NavLink to="/memberships" style={navLink}>Memberships</NavLink>
      </nav>
    </aside>
  );
}
