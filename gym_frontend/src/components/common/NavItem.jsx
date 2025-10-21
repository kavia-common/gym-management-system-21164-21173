import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NavItem({ to, label }) {
  /** Single navigation item for sidebar. */
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
    >
      {label}
    </NavLink>
  );
}
