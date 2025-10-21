import React, { useEffect } from 'react';
import Table from '../components/common/Table';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { useDataStore } from '../state/dataStore';
import { formatCurrency } from '../utils/formatters';

// PUBLIC_INTERFACE
export default function Payments() {
  const { payments, loadPayments, loading } = useDataStore();
  useEffect(() => { loadPayments(); }, [loadPayments]);

  if (loading && payments.length === 0) return <Loading label="Loading payments..." />;
  if (payments.length === 0) return <EmptyState title="No payments found" />;

  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Amount', accessor: 'amount', cell: r => formatCurrency(r.amount) },
    { header: 'Method', accessor: 'method' },
    { header: 'Status', accessor: 'status' },
  ];

  return <Table columns={columns} data={payments} />;
}
