import React from 'react';
import Layout from '../components/Layout/Layout';
import { colors } from '../theme/colors';
import Table from '../components/common/Table';
import Form from '../components/common/Form';
import Loader from '../components/common/Loader';
import { useGymStore } from '../state/store';

// PUBLIC_INTERFACE
export default function Classes() {
  /**
   * Classes CRUD page with list/detail and create/update/delete actions.
   */
  const {
    classes,
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
    selected,
    selectEntity,
    clearSelected,
  } = useGymStore();

  React.useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isCreating, setIsCreating] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'trainer', header: 'Trainer' },
    { key: 'category', header: 'Category' },
    { key: 'scheduledAt', header: 'Date/Time' },
  ];

  const fields = [
    { name: 'title', label: 'Title', required: true, placeholder: 'e.g., Morning Yoga' },
    { name: 'trainer', label: 'Trainer', required: true, placeholder: 'e.g., Alex Morgan' },
    { name: 'category', label: 'Category', required: true, placeholder: 'e.g., Yoga' },
    { name: 'scheduledAt', label: 'Date/Time', type: 'datetime-local', required: true },
  ];

  const card = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '1rem',
    boxShadow: 'var(--shadow-sm)',
  };

  const openDetail = async (row) => {
    await selectEntity('class', row.id, async (id) => {
      // re-use local store to avoid refetch list; but hit API for freshest
      // eslint-disable-next-line no-undef
      const res = await fetch(`/api/classes/${id}`);
      return res.json();
    });
  };

  const startCreate = () => {
    clearSelected();
    setIsCreating(true);
    setIsEditing(false);
  };

  const startEdit = (row) => {
    selectEntity('class', row.id, async () => row); // use row as current detail
    setIsCreating(false);
    setIsEditing(true);
  };

  const onCreate = async (values) => {
    await createClass(values);
    setIsCreating(false);
  };

  const onUpdate = async (values) => {
    if (!selected?.data?.id) return;
    await updateClass(selected.data.id, values);
    setIsEditing(false);
  };

  const onDelete = async (row) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Delete this class?')) {
      await deleteClass(row.id);
      if (selected?.data?.id === row.id) clearSelected();
    }
  };

  return (
    <Layout>
      <section style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Classes</h2>
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
            + New Class
          </button>
        </div>

        <div style={card}>
          {classes.loading ? (
            <Loader />
          ) : (
            <Table
              columns={columns}
              data={classes.items}
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
            <h3 style={{ marginTop: 0 }}>{isCreating ? 'Create Class' : 'Edit Class'}</h3>
            <Form
              fields={fields}
              initial={isEditing ? selected?.data || {} : {}}
              onSubmit={isCreating ? onCreate : onUpdate}
              submitLabel={isCreating ? 'Create' : 'Update'}
            />
          </div>
        )}

        {selected?.entity === 'class' && !isEditing && !isCreating && (
          <div style={card}>
            <h3 style={{ marginTop: 0 }}>Details</h3>
            {selected.loading ? (
              <Loader />
            ) : selected.error ? (
              <div style={{ color: colors.error }}>{selected.error}</div>
            ) : selected.data ? (
              <div style={{ display: 'grid', gap: '.3rem' }}>
                <div>
                  <strong>Title:</strong> {selected.data.title}
                </div>
                <div>
                  <strong>Trainer:</strong> {selected.data.trainer}
                </div>
                <div>
                  <strong>Category:</strong> {selected.data.category}
                </div>
                <div>
                  <strong>Scheduled At:</strong> {selected.data.scheduledAt}
                </div>
              </div>
            ) : (
              <div style={{ color: colors.muted }}>Select a class to see details.</div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}
