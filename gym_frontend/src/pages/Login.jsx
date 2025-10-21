import React from 'react';
import SignInWithGoogle from '../components/SignInWithGoogle';
import Card from '../components/common/Card';
import { getEnv } from '../utils/env';

/**
 * PUBLIC_INTERFACE
 * Login page rendering a redirect-only Google sign-in.
 * This approach avoids loading any accounts.google.com scripts/iframes on the frontend,
 * which can be blocked by privacy settings or corporate networks (ERR_BLOCKED_BY_RESPONSE).
 * Path: /login
 */
export default function Login() {
  const { REACT_APP_APP_NAME } = getEnv();
  const backendBase = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
  const fallbackHref = `${backendBase}/auth/google`;

  // Robust error UI: if backend redirected back with ?error=...
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  const errorDescription = params.get('error_description');

  const alertStyle = {
    marginTop: '.75rem',
    padding: '.75rem .9rem',
    borderRadius: '10px',
    border: '1px solid rgba(220,38,38,0.25)',
    background: 'rgba(220,38,38,0.08)',
    color: 'var(--color-error)',
  };

  const helperNoteStyle = {
    marginTop: '.75rem',
    fontSize: '.85rem',
    color: '#6B7280',
  };

  return (
    <div className="container" style={{ maxWidth: 520, marginTop: '10vh' }}>
      <Card title={`Welcome to ${REACT_APP_APP_NAME || 'Gym Manager'}`}>
        <p className="text-muted" style={{ marginTop: 0 }}>
          Sign in using your Google account. You'll be redirected securely to our backend to start the OAuth flow.
        </p>

        {error && (
          <div role="alert" style={alertStyle}>
            <strong>Sign-in error:</strong> {decodeURIComponent(error)}{errorDescription ? ` — ${decodeURIComponent(errorDescription)}` : ''}
          </div>
        )}

        <div className="mt-3">
          <SignInWithGoogle />
        </div>

        <div style={helperNoteStyle}>
          Tip: If clicking the button doesn't work, you can manually open{' '}
          <a href={fallbackHref} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            {fallbackHref}
          </a>
        </div>

        <div style={{ ...helperNoteStyle, marginTop: '.9rem' }}>
          Note: This redirect-only approach avoids embedding accounts.google.com iframes or scripts on the frontend,
          which prevents common blocking by network filters or browser privacy settings.
        </div>
      </Card>
    </div>
  );
}
