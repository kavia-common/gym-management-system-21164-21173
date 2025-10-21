import React from 'react';
import Layout from '../components/Layout/Layout';
import { colors } from '../theme/colors';
import { useGymStore } from '../state/store';
import Loader from '../components/common/Loader';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /**
   * Dashboard showing quick summaries for memberships, classes, and bookings.
   */
  const { fetchClasses, fetchBookings, fetchMemberships, classes, bookings, memberships } = useGymStore();

  React.useEffect(() => {
    // fire and forget; each maintains their own loading state
    fetchClasses();
    fetchBookings();
    fetchMemberships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const card = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '1rem',
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <Layout>
      <section>
        <h2 style={{ marginTop: 0 }}>Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
          <div style={card}>
            <strong>Total Classes</strong>
            <div style={{ marginTop: '.35rem', fontSize: '1.6rem', fontWeight: 800, color: colors.primary }}>
              {classes.loading ? <Loader text="Loading..." /> : classes.items.length}
            </div>
          </div>
          <div style={card}>
            <strong>Total Bookings</strong>
            <div style={{ marginTop: '.35rem', fontSize: '1.6rem', fontWeight: 800, color: colors.primary }}>
              {bookings.loading ? <Loader text="Loading..." /> : bookings.items.length}
            </div>
          </div>
          <div style={card}>
            <strong>Membership Plans</strong>
            <div style={{ marginTop: '.35rem', fontSize: '1.6rem', fontWeight: 800, color: colors.primary }}>
              {memberships.loading ? <Loader text="Loading..." /> : memberships.items.length}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
