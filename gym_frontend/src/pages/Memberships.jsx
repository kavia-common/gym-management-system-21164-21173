import React, { useEffect } from 'react';
import Table from '../components/common/Table';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/common/Badge';
import { useDataStore } from '../state/dataStore';
import { formatCurrency } from '../utils/formatters';

// PUBLIC_INTERFACE
export default function Memberships() {
  const { memberships, loadMemberships, loading } = useDataStore();
  useEffect(() => { loadMemberships(); }, [loadMemberships]);

  if (loading && memberships.length === 0) return <Loading label="Loading memberships..." />;
  if (memberships.length === 0) return <EmptyState title="No memberships" />;

  const columns = [
    { header: 'Plan', accessor: 'name' },
    { header: 'Price', accessor: 'price', cell: r => formatCurrency(r.price) },
    { header: 'Status', accessor: 'status', cell: r => <Badge type={r.status === 'Active' ? 'success' : 'info'}>{r.status}</Badge> },
  ];

  return <Table columns={columns} data={memberships} />;
}
