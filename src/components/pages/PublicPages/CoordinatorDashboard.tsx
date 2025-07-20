import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';

import CalendarArea from '../../ui/PublicUI/CalendarArea';
import SupervisorCard from '../../ui/PublicUI/SupervisorCard';
import CoordinatorCalendarPage from './CoordinatorCalendarPage';
import NewNoticeSection from '../ui/NewNoticeSection';

const CoordinatorDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Welcome, Coordinator!</h1>
          <p className="text-sm text-gray-600">Monitor, manage, and schedule across UWU project teams.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:max-w-3xl">
          <CountView title="Total Projects" count={50} className="bg-blue-800" />
          <CountView title="Total Tasks" count={200} className="bg-green-700" />
          <CountView title="Total Supervisors" count={10} className="bg-purple-700" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>


          </div>
          <div>
         
          </div>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div>
            
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

const CountView = ({ className, title, count }: { className: string; title: string; count: number }) => {
  return (
    <div className={clsx('rounded-lg p-4 text-white shadow-md', className)}>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="font-bold text-3xl">{count}</div>
      </div>
    </div>
  );
};

export default CoordinatorDashboardPage;