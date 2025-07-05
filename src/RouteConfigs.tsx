import React from 'react';
import { useRoutes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoute';
import ManagerDashboard from './components/pages/ManagerPages/ManagerDashboard';
import ManagerLayout from './components/layouts/ManagerLayout';


const RouteConfigs = () => {
  const routes = useRoutes([

    {
      path: '/manager',
      element: <ProtectedRoutes allowedRole="manager" />,
      children: [
        {
          path: '',
          element: <ManagerLayout />,
          children: [
            { index: true, element: <ManagerDashboard /> },
          ]
        }
      ]
    },

   
  ]);

  return routes;
};

export default RouteConfigs;