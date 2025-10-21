import React, { useEffect } from 'react';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { useDataStore } from '../state/dataStore';

// PUBLIC_INTERFACE
export default function Profile() {
  const { profile, loadProfile, loading } = useDataStore();
  useEffect(() => { loadProfile(); }, [loadProfile]);

  if (loading && !profile) return <Loading label="Loading profile..." />;
  if (!profile) return <EmptyState title="No profile" />;

  return (
    <Card title="Profile">
      <div><strong>Name:</strong> {profile.name}</div>
      <div><strong>Email:</strong> {profile.email}</div>
      <div><strong>Member Since:</strong> {profile.memberSince}</div>
    </Card>
  );
}
