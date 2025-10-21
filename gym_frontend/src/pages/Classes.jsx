import React, { useEffect } from 'react';
import Table from '../components/common/Table';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { useDataStore } from '../state/dataStore';

// PUBLIC_INTERFACE
export default function Classes() {
  const { classesList, loadClasses, loading } = useDataStore();
  useEffect(() => { loadClasses(); }, [loadClasses]);

  if (loading && classesList.length === 0) return <Loading label="Loading classes..." />;
  if (classesList.length === 0) return <EmptyState title="No classes scheduled" />;

  const columns = [
    { header: 'Class', accessor: 'name' },
    { header: 'Trainer', accessor: 'trainer' },
    { header: 'Time', accessor: 'time' },
    { header: 'Spots', accessor: 'spots' },
  ];

  return <Table columns={columns} data={classesList} />;
}
