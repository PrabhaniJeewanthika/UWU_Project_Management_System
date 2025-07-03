import React from 'react';
import { useRoutes } from 'react-router';
import InternalLayout from './components/layouts/InternalLayout';
import HomepageDashboard from './components/pages/MemberDashboard';
import MemberDashboard from './components/pages/MemberDashboard';
import CalendarArea from './components/ui/CalendarArea';
const RouteConfigs = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <InternalLayout />,
            children: [
                {
                    element: <MemberDashboard />,
                    index: true
                },
                {
                    path:"/calendarview",
                    element: <CalendarArea />
                }
            ]
        }
    ])
    return element
};

export default RouteConfigs;