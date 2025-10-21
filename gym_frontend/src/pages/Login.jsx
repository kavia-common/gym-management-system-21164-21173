import React from 'react';
import SignInWithGoogle from '../components/SignInWithGoogle';
import Card from '../components/common/Card';
import { getEnv } from '../utils/env';

/**
 * Login page that renders Google Sign-In and a fallback link to backend OAuth.
 * Path: /login
 */

// PUBLIC_INTERFACE
export default function Login() {
  const { REACT_APP_APP_NAME } = getEnv();
  const backendBase = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
  const fallbackHref = `${backendBase}/auth/google`;

  return (
    <div className="container" style={{ maxWidth: 480, marginTop: '10vh' }}>
      <Card title={`Welcome to ${REACT_APP_APP_NAME || 'Gym Manager'}`}>
        <p className="text-muted" style={{ marginTop: 0 }}>
          Continue with your Google account to sign in.
        </p>

        <SignInWithGoogle style={{ marginTop: '.5rem' }} />

        <div style={{ marginTop: '1rem', fontSize: '.9rem' }}>
          Having trouble?{' '}
          <a href={fallbackHref} style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
            Start sign-in via backend
          </a>
        </div>
      </Card>
    </div>
  );
}
