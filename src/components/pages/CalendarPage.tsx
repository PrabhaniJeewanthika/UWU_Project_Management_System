import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';

type EventType = {
    id: string;
    title: string;
    date: string;
    time?: string;
    description?: string;
    link?: string;
};

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([
        {
            id: '1',
            title: 'Zoom Project Meeting',
            date: '2025-06-02',
            time: '10:00',
            description: 'Discuss Sprint 4',
            link: 'https://zoom.us/my/project-meeting',
        },
        {
            id: '2',
            title: 'Task Deadline: UI Components',
            date: '2025-06-03',
            time: '23:59',
        },
        {
            id: '3',
            title: 'Client Review Call',
            date: '2025-06-03',
            time: '15:00',
            link: 'https://meet.google.com/xyz-client-review',
        },
        {
            id: '4',
            title: 'Daily Standup',
            date: '2025-06-03',
            time: '09:00',
        },
        {
            id: '5',
            title: 'Design Review',
            date: '2025-06-03',
            time: '14:00',
        },
        {
            id: '6',
            title: 'Team Lunch',
            date: '2025-06-03',
            time: '12:00',
        },
    ]);

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [newEvent, setNewEvent] = useState<EventType>({
        id: '',
        title: '',
        date: '',
        time: '',
        description: '',
        link: '',
    });

    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr);
    };

    const eventsOnDate = events.filter((e) => e.date === selectedDate);

    const handleAddEvent = () => {
        if (newEvent.id) {
            setEvents((prev) => [
                ...prev.filter((e) => e.id !== newEvent.id),
                { ...newEvent }
            ]);
        } else {
            const id = Date.now().toString();
            setEvents((prev) => [...prev, { ...newEvent, id }]);
        }

        setNewEvent({ id: '', title: '', date: '', time: '', description: '', link: '' });
    };

    const handleDelete = (id: string) => {
        setEvents(events.filter((e) => e.id !== id));
    };

    const handleEdit = (event: EventType) => {
        setNewEvent(event);
    };