import React from 'react';
import Layout from '../components/Layout/Layout';
import { colors } from '../theme/colors';
import Table from '../components/common/Table';
import Form from '../components/common/Form';
import Loader from '../components/common/Loader';
import { useGymStore } from '../state/store';

// PUBLIC_INTERFACE
export default function Memberships() {
  /**
   * Memberships CRUD page with list/detail and create/update/delete actions.
   */
  const {
    memberships,
    fetchMemberships,
    createMembership,
    updateMembership,
    deleteMembership,
    selected,
    selectEntity,
    clearSelected,
  } = useGymStore();

  React.useEffect(() => {
    fetchMemberships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isCreating, setIsCreating] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const columns = [
    { key: 'name', header: 'Plan' },
    { key: 'price', header: 'Price' },
    { key: 'durationMonths', header: 'Duration (mo)' },
    { key: 'status', header: 'Status' },
  ];

  const fields = [
    { name: 'name', label: 'Plan Name', required: true, placeholder: 'e.g., Standard' },
    { name: 'price', label: 'Price', type: 'number', required: true, placeholder: 'e.g., 49.99' },
    { name: 'durationMonths', label: 'Duration (months)', type: 'number', required: true, placeholder: 'e.g., 3' },
    { name: 'status', label: 'Status', required: true, placeholder: 'e.g., active' },
  ];

  const card = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '1rem',
    boxShadow: 'var(--shadow-sm)',
  };

  const openDetail = async (row) => {
    await selectEntity('membership', row.id, async (id) => {
      // eslint-disable-next-line no-undef
      const res = await fetch(`/api/memberships/${id}`);
      return res.json();
    });
  };

  const startCreate = () => {
    clearSelected();
    setIsCreating(true);
    setIsEditing(false);
  };

  const startEdit = (row) => {
    selectEntity('membership', row.id, async () => row);
    setIsCreating(false);
    setIsEditing(true);
  };

  const onCreate = async (values) => {
    await createMembership(values);
    setIsCreating(false);
  };

  const onUpdate = async (values) => {
    if (!selected?.data?.id) return;
    await updateMembership(selected.data.id, values);
    setIsEditing(false);
  };

  const onDelete = async (row) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Delete this membership?')) {
      await deleteMembership(row.id);
      if (selected?.data?.id === row.id) clearSelected();
    }
  };

  return (
    <Layout>
      <section style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Memberships</h2>
          <button
            onClick={startCreate}
            style={{
              padding: '.6rem .9rem',
              borderRadius: 8,
              border: `1px solid ${colors.border}`,
              background: 'rgba(30,58,138,0.08)',
              cursor: 'pointer',
            }}
          >
            + New Plan
          </button>
        </div>

        <div style={card}>
          {memberships.loading ? (
            <Loader />
          ) : (
            <Table
              columns={columns}
              data={memberships.items}
              onRowClick={openDetail}
              actions={(row) => (
                <div style={{ display: 'flex', gap: '.4rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(row);
                    }}
                    style={{
                      padding: '.35rem .6rem',
                      borderRadius: 6,
                      border: `1px solid ${colors.border}`,
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(row);
                    }}
                    style={{
                      padding: '.35rem .6rem',
                      borderRadius: 6,
                      border: `1px solid ${colors.border}`,
                      background: 'rgba(220,38,38,0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            />
          )}
        </div>

        {(isCreating || isEditing) && (
          <div style={card}>
            <h3 style={{ marginTop: 0 }}>{isCreating ? 'Create Plan' : 'Edit Plan'}</h3>
            <Form
              fields={fields}
              initial={isEditing ? selected?.data || {} : {}}
              onSubmit={isCreating ? onCreate : onUpdate}
              submitLabel={isCreating ? 'Create' : 'Update'}
            />
          </div>
        )}

        {selected?.entity === 'membership' && !isEditing && !isCreating && (
          <div style={card}>
            <h3 style={{ marginTop: 0 }}>Details</h3>
            {selected.loading ? (
              <Loader />
            ) : selected.error ? (
              <div style={{ color: colors.error }}>{selected.error}</div>
            ) : selected.data ? (
              <div style={{ display: 'grid', gap: '.3rem' }}>
                <div>
                  <strong>Plan:</strong> {selected.data.name}
                </div>
                <div>
                  <strong>Price:</strong> {selected.data.price}
                </div>
                <div>
                  <strong>Duration (months):</strong> {selected.data.durationMonths}
                </div>
                <div>
                  <strong>Status:</strong> {selected.data.status}
                </div>
              </div>
            ) : (
              <div style={{ color: colors.muted }}>Select a plan to see details.</div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}
