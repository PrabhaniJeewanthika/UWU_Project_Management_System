import React from 'react';
import { FolderKanban, CheckCircle, Hourglass, Loader2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MemberProjectListPage: React.FC = () => {
  const navigate = useNavigate();

  const assignedProjects = [
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Revamp UI/UX and frontend components.',
      statusCounts: {
        TODO: 2,
        'In Progress': 3,
        Testing: 1,
        Done: 4,
      },
    },
    {
      id: 2,
      title: 'Mobile App Prototype',
      description: 'Develop Android prototype for feedback.',
      statusCounts: {
        TODO: 1,
        'In Progress': 2,
        Testing: 0,
        Done: 6,
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-3xl flex items-center gap-2">
            <FolderKanban size={30} />
            My Projects
          </div>
          <div className="text-xs text-gray-500">Projects assigned to you</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {assignedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

type ProjectCardProps = {
  project: {
    id: number;
    title: string;
    description: string;
    statusCounts: Record<string, number>;
  };
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const renderBadge = (status: string, count: number) => {
    let icon, className;
    switch (status) {
      case 'TODO':
        icon = <Hourglass size={12} />;
        className = 'bg-yellow-100 text-yellow-800';
        break;
      case 'In Progress':
        icon = <Loader2 size={12} className="animate-spin" />;
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
    <div
      onClick={() => navigate(`/member/member-projects/${project.id}`, { state: project })}
      className="flex justify-between items-start rounded-md bg-[#E8F5E9] p-3 cursor-pointer hover:shadow-md transition"
    >
      <div>
        <div className="font-bold text-lg">{project.title}</div>
        <div className="text-[11px] text-gray-600">{project.description}</div>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-end">
        {Object.entries(project.statusCounts).map(([status, count]) => renderBadge(status, count))}
      </div>
    </div>
  );
};

export default MemberProjectListPage;