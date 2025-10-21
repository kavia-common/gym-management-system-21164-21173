import React from 'react';
import Layout from '../components/Layout/Layout';

// PUBLIC_INTERFACE
export default function Bookings() {
  /** Bookings page placeholder for viewing and managing class bookings. */
  return (
    <Layout>
      <section>
        <h2 style={{ marginTop: 0 }}>Bookings</h2>
        <p>View and manage your upcoming bookings. Cancel or reschedule as needed.</p>
      </section>
    </Layout>
  );
}
