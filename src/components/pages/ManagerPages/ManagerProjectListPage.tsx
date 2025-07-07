import { AppWindow, CheckCircle, Hourglass, Loader2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import NewProjectDialogPage from './NewProjectDialogPage';
import Button from '../../ui/PublicUI/Button';

const isProjectManager = true; // Conditional flag to allow project manager actions

const ManagerProjectListPage = () => {
  const newProjectDialog = useDisclosure(); // Controls visibility of the new project modal

  return (
    <div className='flex flex-col gap-6 pb-4'>
      <div className='flex justify-between'>
        <div>
          {/* Page header with icon and title */}
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <AppWindow size={30} />
            Projects
          </div>
          <div className='text-xs text-gray-500'>Create and manage your projects easily.</div>
        </div>

        {/* Show "New Project" button only if user is a project manager */}
        {isProjectManager && (
          <div className='flex gap-3'>
            <Button onClick={newProjectDialog.onOpen}>New Project</Button>
          </div>
        )}
      </div>

      {/* Render a sample list of projects; replace with real data in production */}
      <div className='flex flex-col gap-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <ListLine key={index} data={index + 1} />
        ))}
      </div>

      {/* Modal dialog for creating a new project */}
      <NewProjectDialogPage disclosure={newProjectDialog} />
    </div>
  );
};

const ListLine = ({ data }: any) => {
  const navigate = useNavigate();

  // Dynamically render badge based on task status
  const renderBadge = (status: string) => {
    let icon, className;

    switch (status) {
      case 'TODO':
        icon = <Hourglass size={12} />;
        className = 'bg-yellow-100 text-yellow-800';
        break;
      case 'In Progress':
        icon = <Loader2 size={12} className="animate-spin" />; // Spinner for loading state
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
        {status}: 10
      </div>
    );
  };

  return (
    // Clickable card that navigates to the project's detail page
    <div onClick={() => navigate(`/manager/projects/${data}`)} className='flex justify-between rounded-md bg-[#E8F5E9] p-2 cursor-pointer hover:shadow-md'>
      <div>
        <div className='font-bold text-xl'>Project Title {data}</div>
        <div className='text-[10px] text-gray-500'>Short description</div>
      </div>

      {/* Task status summary badges */}
      <div className='flex flex-wrap gap-2 items-center justify-end'>
        {['TODO', 'In Progress', 'Testing', 'Done'].map((status) => renderBadge(status))}
      </div>
    </div>
  );
};

export default ManagerProjectListPage;
