import React from 'react';
import { colors } from '../../theme/colors';
import { DevAuthAPI } from '../../api/services';

// PUBLIC_INTERFACE
export default function DevLogin({ onSuccess }) {
  /**
   * Development-only login helper calling POST /api/auth/dev-login.
   * Provides an email field; on success stores token via DevAuthAPI and invokes onSuccess.
   */
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [result, setResult] = React.useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await DevAuthAPI.devLogin({ email });
      setResult(data);
      onSuccess?.(data);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: '.6rem', maxWidth: 360 }}>
      <div style={{ fontWeight: 700 }}>Dev Login</div>
      <input
        type="email"
        required
        placeholder="developer@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: '.6rem .65rem',
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '.6rem .9rem',
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          background: 'rgba(30,58,138,0.08)',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Signing in...' : 'Dev Sign-In'}
      </button>
      {error && <div style={{ color: colors.error }}>{error}</div>}
      {result && <div style={{ color: colors.success }}>Token stored.</div>}
    </form>
  );
}
