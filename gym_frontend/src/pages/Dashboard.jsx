import React, { useEffect } from 'react';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { useDataStore } from '../state/dataStore';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Overview KPIs and quick links. */
  const { dashboard, loadDashboard, loading } = useDataStore();

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  if (loading && !dashboard) return <Loading label="Loading dashboard..." />;
  if (!dashboard) return <EmptyState title="No dashboard data" />;

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
      {dashboard.cards.map((c, idx) => (
        <Card key={idx} title={c.title}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{c.value}</div>
          <div className="text-muted">{c.subtitle}</div>
        </Card>
      ))}
    </div>
  );
}
