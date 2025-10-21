import React from 'react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div className="container" style={{ marginTop: '10vh', textAlign: 'center' }}>
      <h1>404</h1>
      <p className="text-muted">The page you are looking for was not found.</p>
      <Link to="/"><Button variant="primary">Go to Dashboard</Button></Link>
    </div>
  );
}
