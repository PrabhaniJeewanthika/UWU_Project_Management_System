import { LayoutList } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../../ui/PublicUI/Button';


const TaskListPage = () => {
  return (
    <div className='flex flex-col gap-6 pb-4'>
      <div className='flex justify-between'>
        <div>
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <LayoutList size={30} />
            Tasks
          </div>
          <div className='text-xs text-gray-500'>
            View and manage all project tasks.
          </div>
        </div>
        <div className='flex gap-3'>
          <Button onClick={() => {}}>New Task</Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        {Array.from({ length: 15 }).map((_, index) => (
          <ListLine key={index} data={index + 1} />
        ))}
      </div>
    </div>
  );
};

const ListLine = ({ data }: any) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/manager/tasks/${data}`);
  };

  return (
    <div
      onClick={onClick}
      className='flex justify-between rounded-md bg-[#E8F5E9] p-2 cursor-pointer hover:bg-[#d0ebd8]'
    >
      <div>
        <div className='font-bold text-xl'>Task Name {data}</div>
        <div className='text-[10px] text-gray-600'>Task description</div>
      </div>
      <div className='flex items-start gap-3'>
        <div className='flex items-center gap-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-md'>
          <span className='w-2 h-2 rounded-full bg-yellow-500'></span>
          TODO
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
