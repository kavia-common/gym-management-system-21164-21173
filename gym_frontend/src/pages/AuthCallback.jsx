import React, { useEffect } from 'react';
import Loading from '../components/common/Loading';
import { useAuthStore } from '../state/authStore';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function AuthCallback() {
  const { handleRedirect } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await handleRedirect();
      navigate('/', { replace: true });
    })();
  }, [handleRedirect, navigate]);

  return <div className="container" style={{ marginTop: '10vh' }}><Loading label="Completing sign-in..." /></div>;
}
