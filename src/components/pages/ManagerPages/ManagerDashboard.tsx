import {
  NativeSelect
} from "@chakra-ui/react";
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import HomePageKanbanBoard from "../../ui/PublicUI/HomepageKanbanBoard";

// Main dashboard component for the Manager
const ManagerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/start');
      return;
    }

    fetch('http://localhost/PMS-Backd/api/auth/validate_token.php', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          localStorage.clear();
          navigate('/start');
        } else {
          console.log("Authenticated manager:", data.data);
          // Optionally store in state for display
        }
      });
  }, [navigate]);

  return (
    <div className='flex flex-col gap-6 px-4 py-6'>
      {/* Header section: Project selector + summary cards */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="min-w-[240px]">
          <ProjectSelector /> {/* Dropdown to select a project */}
        </div>

        {/* Stats overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <CountView title="Total Projects" count={100} className="bg-red-800" />
          <CountView title="Total Tasks" count={100} className="bg-green-800" />
          <CountView title="Total Members" count={100} />
        </div>
      </div>

      {/* Main content layout with Kanban board and sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
        {/* Kanban board takes majority of the width */}
        <div className="lg:col-span-7 xl:col-span-8">
          <HomePageKanbanBoard />
        </div>

        {/* Sidebar section for additional widgets or tools */}
        <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
          {/* Future enhancements like notifications, reports etc. can go here */}
        </div>
      </div>
    </div>
  );
};

// Reusable component to display summary metrics (e.g., Projects, Tasks, Members)
const CountView = ({ className, title, count }: any) => {
  return (
    <div className={clsx('rounded-lg p-4 bg-cyan-800 text-white shadow', className)}>
      <div className='text-sm font-medium'>{title}</div>
      <div className='font-bold text-3xl'>{count}</div>
    </div>
  );
};

// Dropdown component to select between different projects
const ProjectSelector = () => {
  const items = [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Laravel", value: "laravel" },
    { label: "Spring Boot", value: "spring" },
  ];

  return (
    <NativeSelect.Root size={'xl'} width="100%" className="border rounded-md">
      <NativeSelect.Field placeholder="Select Project" className="pl-2">
        {items.map((line, idx) => (
          <option key={idx} value={line.value}>{line.label}</option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};

export default ManagerDashboard;
