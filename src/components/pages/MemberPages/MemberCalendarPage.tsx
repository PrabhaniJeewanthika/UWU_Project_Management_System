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

const MemberCalendarPage: React.FC = () => {
  const [events] = useState<EventType[]>([
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

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
  };

  const eventsOnDate = events.filter((e) => e.date === selectedDate);

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
                {event.time && <p className='text-xs text-gray-700'>🕒 {dayjs(`${event.date}T${event.time}`).format('hh:mm A')}</p>}
                {event.description && <p className='text-xs'>{event.description}</p>}
                {event.link && (
                  <a href={event.link} target='_blank' rel='noopener noreferrer' className='text-cyan-600 text-xs hover:underline'>
                    Join Meeting
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCalendarPage;