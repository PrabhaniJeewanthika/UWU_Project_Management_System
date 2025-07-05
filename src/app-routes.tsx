import React from 'react';
import { useRoutes } from 'react-router';


import ManagerLayout from './components/layouts/ManagerLayout';
import ManagerDashboard from './components/pages/ManagerPages/ManagerDashboard';
import ProtectedRoutes from './ProtectedRoute';
import ProtectedRoute from './ProtectedRoute';
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
            { path: 'projects', element:"" },
            { path: 'projects/:id', element: "" },
            { path: 'tasks', element: "" },
            { path: 'tasks/:id', element: ""},
            { path: 'reports', element: "" },
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