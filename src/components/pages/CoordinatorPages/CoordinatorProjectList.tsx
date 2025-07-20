import React, { useState } from 'react';
import { AppWindow, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, title: 'Student Attendance System' },
  { id: 2, title: 'Inventory Tracker' },
  { id: 3, title: 'E-Learning Platform' },
  { id: 4, title: 'Online Library Management' },
  { id: 5, title: 'Campus Event Planner' },
];

const allSupervisors = [
  { id: 1, name: 'Dr. N. Samarasinghe', email: 'n@uwu.ac.lk', position: 'Supervisor' },
  { id: 2, name: 'Ms. A. Pathirana', email: 'a@uwu.ac.lk', position: 'Co-Supervisor' },
  { id: 3, name: 'Mr. D. Perera', email: 'd@uwu.ac.lk', position: 'Supervisor' },
];

const ProjectListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<number | null>(null);
  const [selectedCoSupervisorId, setSelectedCoSupervisorId] = useState<number | null>(null);

  const handleOpenModal = (projectId: number) => {
    setSelectedProjectId(projectId);
    const currentAssignment = assignments.find((a) => a.projectId === projectId);
    setSelectedSupervisorId(currentAssignment?.supervisorId || null);
    setSelectedCoSupervisorId(currentAssignment?.coSupervisorId || null);
    setShowModal(true);
  };

  const handleAssign = () => {
    if (!selectedProjectId || !selectedSupervisorId) return;

    const project = projects.find((p) => p.id === selectedProjectId);
    const supervisor = allSupervisors.find((s) => s.id === selectedSupervisorId);
    const coSupervisor = allSupervisors.find((s) => s.id === selectedCoSupervisorId);

    const updated = assignments.filter((a) => a.projectId !== selectedProjectId);
    updated.push({
      projectId: selectedProjectId,
      supervisorId: supervisor?.id,
      supervisorName: supervisor?.name,
      email: supervisor?.email,
      position: supervisor?.position,
      coSupervisorId: coSupervisor?.id || null,
      coSupervisorName: coSupervisor?.name || '',
      coSupervisorEmail: coSupervisor?.email || '',
    });

    setAssignments(updated);
    setShowModal(false);
  };

  return (
    <div className='flex flex-col gap-6 pb-4 px-4'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <AppWindow size={30} />
            Projects
          </div>
          <div className='text-xs text-gray-500'>Assign supervisors to available student projects.</div>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        {projects.map((project) => {
          const assigned = assignments.find((s) => s.projectId === project.id);
          return (
            <div key={project.id} className='rounded-md bg-[#E8F5E9] p-4 shadow-sm hover:shadow-md transition'>
              <div className='flex justify-between items-center'>
                <div>
                  <div className='font-bold text-lg'>{project.title}</div>
                  <div className='text-xs text-gray-500'>Click below to assign a supervisor</div>
                </div>
                <button
                  onClick={() => handleOpenModal(project.id)}
                  className="bg-green-800 text-white px-4 py-1 rounded-md text-sm hover:bg-green-900"
                >
                  Assign Supervisor
                </button>
              </div>
              {assigned && (
                <div className="mt-3 text-sm text-gray-700 bg-white rounded p-3 shadow-inner">
                  <div><strong>Supervisor:</strong> {assigned.supervisorName} ({assigned.email})</div>
                  {assigned.coSupervisorName && (
                    <div><strong>Co-Supervisor:</strong> {assigned.coSupervisorName} ({assigned.coSupervisorEmail})</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold mb-4 text-black">Assign Supervisor</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                className="border p-2 rounded col-span-full"
                value={selectedSupervisorId || ''}
                onChange={(e) => setSelectedSupervisorId(Number(e.target.value))}
              >
                <option value="">Select Supervisor</option>
                {allSupervisors.filter(s => s.position === 'Supervisor').map((sup) => (
                  <option key={sup.id} value={sup.id}>{sup.name}</option>
                ))}
              </select>

              <select
                className="border p-2 rounded col-span-full"
                value={selectedCoSupervisorId || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCoSupervisorId(value ? Number(value) : null);
                }}
              >
                <option value="">Select Co-Supervisor (optional)</option>
                {allSupervisors.filter(s => s.position === 'Co-Supervisor').map((sup) => (
                  <option key={sup.id} value={sup.id}>{sup.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={handleAssign} className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded text-sm">
                Save
              </button>
              <button onClick={() => setShowModal(false)} className="border border-green-800 text-green-800 px-4 py-2 rounded text-sm hover:bg-green-800 hover:text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectListPage;