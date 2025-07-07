import { AppWindow, CheckCircle, Hourglass, Loader2, Circle } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router';
import Button from '../../ui/PublicUI/Button';
import HomePageKanbanBoard from '../../ui/PublicUI/HomepageKanbanBoard';

const ManagerProjectViewPage = () => {
  const { id } = useParams(); // Get project ID from URL parameters

  // Render a status badge with corresponding icon and style
  const renderBadge = (status: string, count: number) => {
    let icon, className;

    switch (status) {
      case 'TODO':
        icon = <Hourglass size={12} />;
        className = 'bg-yellow-100 text-yellow-800';
        break;
      case 'In Progress':
        icon = <Loader2 size={12} className='animate-spin' />; // Animated icon for active status
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

  return (
    <div className='flex flex-col gap-6 pb-4'>
      <div className='flex justify-between'>
        <div>
          {/* Page title with dynamic project ID */}
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <AppWindow size={30} />
            Project {id}
          </div>
          <div className='text text-xs'>Description Description Description</div>
        </div>

        {/* Action buttons for project management */}
        <div className='flex gap-3'>
          <Button>Create Task</Button>
          <Button>Add Member</Button>
          <Button>Edit Project Details</Button>
          <Button>Delete Project</Button>
        </div>
      </div>

      {/* Basic project details layout */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col w-full border rounded-md'>
          <TupleCardRow data={{ title: "Description", value: "Project Management System" }} />
          <TupleCardRow data={{ title: "Project Manager", value: "K N P J Ananda" }} />
          <TupleCardRow data={{ title: "Start Date", value: "06-06-2025" }} />
          <TupleCardRow data={{ title: "End Date", value: "07-10-2025" }} />
        </div>

        {/* Reserved section for future widgets (e.g. progress, charts) */}
        <div className=''>
          
        </div>
      </div>

      {/* Member list table */}
      <MemberDetails />

      {/* Task Kanban board section */}
      <HomePageKanbanBoard />
    </div>
  );
};

// Component to display title-value pairs in a bordered row
const TupleCardRow = ({ data }: any) => (
  <div className='w-full grid grid-cols-2 p-2 text-xs border-b'>
    <div className='font-bold border-r'>{data.title}</div>
    <div className='pl-1'>{data.value}</div>
  </div>
);

// Member details table with static sample data
const MemberDetails = () => (
  <div className='flex flex-col border rounded-md'>
    <div className='grid grid-cols-3 font-bold p-1 border-b'>
      <div className='border-r pl-1'>Enrollment Number</div>
      <div className='border-r pl-2'>Name</div>
      <div className='pl-2'>Email</div>
    </div>
    {[...Array(3)].map((_, i) => (
      <div key={i} className='grid grid-cols-3 text-xs p-1 border-b'>
        <div className='border-r pl-1'>UWU/IIT/22/0{49 + i}</div>
        <div className='border-r pl-2'>K N P J Ananda</div>
        <div className='pl-2'>iit22{49 + i}@std.uwu.ac.lk</div>
      </div>
    ))}
  </div>
);

export default ManagerProjectViewPage;
