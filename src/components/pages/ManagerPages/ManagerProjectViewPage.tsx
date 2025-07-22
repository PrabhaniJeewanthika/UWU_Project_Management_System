// Enhanced ManagerProjectViewPage.tsx with re-fetch after update
import {
  AppWindow, CheckCircle, Hourglass, Loader2, Circle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import HomePageKanbanBoard from '../../ui/PublicUI/HomepageKanbanBoard';

const ManagerProjectViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editModal = useDisclosure();
  const cancelRef = React.useRef(null);

  const [project, setProject] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [statusSummary, setStatusSummary] = useState<any>({});

  const { register, handleSubmit, setValue } = useForm();

  const fetchProject = async () => {
    const res = await fetch(`http://localhost/PMS-Backd/api/projects/view.php?id=${id}`);
    const data = await res.json();
    if (data.success) {
      setProject(data.project);
      setMembers(data.members);
      setStatusSummary(data.status_summary);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch('http://localhost/PMS-Backd/api/projects/delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    const data = await res.json();
    if (data.success) {
      alert('Project deleted.');
      navigate('/manager/projects');
    } else {
      alert('Delete failed.');
    }
  };

  const openEditForm = () => {
    if (!project) return;
    setValue('title', project.title);
    setValue('description', project.description);
    setValue('start_date', project.start_date);
    setValue('end_date', project.end_date);
    editModal.onOpen();
  };

  const onSubmit = async (data: any) => {
    const res = await fetch('http://localhost/PMS-Backd/api/projects/update.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data })
    });

    const result = await res.json();
    if (result.success) {
      alert('Project updated.');
      editModal.onClose();
      fetchProject(); // Re-fetch updated data
    } else {
      alert('Update failed.');
    }
  };

  const renderBadge = (status: string, count: number) => {
    let icon, className;
    switch (status) {
      case 'TODO': icon = <Hourglass size={12} />; className = 'bg-yellow-100 text-yellow-800'; break;
      case 'In Progress': icon = <Loader2 size={12} className='animate-spin' />; className = 'bg-blue-100 text-blue-800'; break;
      case 'Testing': icon = <Circle size={12} />; className = 'bg-purple-100 text-purple-800'; break;
      case 'Done': icon = <CheckCircle size={12} />; className = 'bg-green-100 text-green-800'; break;
      default: icon = <Circle size={12} />; className = 'bg-gray-100 text-gray-800';
    }
    return <div key={status} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${className}`}>{icon}{status}: {count}</div>;
  };

  if (!project) return <div className="text-sm p-4">Loading project...</div>;

  return (
    <div className='flex flex-col gap-6 pb-4'>
      <div className='flex justify-between'>
        <div>
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <AppWindow size={30} /> {project.title}
          </div>
          <div className='text-xs text-gray-500'>{project.description}</div>
        </div>

        <div className='flex gap-3'>
          <Button colorScheme='teal'>Create Task</Button>
          <Button colorScheme='teal'>Add Member</Button>
          <Button colorScheme='blue' onClick={openEditForm}>Edit</Button>
          <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col w-full border rounded-md'>
          <TupleCardRow data={{ title: "Description", value: project.description }} />
          <TupleCardRow data={{ title: "Project Manager", value: project.manager_name }} />
          <TupleCardRow data={{ title: "Start Date", value: project.start_date }} />
          <TupleCardRow data={{ title: "End Date", value: project.end_date }} />
        </div>
        <div className='flex flex-wrap gap-2 border rounded-md p-2'>
          {Object.entries(statusSummary).map(([k, v]) => renderBadge(k, v as number))}
        </div>
      </div>

      <MemberDetails members={members} />
      <HomePageKanbanBoard />

      {/* Edit Dialog */}
      <Dialog.Root open={editModal.open} onOpenChange={editModal.onClose}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Edit Project</Dialog.Header>
              <Dialog.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack className="space-y-4">
                    <Field.Root>
                      <Field.Label>Title</Field.Label>
                      <Input {...register('title', { required: true })} className="border" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Description</Field.Label>
                      <Textarea {...register('description')} className="border" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Start Date</Field.Label>
                      <Input type='date' {...register('start_date')} className="border" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>End Date</Field.Label>
                      <Input type='date' {...register('end_date')} className="border" />
                    </Field.Root>
                  </Stack>
                  <Dialog.Footer className='mt-4'>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button type="submit" colorScheme='blue'>Update</Button>
                  </Dialog.Footer>
                </form>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
};

const TupleCardRow = ({ data }: any) => (
  <div className='w-full grid grid-cols-2 p-2 text-xs border-b'>
    <div className='font-bold border-r'>{data.title}</div>
    <div className='pl-1'>{data.value}</div>
  </div>
);

const MemberDetails = ({ members }: { members: any[] }) => (
  <div className='flex flex-col border rounded-md'>
    <div className='grid grid-cols-3 font-bold p-1 border-b'>
      <div className='border-r pl-1'>Enrollment Number</div>
      <div className='border-r pl-2'>Name</div>
      <div className='pl-2'>Email</div>
    </div>
    {members.map((m, i) => (
      <div key={i} className='grid grid-cols-3 text-xs p-1 border-b'>
        <div className='border-r pl-1'>{m.enrollment_no}</div>
        <div className='border-r pl-2'>{m.name}</div>
        <div className='pl-2'>{m.email}</div>
      </div>
    ))}
  </div>
);

export default ManagerProjectViewPage;
