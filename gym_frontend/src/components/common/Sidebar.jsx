import React from 'react';
import NavItem from './NavItem';
import logo from '../../assets/logo.svg';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar navigation with app logo and primary routes. */
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="App logo" width="28" height="28" />
        <span>{process.env.REACT_APP_APP_NAME || 'Gym Manager'}</span>
      </div>
      <nav className="nav">
        <NavItem to="/" label="Dashboard" />
        <NavItem to="/memberships" label="Memberships" />
        <NavItem to="/classes" label="Classes" />
        <NavItem to="/bookings" label="Bookings" />
        <NavItem to="/payments" label="Payments" />
        <NavItem to="/profile" label="Profile" />
      </nav>
    </aside>
  );
}
