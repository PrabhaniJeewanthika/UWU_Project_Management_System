import React, { useState } from 'react';
import { Bell, EyeOff, CheckCircle, Pencil, Trash2, Plus, X } from 'lucide-react';

type Notice = {
  id: number;
  title: string;
  content: string;
  timeAgo: string;
  isNew: boolean;
};

const initialNotices: Notice[] = [
  {
    id: 1,
    title: 'Test Notice',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quos, consequuntur sequi vel...',
    timeAgo: '1 week ago',
    isNew: true,
  },
  {
    id: 2,
    title: 'Deadline Reminder',
    content: 'Your project deadline is in 2 days. Please update your progress status.',
    timeAgo: '3 days ago',
    isNew: true,
  },
  {
    id: 3,
    title: 'Meeting Scheduled',
    content: 'A team meeting is scheduled for Friday at 10AM via Zoom.',
    timeAgo: '2 days ago',
    isNew: false,
  },
];

const CoordinatorNoticePage = () => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState<null | number>(null);
  const [form, setForm] = useState({ title: '', content: '' });

  const openNew = () => {
    setEditMode(null);
    setForm({ title: '', content: '' });
    setShowModal(true);
  };

  const openEdit = (notice: Notice) => {
    setEditMode(notice.id);
    setForm({ title: notice.title, content: notice.content });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) return;

    if (editMode) {
      setNotices((prev) =>
        prev.map((n) =>
          n.id === editMode ? { ...n, title: form.title, content: form.content } : n
        )
      );
    } else {
      const id = Date.now();
      setNotices([
        {
          id,
          title: form.title,
          content: form.content,
          timeAgo: 'Just now',
          isNew: true,
        },
        ...notices,
      ]);
    }

    setForm({ title: '', content: '' });
    setShowModal(false);
    setEditMode(null);
  };

  const handleDelete = (id: number) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isNew: false } : n))
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-4 px-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-3xl flex gap-2 items-center">
            <Bell size={30} /> Notices
          </div>
          <div className="text-xs text-gray-500">
            Stay updated with the latest announcements and reminders
          </div>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
        >
          <Plus size={16} /> New Notice
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {notices.map((note) => (
          <NoticeCard
            key={note.id}
            data={note}
            onMark={() => markAsRead(note.id)}
            onEdit={() => openEdit(note)}
            onDelete={() => handleDelete(note.id)}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-black">
              {editMode ? 'Edit Notice' : 'New Notice'}
            </h2>
            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              className="border p-2 w-full h-28 rounded"
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded"
              >
                {editMode ? 'Update' : 'Publish'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="border border-black px-4 py-2 rounded text-black hover:bg-black hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NoticeCard = ({
  data,
  onMark,
  onEdit,
  onDelete,
}: {
  data: Notice;
  onMark: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 p-4 rounded-md shadow-sm transition-all duration-200 relative">
      <div className="absolute top-2 right-4 flex items-center text-xs text-gray-500 gap-1">
        <EyeOff size={16} strokeWidth={1.5} />
        <span>{data.timeAgo}</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-gray-800 text-base">{data.title}</p>
          {data.isNew && (
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full font-medium">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-gray-700">{data.content}</p>

        {data.isNew && (
          <div
            onClick={onMark}
            className="flex items-center text-xs text-black gap-1 mt-1 cursor-pointer w-max hover:underline"
          >
            <CheckCircle size={14} />
            Mark as read
          </div>
        )}

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onEdit} title="Edit">
            <Pencil size={16} className="text-black hover:text-blue-600" />
          </button>
          <button onClick={onDelete} title="Delete">
            <Trash2 size={16} className="text-black hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorNoticePage;