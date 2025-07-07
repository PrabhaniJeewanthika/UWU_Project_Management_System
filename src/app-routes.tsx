import React from 'react';
import { useRoutes } from 'react-router';
import ManagerLayout from './components/layouts/ManagerLayout';
import ManagerDashboard from './components/pages/ManagerPages/ManagerDashboard';
import ProtectedRoute from './ProtectedRoute';
import ManagerProjectListPage from './components/pages/ManagerPages/ManagerProjectListPage';
import ManagerProjectViewPage from './components/pages/ManagerPages/ManagerProjectViewPage';
import ManagerTaskListPage from './components/pages/ManagerPages/ManagerTaskListPage';
import ManagerTaskViewPage from './components/pages/ManagerPages/ManagerTaskViewPage';
const RouteConfigs = () => {
    const element = useRoutes([
       {
      path: '/manager',
      element: <ProtectedRoute allowedRole="manager" />,
      children: [
        {
          path: '',
          element: <ManagerLayout />,
          children: [
            { index: true, element: <ManagerDashboard /> },
            { path: 'projects', element: <ManagerProjectListPage /> },
            { path: 'projects/:id', element: <ManagerProjectViewPage /> },
            { path: 'tasks', element: <ManagerTaskListPage /> },
            { path: 'tasks/:id', element: <ManagerTaskViewPage /> },
            { path: 'reports', element: ""  },
            { path: 'notices', element: "" },
            { path: 'calendar', element:"" },
            { path: 'profile', element: "" },
          ],
        },
      ],
    }
    ])
    return element
};

export default RouteConfigs;