// src/pages/manager/ManagerProjectViewPage.tsx
import { AppWindow, CheckCircle, Hourglass, Loader2, Circle } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import Button from '../../ui/PublicUI/Button';
import HomePageKanbanBoard from '../../ui/PublicUI/HomepageKanbanBoard';
import { getAuth } from '../../../lib/api';

type Member = {
  enroll_no?: string;
  name: string;
  email: string;
};

type ProjectView = {
  id: number;
  title: string;
  description?: string | null;
  manager_name?: string;
  start_date?: string | null; // "YYYY-MM-DD"
  end_date?: string | null;   // "YYYY-MM-DD"
  members?: Member[];
  task_counts?: Record<string, number>;
};

const ManagerProjectViewPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>('');
  const [project, setProject] = useState<ProjectView | null>(null);

  // Edit form state (shown only after clicking "Edit Project Details")
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<{ title: string; description: string; start_date: string; end_date: string }>({
    title: '',
    description: '',
    start_date: '',
    end_date: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (!id) { setErr('Invalid project id'); setLoading(false); return; }
      setLoading(true); setErr('');

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/manager/projects/view.php?id=${encodeURIComponent(id)}`,
          { credentials: 'include' }
        );

        const text = await res.text();
        let data: any;
        try {
          data = JSON.parse(text);
        } catch {
          console.error('Non-JSON from view API:\n', text);
          throw new Error('API did not return JSON');
        }

        if (!alive) return;

        if (data?.success && data?.project) {
          const pv = data.project as ProjectView;
          setProject(pv);
          // Pre-fill edit form (keep ISO YYYY-MM-DD for <input type="date">)
          setForm({
            title: pv.title || '',
            description: pv.description || '',
            start_date: pv.start_date || '',
            end_date: pv.end_date || ''
          });
        } else {
          setErr(data?.message || 'Failed to load project');
        }
      } catch (e: any) {
        console.error('View project error:', e);
        if (alive) setErr('Server error while loading project.');
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => { alive = false; };
  }, [id]);

  const handleDeleteProject = async () => {
    if (!project?.id) return;
    const yes = window.confirm(`Delete project "${project.title}"? This cannot be undone.`);
    if (!yes) return;

    try {
      setLoading(true);
      setErr('');

      const auth = getAuth();
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/manager/projects/delete.php?id=${encodeURIComponent(project.id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
          },
          credentials: 'include',
        }
      );

      const text = await res.text();
      let data: any;
      try { data = JSON.parse(text); } catch { throw new Error('API did not return JSON'); }

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Delete failed (HTTP ${res.status})`);
      }

      alert('Project deleted successfully.');
      window.history.back();
    } catch (e: any) {
      setErr(e?.message || 'Server error while deleting project.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle edit and prefill fields from current project (no UI style changes)
  const handleStartEdit = () => {
    if (!project) return;
    setForm({
      title: project.title || '',
      description: project.description || '',
      start_date: project.start_date || '',
      end_date: project.end_date || ''
    });
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setErr('');
  };

  const handleSaveEdit = async () => {
    if (!project?.id) return;
    if (!form.title.trim()) { setErr('Title is required.'); return; }
    // Simple optional check for dates (backend will also validate if needed)
    if (form.start_date && form.end_date && form.end_date < form.start_date) {
      setErr('End date cannot be earlier than start date.'); return;
    }

    try {
      setSaving(true);
      setErr('');

      const auth = getAuth();
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/manager/projects/update.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
          },
          credentials: 'include',
          body: JSON.stringify({
            id: project.id,
            title: form.title.trim(),
            description: form.description,
            start_date: form.start_date || null, // backend accepts null
            end_date: form.end_date || null
          })
        }
      );

      const text = await res.text();
      let data: any;
      try { data = JSON.parse(text); } catch { throw new Error('API did not return JSON'); }

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Update failed (HTTP ${res.status})`);
      }

      // success: refresh on-screen project with returned payload
      if (data.project) setProject(data.project as ProjectView);
      setEditing(false);
    } catch (e: any) {
      setErr(e?.message || 'Server error while updating project.');
    } finally {
      setSaving(false);
    }
  };

  const renderBadge = (status: string, count: number) => {
    let icon, className;

    switch (status) {
      case 'TODO':
        icon = <Hourglass size={12} />;
        className = 'bg-yellow-100 text-yellow-800';
        break;
      case 'In Progress':
        icon = <Loader2 size={12} className='animate-spin' />;
        className = 'bg-blue-100 text-blue-800';
        break;
      case 'Testing':
        icon = <Circle size={12} />;
        className = 'bg-purple-100 text-purple-800';
        break;
      case 'Done':
        icon = <CheckCircle size={12} />;
        className = 'bg-green-100 text-green-800';
        break;
      default:
        icon = <Circle size={12} />;
        className = 'bg-gray-100 text-gray-800';
    }

    return (
      <div key={status} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${className}`}>
        {icon}
        {status}: {count}
      </div>
    );
  };

  const fmt = (d?: string | null) => {
    if (!d) return '-';
    const [y, m, day] = d.split('-').map(Number);
    if (!y || !m || !day) return d;
    return `${String(day).padStart(2, '0')}-${String(m).padStart(2, '0')}-${y}`;
  };

  const members = useMemo<Member[]>(() => project?.members ?? [], [project]);

  return (
    <div className='flex flex-col gap-6 pb-4'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <AppWindow size={30} />
            {loading ? 'Loading…' : (project?.title ?? `Project ${id}`)}
          </div>
          <div className='text text-xs'>
            {loading ? 'Fetching project details…' : (project?.description || 'No description')}
          </div>
        </div>
        <div className='flex gap-3'>
          {/* <Button disabled={loading || !project}>Create Task</Button> */}
          <Button disabled={loading || !project}>Add Member</Button>
          <Button disabled={loading || !project} onClick={handleStartEdit}>Edit Project Details</Button>
          <Button disabled={loading || !project} onClick={handleDeleteProject}>Delete Project</Button>
        </div>
      </div>

      {/* Error */}
      {err && (
        <div className='text-sm text-red-600 border border-red-300 rounded p-2'>{err}</div>
      )}

      {/* Inline small edit form (shown only after clicking Edit) */}
      {editing && (
        <div className='flex flex-col gap-3 border rounded-md p-3'>
          <div className='text-sm font-bold'>Edit Project Details</div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='col-span-2'>
              <label className='block text-xs font-bold mb-1'>Title</label>
              <input
                type='text'
                value={form.title}
                onChange={e => setForm(s => ({ ...s, title: e.target.value }))}
                className='w-full px-2 py-1 border rounded'
                placeholder='Project title'
              />
            </div>

            <div className='col-span-2'>
              <label className='block text-xs font-bold mb-1'>Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(s => ({ ...s, description: e.target.value }))}
                className='w-full px-2 py-1 border rounded'
                rows={3}
                placeholder='Short description'
              />
            </div>

            <div>
              <label className='block text-xs font-bold mb-1'>Start Date</label>
              <input
                type='date'
                value={form.start_date || ''}
                onChange={e => setForm(s => ({ ...s, start_date: e.target.value }))}
                className='w-full px-2 py-1 border rounded'
              />
            </div>

            <div>
              <label className='block text-xs font-bold mb-1'>End Date</label>
              <input
                type='date'
                value={form.end_date || ''}
                onChange={e => setForm(s => ({ ...s, end_date: e.target.value }))}
                className='w-full px-2 py-1 border rounded'
              />
            </div>
          </div>

          <div className='flex gap-2'>
            <Button disabled={saving} onClick={handleSaveEdit}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
            <Button disabled={saving} onClick={handleCancelEdit}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Top grid: tuple card + (optional) status badges */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col w-full border rounded-md'>
          <TupleCardRow data={{ title: 'Description', value: loading ? '—' : (project?.description ?? '-') }} />
          <TupleCardRow data={{ title: 'Project Manager', value: loading ? '—' : (project?.manager_name ?? '-') }} />
          <TupleCardRow data={{ title: 'Start Date', value: loading ? '—' : fmt(project?.start_date) }} />
          <TupleCardRow data={{ title: 'End Date', value: loading ? '—' : fmt(project?.end_date) }} />
        </div>

        <div className='flex items-start gap-2 flex-wrap'>
          {!loading && project?.task_counts
            ? Object.entries(project.task_counts).map(([k, v]) => renderBadge(k, Number(v)))
            : null}
        </div>
      </div>

      {/* Members */}
      <div className='flex flex-col border rounded-md'>
        <div className='grid grid-cols-3 font-bold p-1 border-b'>
          <div className='border-r pl-1'>Enrollment Number</div>
          <div className='border-r pl-2'>Name</div>
          <div className='pl-2'>Email</div>
        </div>

        {loading && (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='grid grid-cols-3 text-xs p-1 border-b opacity-50'>
                <div className='border-r pl-1'>Loading…</div>
                <div className='border-r pl-2'>Loading…</div>
                <div className='pl-2'>Loading…</div>
              </div>
            ))}
          </>
        )}

        {!loading && members.length === 0 && (
          <div className='text-xs p-2'>No members added yet.</div>
        )}

        {!loading && members.length > 0 && members.map((m, i) => (
          <div key={i} className='grid grid-cols-3 text-xs p-1 border-b'>
            <div className='border-r pl-1'>{m.enroll_no ?? '-'}</div>
            <div className='border-r pl-2'>{m.name}</div>
            <div className='pl-2'>{m.email}</div>
          </div>
        ))}
      </div>

      {/* Kanban (kept as-is) */}
      <HomePageKanbanBoard />
    </div>
  );
};

const TupleCardRow = ({ data }: { data: { title: string; value: React.ReactNode } }) => (
  <div className='w-full grid grid-cols-2 p-2 text-xs border-b'>
    <div className='font-bold border-r'>{data.title}</div>
    <div className='pl-1'>{data.value}</div>
  </div>
);

export default ManagerProjectViewPage;
