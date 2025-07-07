import React, { useState } from 'react';
import { useParams } from 'react-router';
import { AppWindow, CheckCircle, Hourglass, Loader2, Circle, Trash2 } from 'lucide-react';
import Button from '../../ui/PublicUI/Button';

const ManagerTaskViewPage = () => {
  const { id } = useParams(); // Get task ID from the URL

  // Local state to manage comments and input field
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      timestamp: '2025-06-10 10:30AM',
      author: 'K N P J Ananda',
      message: 'Initial task assigned. Starting development soon.',
    },
    {
      id: 2,
      timestamp: '2025-06-11 03:15PM',
      author: 'D G C Liyanage',
      message: 'Reviewed the task plan and approved.',
    },
  ]);

  // Add a new comment to the top of the list
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: comments.length + 1,
      timestamp: new Date().toLocaleString(),
      author: 'You',
      message: commentText,
    };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  // Remove a comment by its ID
  const handleRemoveComment = (id: number) => {
    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
  };

  // Render a styled badge based on task status
  const getStatusBadge = (status: string) => {
    const base = 'text-xs font-semibold rounded-full px-2 py-1 flex items-center gap-1';
    switch (status) {
      case 'TODO':
        return (
          <div className={`${base} bg-yellow-100 text-yellow-700`}>
            <Hourglass size={14} />
            To Do
          </div>
        );
      case 'In Progress':
        return (
          <div className={`${base} bg-blue-100 text-blue-700`}>
            <Loader2 size={14} className='animate-spin' />
            In Progress
          </div>
        );
      case 'Testing':
        return (
          <div className={`${base} bg-purple-100 text-purple-700`}>
            <Circle size={14} />
            Testing
          </div>
        );
      case 'Done':
        return (
          <div className={`${base} bg-green-100 text-green-700`}>
            <CheckCircle size={14} />
            Done
          </div>
        );
      default:
        return (
          <div className={`${base} bg-gray-100 text-gray-700`}>
            <Circle size={14} />
            Unknown
          </div>
        );
    }
  };

  return (
    <div className='flex flex-col gap-6 pb-4'>
      <div className='flex justify-between'>
        {/* Header with task title and actions */}
        <div>
          <div className='font-bold text-3xl flex gap-2 items-center'>
            <AppWindow size={30} />
            Task Name {id}
          </div>
          <div className='text text-xs text-gray-500'>Description Description Description</div>
        </div>
        {/* Task control buttons (placeholders) */}
        <div className='flex gap-3'>
          <Button>Edit Task</Button>
          <Button>Delete Task</Button>
        </div>
      </div>

      {/* Left: task details, Right: comment input */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col w-full border rounded-md'>
          <TupleCardRow data={{ title: 'Description', value: 'Project Management System' }} />
          <TupleCardRow data={{ title: 'Assigned Member', value: 'K N P J Ananda' }} />
          <TupleCardRow data={{ title: 'Task Deadline', value: '06-06-2025' }} />
          {/* Render status badge as component using `isComponent` flag */}
          <TupleCardRow data={{ title: 'Current Status', value: getStatusBadge('TODO') }} isComponent />
        </div>

        {/* Comment input area */}
        <div className='border rounded-md p-4 text-sm flex flex-col gap-2'>
          <h2 className='text-base font-semibold'>Leave a Comment</h2>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className='w-full border rounded-md p-2 text-sm resize-none'
            rows={4}
            placeholder='Write your comment here...'
          />
          <button
            onClick={handleAddComment}
            className='self-end px-4 py-1 text-xs font-semibold bg-gray-500 text-white rounded-md hover:bg-gray-600'
          >
            Submit Comment
          </button>
        </div>
      </div>

      {/* Render list of comments */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-base font-semibold'>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className='bg-green-200 p-2 rounded-md flex justify-between items-start gap-4'>
            <div className='flex-1'>
              <div className='flex flex-col'>
                <p className='text-xs font-bold'>{comment.timestamp}</p>
                <p className='text-xs'>By: {comment.author}</p>
              </div>
              <div className='text-sm mt-2'>{comment.message}</div>
            </div>
            {/* Delete button for comment */}
            <button
              onClick={() => handleRemoveComment(comment.id)}
              className='text-xs text-red-600 hover:text-red-800'
              title="Delete comment"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable component to show title-value pairs
// If value is a React component, `isComponent` flag allows rendering directly
const TupleCardRow = ({
  data,
  isComponent = false,
}: {
  data: { title: string; value: any };
  isComponent?: boolean;
}) => {
  return (
    <div className='w-full grid grid-cols-2 p-2 text-xs border-b'>
      <div className='font-bold border-r'>{data.title}</div>
      <div className='pl-1'>{isComponent ? data.value : <span>{data.value}</span>}</div>
    </div>
  );
};

export default ManagerTaskViewPage;
