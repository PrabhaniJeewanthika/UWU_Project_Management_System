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

const CoordinatorCalendarPage: React.FC = () => {
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

    return (
        <div className='flex flex-col gap-6 pb-4'>
            <div className='flex flex-col'>
                <div className='font-bold text-3xl flex gap-2 items-center'>
                    <CalendarDays size={30} />
                    Calendar
                </div>
                <div className='text-xs text-gray-600'>View meetings and schedule new events</div>
            </div>

            <div className='flex border rounded-md overflow-hidden'>
                <div className='w-2/3 p-4 bg-white'>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        events={events.map((e) => ({
                            id: e.id,
                            title: e.title,
                            date: e.date,
                        }))}
                        eventContent={(arg) => (
                            <div className="flex items-center text-xs">
                                <span>{arg.event.title}</span>
                            </div>
                        )}
                        dayMaxEvents={3}
                        headerToolbar={{
                            left: 'today prev,next',
                            center: 'title',
                            right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
                        }}
                        buttonText={{
                            today: 'Today',
                            next: 'Next',
                            prev: 'Back',
                            month: 'Month',
                            week: 'Week',
                            day: 'Day',
                            list: 'Agenda',
                        }}
                        dayHeaderContent={(arg) => (
                            <span className="font-bold text-gray-800">{arg.text}</span>
                        )}
                    />
                </div>

                <div className='w-1/3 p-4 border-l bg-gray-50'>
                    <h2 className='text-xl font-bold mb-2'>Events - {selectedDate || ''}</h2>

                    {eventsOnDate.length > 0 ? (
                        eventsOnDate.map((event) => (
                            <div key={event.id} className='p-2 mb-2 border rounded-md shadow-sm bg-white text-sm'>
                                <h3 className='font-semibold'>{event.title}</h3>
                                {event.time && (
                                    <p className='text-xs text-gray-700'>
                                        🕒 {dayjs(`${event.date}T${event.time}`).format('hh:mm A')}
                                    </p>
                                )}
                                {event.description && <p className='text-xs'>{event.description}</p>}
                                {event.link && (
                                    <a
                                        href={event.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-cyan-600 text-xs hover:underline'
                                    >
                                        Join Meeting
                                    </a>
                                )}
                                <div className='mt-2 flex gap-2 items-center'>
                                    <button onClick={() => handleEdit(event)} className='text-[10px] text-yellow-600'>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(event.id)} className='text-[10px] text-red-500'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-sm text-gray-500'>No events for this date.</p>
                    )}

                    <div className='border-t mt-4 pt-4'>
                        <h3 className='font-semibold mb-2'>Schedule New Event</h3>
                        <input
                            type='text'
                            placeholder='Title'
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            className='w-full mb-2 border px-2 py-1 rounded'
                        />
                        <input
                            type='date'
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            className='w-full mb-2 border px-2 py-1 rounded'
                        />
                        <input
                            type='time'
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                            className='w-full mb-2 border px-2 py-1 rounded'
                        />
                        <input
                            type='text'
                            placeholder='Meeting Link'
                            value={newEvent.link}
                            onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
                            className='w-full mb-2 border px-2 py-1 rounded'
                        />
                        <textarea
                            placeholder='Description'
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            className='w-full mb-2 border px-2 py-1 rounded'
                        />
                        <button
                            onClick={handleAddEvent}
                            className='bg-cyan-500 text-white px-4 py-1 rounded text-sm hover:bg-cyan-600'
                        >
                            {newEvent.id ? 'Update Event' : 'Add Event'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoordinatorCalendarPage;