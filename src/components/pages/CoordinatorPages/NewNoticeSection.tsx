import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

type Notice = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

const NewNoticeSection = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });

  const handlePublish = () => {
    if (!form.title || !form.content) return;

    const newNotice: Notice = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      createdAt: new Date(),
    };

    setNotices([newNotice, ...notices]);
    setForm({ title: '', content: '' });
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        onClick={() => setShowModal(true)}
        className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 text-sm w-fit hover:bg-gray-800"
      >
        <Plus size={16} /> New Notice
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-black">New Notice</h2>
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
                onClick={handlePublish}
                className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded"
              >
                Publish
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

export default NewNoticeSection;
