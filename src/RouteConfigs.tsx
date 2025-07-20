import React from 'react';
import { useRoutes } from 'react-router-dom';
import ProtectedRoute from '../src/ProtectedRoute';

import LoginPage from '../src/components/pages/PublicPages/LoginPage';
import CoordinatorLoginPage from '../src/components/pages/CoordinatorPages/CoordinatorLogin';
import StartPage from '../src/components/pages/PublicPages/StartPage';

import ManagerDashboard from '../src/components/pages/ManagerPages/ManagerDashboard';
import MemberDashboard from '../src/components/pages/MemberPages/MemberDashboard';

import ManagerLayout from '../src/components/layouts/ManagerLayout';
import MemberLayout from '../src/components/layouts/MemberLayout';
import CoordinatorLayout from '../src/components/layouts/CoordinatorLayout';


import CoordinatorNoticePage from '../src/components/pages/CoordinatorPages/CoordinatorNoticePage';
import CoordinatorReportPage from '../src/components/pages/CoordinatorPages/CoordinatorReportPage';
import CoordinatorCalendarPage from '../src/components/pages/CoordinatorPages/CoordinatorCalendarPage';
import CoordinatorProfilePage from '../src/components/pages/CoordinatorPages/CoordinatorProfilePage';
import SupervisorPage from '../src/components/pages/PublicPages/SupervisorPage';
import CoordinatorDashboardPage from '../src/components/pages/CoordinatorPages/CoordinatorDashboard';

const RouteConfigs = () => {
  const routes = useRoutes([
    { path: '', element: <StartPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/logincoordinator', element: <CoordinatorLoginPage /> },

    {
      path: '/manager',
      element: <ProtectedRoute allowedRole="manager" />,
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

    {
      path: '/member',
      element: <ProtectedRoute allowedRole="member" />,
      children: [
        {
          path: '',
          element: <MemberLayout />,
          children: [
            { index: true, element: <MemberDashboard /> },
          ]
        }
      ]
    },

    {
      path: '/coordinator',
      element: <ProtectedRoute allowedRole="coordinator" />,
      children: [
        {
          path: '',
          element: <CoordinatorLayout />,
          children: [
            { index: true, element: <CoordinatorDashboardPage /> },
          ]
        }
      ]
    }
  ]);

  return routes;
};

export default RouteConfigs;