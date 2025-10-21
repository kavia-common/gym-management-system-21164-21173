import React from 'react';
import Layout from '../components/Layout/Layout';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard page placeholder with neutral content. */
  return (
    <Layout>
      <section>
        <h2 style={{ marginTop: 0 }}>Dashboard</h2>
        <p>Welcome to your gym management dashboard. Quick stats and recent activity will appear here.</p>
      </section>
    </Layout>
  );
}
