import React from 'react';
import Layout from '../components/Layout/Layout';

// PUBLIC_INTERFACE
export default function Classes() {
  /** Classes page placeholder listing upcoming classes. */
  return (
    <Layout>
      <section>
        <h2 style={{ marginTop: 0 }}>Classes</h2>
        <p>Browse and manage available classes. Filter by trainer, time, or category.</p>
      </section>
    </Layout>
  );
}
