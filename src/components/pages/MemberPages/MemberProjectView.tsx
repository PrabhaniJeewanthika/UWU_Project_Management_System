import React from 'react';
import { AppWindow, CheckCircle, Hourglass, Loader2, Circle } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import HomePageKanbanBoard from '../../ui/MemberUI/HomePageKanbanBoard';

const MemberProjectViewPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const project = location.state as {
    id: number;
    title: string;
    description: string;
    statusCounts: Record<string, number>;
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center font-bold text-3xl">
          <AppWindow size={30} />
          {project?.title || `Project ${id}`}
        </div>
        <div className="text-xs text-gray-500">{project?.description}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col border rounded-md">
          <TupleRow data={{ title: 'Description', value: project?.description }} />
          <TupleRow data={{ title: 'Project Manager', value: 'K N P J Ananda' }} />
          <TupleRow data={{ title: 'Start Date', value: '06-06-2025' }} />
          <TupleRow data={{ title: 'End Date', value: '07-10-2025' }} />
        </div>
        <div className="flex flex-col border rounded-md p-3">
          <h2 className="text-sm font-semibold mb-2">Task Summary</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(project.statusCounts).map(([status, count]) => (
              <StatusBadge key={status} status={status} count={count} />
            ))}
          </div>
        </div>
      </div>

      <MemberDetails />
      <HomePageKanbanBoard />
    </div>
  );
};

const TupleRow = ({ data }: { data: { title: string; value: any } }) => (
  <div className="w-full grid grid-cols-2 p-2 text-xs border-b items-center">
    <div className="font-bold border-r">{data.title}</div>
    <div className="pl-2">{data.value}</div>
  </div>
);

const StatusBadge = ({ status, count }: { status: string; count: number }) => {
  let icon, className;
  switch (status) {
    case 'TODO':
      icon = <Hourglass size={14} />;
      className = 'bg-yellow-100 text-yellow-800';
      break;
    case 'In Progress':
      icon = <Loader2 size={14} className="animate-spin" />;
      className = 'bg-blue-100 text-blue-800';
      break;
    case 'Testing':
      icon = <Circle size={14} />;
      className = 'bg-purple-100 text-purple-800';
      break;
    case 'Done':
      icon = <CheckCircle size={14} />;
      className = 'bg-green-100 text-green-800';
      break;
    default:
      icon = <Circle size={14} />;
      className = 'bg-gray-100 text-gray-800';
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${className} text-xs font-medium`}>
      {icon}
      {status}: {count}
    </div>
  );
};

const MemberDetails = () => (
  <div className="flex flex-col border rounded-md">
    <div className="grid grid-cols-3 font-bold p-1 border-b">
      <div className="border-r pl-1">Enrollment Number</div>
      <div className="border-r pl-2">Name</div>
      <div className="pl-2">Email</div>
    </div>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="grid grid-cols-3 text-xs p-1 border-b">
        <div className="border-r pl-1">UWU/IIT/22/0{49 + i}</div>
        <div className="border-r pl-2">K N P J Ananda</div>
        <div className="pl-2">iit22{49 + i}@std.uwu.ac.lk</div>
      </div>
    ))}
  </div>
);

export default MemberProjectViewPage;