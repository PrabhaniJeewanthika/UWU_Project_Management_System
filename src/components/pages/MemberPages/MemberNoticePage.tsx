import React, { useState } from 'react';
import { Bell, EyeOff, CheckCircle } from 'lucide-react';
import { useDisclosure } from '@chakra-ui/react';


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
        isNew: true
    },
    {
        id: 2,
        title: 'Deadline Reminder',
        content: 'Your project deadline is in 2 days. Please update your progress status.',
        timeAgo: '3 days ago',
        isNew: true
    },
    {
        id: 3,
        title: 'Meeting Scheduled',
        content: 'A team meeting is scheduled for Friday at 10AM via Zoom.',
        timeAgo: '2 days ago',
        isNew: false
    }
];

const MemberNoticePage = () => {
    const noticeModal = useDisclosure();
    const [notices, setNotices] = useState<Notice[]>(initialNotices);

    const markAsRead = (id: number) => {
        setNotices((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, isNew: false } : n
            )
        );
    };

    return (
        <div className='flex flex-col gap-6 pb-4'>
            <div className='flex justify-between'>
                <div>
                    <div className='font-bold text-3xl flex gap-2 items-center'>
                        <Bell size={30} />
                        Notices
                    </div>
                    <div className='text text-xs'>Stay updated with the latest announcements and reminders</div>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {notices.map((note) => (
                    <NoticeCard key={note.id} data={note} onMark={() => markAsRead(note.id)} />
                ))}
            </div>
        </div>
    );
};

const NoticeCard = ({ data, onMark }: { data: Notice; onMark: () => void }) => {
    return (
        <div className='bg-gray-100 hover:bg-gray-200 p-4 rounded-md shadow-sm transition-all duration-200 relative'>
            <div className='absolute top-2 right-4 flex items-center text-xs text-gray-500 gap-1'>
                <EyeOff size={16} strokeWidth={1.5} />
                <span>{data.timeAgo}</span>
            </div>
            <div className='flex items-center gap-2'>
                <p className='font-bold text-gray-800 text-base'>{data.title}</p>
                {data.isNew && (
                    <span className='bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium'>
                        New
                    </span>
                )}
            </div>
            <p className='text-xs text-gray-700 mt-1'>{data.content}</p>
            {data.isNew && (
                <div
                    onClick={onMark}
                    className='flex items-center justify-end text-xs text-gray-900 hover mt-2 cursor-pointer gap-1'
                >
                    <CheckCircle size={14} />
                    Mark as read
                </div>
            )}
        </div>
    );
};

export default MemberNoticePage;