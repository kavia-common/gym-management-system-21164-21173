import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEnv } from '../utils/env';

/**
 * Renders Google Sign-In button using Google Identity Services.
 * Loads the GSI script dynamically and initializes with the Client ID from env.
 * Falls back to a backend /auth/google link if script load or env is missing.
 */

// PUBLIC_INTERFACE
export default function SignInWithGoogle({ style = {} }) {
  /** Sign-in button component that tries GSI and falls back gracefully. */
  const { setUser } = useAuth();
  const btnRef = useRef(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState('');
  const {
    REACT_APP_GOOGLE_CLIENT_ID,
  } = getEnv();

  // Backend base URL for fallback link to start OAuth
  const backendBase = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
  const fallbackHref = `${backendBase}/auth/google`;

  useEffect(() => {
    if (!REACT_APP_GOOGLE_CLIENT_ID) {
      setError('Missing Google Client ID');
      return;
    }

    // If script already present (e.g., loaded elsewhere), use it
    if (window.google && window.google.accounts && window.google.accounts.id) {
      setScriptReady(true);
      return;
    }

    // Dynamically load GSI script to avoid blocking the app
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => {
      setError('Failed to load Google Sign-In');
      setScriptReady(false);
    };
    document.head.appendChild(script);

    return () => {
      // cleanup: do not remove script tag to allow re-use
    };
  }, [REACT_APP_GOOGLE_CLIENT_ID]);

  useEffect(() => {
    if (!scriptReady || !REACT_APP_GOOGLE_CLIENT_ID) return;
    if (!window.google || !window.google.accounts || !window.google.accounts.id) return;

    try {
      // Initialize GSI
      window.google.accounts.id.initialize({
        client_id: REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: 'popup',
        auto_select: false,
      });

      // Render the button with a look aligned to Ocean Professional (primary #1E3A8A)
      // GSI allows data attributes for theme/size. We'll use outline theme and customize container.
      if (btnRef.current) {
        window.google.accounts.id.renderButton(btnRef.current, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
        });
      }
    } catch (e) {
      setError('Failed to initialize Google Sign-In');
    }
  }, [scriptReady, REACT_APP_GOOGLE_CLIENT_ID]);

  function handleCredentialResponse(response) {
    /**
     * When using GSI one-tap/button, response.credential is a JWT from Google.
     * For this step we DO NOT verify or exchange it on the frontend. Typically,
     * you would send it to the backend to verify and create a session.
     * Here we set a placeholder user state to indicate login flow started.
     */
    if (!response || !response.credential) {
      setError('No credential received.');
      return;
    }

    // Placeholder user; in real flow, redirect to backend or call backend API
    setUser({ email: 'google-user@example.com' });
  }

  // Style wrapper with Ocean Professional theme accents
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'stretch',
    ...style,
  };
  const tipStyle = {
    fontSize: '.9rem',
    color: '#6B7280',
  };
  const fallbackLinkStyle = {
    display: 'inline-block',
    padding: '.6rem .9rem',
    borderRadius: '999px',
    textAlign: 'center',
    background: '#1E3A8A',
    color: '#fff',
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <div style={wrapperStyle}>
      {REACT_APP_GOOGLE_CLIENT_ID && !error ? (
        <div
          ref={btnRef}
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            width: '100%',
            padding: '0.25rem',
            borderRadius: '999px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      ) : (
        <a href={fallbackHref} style={fallbackLinkStyle}>
          Continue with Google
        </a>
      )}

      <div style={tipStyle}>
        {error
          ? `Google Sign-In unavailable: ${error}. You can use the fallback link below.`
          : 'If the Google button does not appear, use the fallback:'}
        {' '}
        <a href={fallbackHref} style={{ color: '#1E3A8A', fontWeight: 600 }}>Sign in via backend OAuth</a>
      </div>
    </div>
  );
}
