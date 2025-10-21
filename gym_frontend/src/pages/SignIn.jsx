import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuthStore } from '../state/authStore';

// PUBLIC_INTERFACE
export default function SignIn() {
  const { signInWithGoogle, loading } = useAuthStore();

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: '10vh' }}>
      <Card title="Welcome to Gym Manager">
        <p className="text-muted">Sign in to continue</p>
        <Button variant="primary" onClick={signInWithGoogle} disabled={loading}>
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </Button>
      </Card>
    </div>
  );
}
