import React from 'react';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import './index.css';
import './App.css';
import AppRoutes from './router/AppRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const barStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.6rem .9rem',
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
  };
  const brandStyle = { fontWeight: 800, color: 'var(--color-primary)' };
  const actionsStyle = { display: 'flex', alignItems: 'center', gap: '.5rem' };
  const loginBtnStyle = {
    padding: '.4rem .75rem',
    borderRadius: '999px',
    border: '1px solid var(--color-primary)',
    color: '#fff',
    background: 'var(--color-primary)',
  };
  const logoutBtnStyle = {
    padding: '.4rem .75rem',
    borderRadius: '999px',
    border: '1px solid var(--color-secondary)',
    color: '#111',
    background: 'var(--color-secondary)',
  };

  const onLogin = () => navigate('/login');
  const onLogout = () => logout();

  return (
    <nav style={barStyle}>
      <Link to="/" style={brandStyle}>
        {process.env.REACT_APP_APP_NAME || 'Gym Manager'}
      </Link>
      <div style={actionsStyle}>
        <span className="text-muted" style={{ fontSize: '.9rem' }}>
          {user?.email || 'Guest'}
        </span>
        {user ? (
          <button onClick={onLogout} style={logoutBtnStyle}>Logout</button>
        ) : (
          <button onClick={onLogin} style={loginBtnStyle}>Login</button>
        )}
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root app renders Router + Routes with AuthProvider and a top nav. */
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
