import React, { useEffect } from 'react';
import Table from '../components/common/Table';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { useDataStore } from '../state/dataStore';

// PUBLIC_INTERFACE
export default function Bookings() {
  const { bookings, loadBookings, loading } = useDataStore();
  useEffect(() => { loadBookings(); }, [loadBookings]);

  if (loading && bookings.length === 0) return <Loading label="Loading bookings..." />;
  if (bookings.length === 0) return <EmptyState title="No bookings yet" />;

  const columns = [
    { header: 'Class', accessor: 'className' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status' },
  ];

  return <Table columns={columns} data={bookings} />;
}
