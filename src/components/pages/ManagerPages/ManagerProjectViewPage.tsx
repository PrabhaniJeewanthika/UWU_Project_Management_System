import { AppWindow } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ManagerProjectViewPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost/PMS-Backd/api/projects/view.php?id=${id}`);
      const data = await res.json();
      if (data.success) {
        setProject(data.project);
      } else {
        alert("Failed to load project: " + data.message);
      }
    } catch (err) {
      alert("Server error.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) return <div className="text-sm p-4">Loading project...</div>;
  if (!project) return <div className="text-sm p-4 text-red-600">Project not found.</div>;

  return (
    <div className='flex flex-col gap-6 pb-4 p-4'>
      <div className='font-bold text-3xl flex gap-2 items-center'>
        <AppWindow size={30} />
        {project.title}
      </div>

      <div className='text-sm text-gray-700'>{project.description}</div>

      <div className='mt-4 text-sm'>
        <div><b>Project Manager:</b> {project.manager_name}</div>
        <div><b>Start Date:</b> {project.start_date || 'N/A'}</div>
        <div><b>End Date:</b> {project.end_date || 'N/A'}</div>
      </div>
    </div>
  );
};

export default ManagerProjectViewPage;
