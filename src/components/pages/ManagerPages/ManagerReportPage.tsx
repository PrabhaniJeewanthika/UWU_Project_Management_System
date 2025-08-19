// src/pages/manager/ManagerReportPage.tsx
import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { Box, Input } from '@chakra-ui/react';
import { LuSearch } from "react-icons/lu";
import { getAuth } from '../../../lib/api';

type Project = { id: number; title: string };
type Report = {
  id: number;
  project_id: number;
  project_name: string;
  filename: string;
  download_url: string;
  created_at?: string;
};

const ManagerReportPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [loadingProjects, setLoadingProjects] = useState(false);

  const [reports, setReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  const [loadingGen, setLoadingGen] = useState(false);
  const [msg, setMsg] = useState<string>('');
  const [err, setErr] = useState<string>('');

  // Load only THIS manager's projects
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingProjects(true);
        const auth = getAuth();
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/manager/projects/list.php`,
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
        try { data = JSON.parse(text); } catch { throw new Error('Projects API did not return JSON'); }
        if (!res.ok || !data?.success) throw new Error(data?.message || `Load projects failed (HTTP ${res.status})`);
        if (!alive) return;

        const list: Project[] = (data.projects ?? []).map((p: any) => ({
          id: Number(p.id),
          title: String(p.title ?? `Project #${p.id}`),
        }));
        setProjects(list);
        if (list.length && !selectedProjectId) setSelectedProjectId(String(list[0].id));
      } catch (e: any) {
        setErr(e?.message || 'Failed to load your projects.');
      } finally {
        if (alive) setLoadingProjects(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Load previously generated reports (for this manager)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingReports(true);
        setErr('');
        const auth = getAuth();
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/manager/pdf/list.php`,
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
        try { data = JSON.parse(text); } catch { throw new Error('Report list API did not return JSON'); }
        if (!res.ok || !data?.success) throw new Error(data?.message || `Load reports failed (HTTP ${res.status})`);
        if (!alive) return;

        const list: Report[] = (data.reports ?? []).map((r: any) => ({
          id: Number(r.id ?? Date.now()),
          project_id: Number(r.project_id),
          project_name: String(r.project_name ?? `Project #${r.project_id}`),
          filename: String(r.filename ?? 'report.pdf'),
          download_url: String(r.download_url ?? '#'),
          created_at: r.created_at,
        }));
        // newest first (optional)
        list.sort((a, b) => (b.id - a.id));
        setReports(list);
      } catch (e: any) {
        setErr(e?.message || 'Failed to load generated reports.');
      } finally {
        if (alive) setLoadingReports(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleGeneratePDF = async () => {
    setMsg('');
    setErr('');
    const pid = Number(selectedProjectId);
    if (!pid || pid <= 0) {
      setErr('Please select a valid project.');
      return;
    }

    try {
      setLoadingGen(true);
      const auth = getAuth();
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/manager/pdf/generate.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
          },
          credentials: 'include',
          body: JSON.stringify({ project_id: pid }),
        }
      );

      const text = await res.text();
      let data: any;
      try { data = JSON.parse(text); } catch { throw new Error('Generate API did not return JSON'); }

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Failed (HTTP ${res.status})`);
      }

      setMsg(data.message || 'PDF generated.');
      // add to table (top)
      const proj = projects.find(p => p.id === pid);
      setReports(prev => [{
        id: Date.now(),
        project_id: pid,
        project_name: proj?.title || `Project #${pid}`,
        filename: String(data.filename ?? 'report.pdf'),
        download_url: String(data.download_url ?? '#'),
        created_at: new Date().toISOString(),
      }, ...prev]);
    } catch (e: any) {
      setErr(e?.message || 'Server error while generating PDF.');
    } finally {
      setLoadingGen(false);
    }
  };

  return (
    <div className='flex flex-col gap-6 pb-4'>
      <div className='flex justify-between'>
        <div>
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <FileText size={30} />
            Reports
          </div>
          <div className='text text-xs'>Access project reports and Gantt charts</div>
        </div>

        <div className='flex gap-3 items-center'>
          <Box position="relative" width="200px" border="1px solid #CBD5E0" borderRadius="md">
            <Box position="absolute" top="50%" left="8px" transform="translateY(-50%)" zIndex="10">
              <LuSearch size={16} color="gray" />
            </Box>
            <Input
              type="text"
              placeholder="Search Reports"
              pl="30px"
              size="xs"
              border="none"
              borderRadius="md"
              fontSize={'xs'}
            />
          </Box>
        </div>
      </div>

      {/* Controls: select one of THIS manager's projects, then generate */}
      <div className='flex flex-wrap items-center gap-2'>
        <select
          className='border px-2 py-1 rounded text-sm min-w-[220px]'
          disabled={loadingProjects}
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          <option value="">{loadingProjects ? 'Loading projects…' : '— Select your project —'}</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.title} (#{p.id})</option>
          ))}
        </select>

        <button
          disabled={loadingGen || !selectedProjectId}
          onClick={handleGeneratePDF}
          className='text-sm px-3 py-2 rounded bg-black text-white hover:bg-gray-900 disabled:opacity-60'
        >
          {loadingGen ? 'Generating…' : 'Generate PDF'}
        </button>
      </div>

      {/* Any status/errors */}
      {msg && <div className='text-xs text-green-800 border border-green-300 rounded p-2'>{msg}</div>}
      {err && <div className='text-xs text-red-800 border border-red-300 rounded p-2'>{err}</div>}

      {/* Table: generated reports (Project Name, Project Report) */}
      <div className='flex flex-col border rounded-md'>
        <div className='grid grid-cols-3 font-bold text-sm bg-gray-100 p-2 border-b'>
          <div className='pl-1'>Project Name</div>
          <div className='pl-2'>Project Report</div>
          <div className='pl-2'>Download</div>
        </div>

        {loadingReports && (
          <>
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className='grid grid-cols-3 text-xs p-2 border-b opacity-60'>
                <div className='pl-1'>Loading…</div>
                <div className='pl-2'>Loading…</div>
                <div className='pl-2'>Loading…</div>
              </div>
            ))}
          </>
        )}

        {!loadingReports && reports.length === 0 && (
          <div className='text-xs p-2'>No reports generated yet.</div>
        )}

        {!loadingReports && reports.length > 0 && reports.map((r) => (
          <div key={r.id} className='grid grid-cols-3 text-xs p-2 border-b hover:bg-gray-50 transition'>
            <div className='pl-1'>{r.project_name}</div>
            <div className='pl-2'>{r.filename}</div>
            <div className='pl-2'>
              {r.download_url ? (
                <a
                  href={r.download_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline text-blue-700'
                >
                  View / Download
                </a>
              ) : (
                <span className='text-gray-500'>N/A</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerReportPage;
