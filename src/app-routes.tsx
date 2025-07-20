import React from 'react';
import { useRoutes } from 'react-router';
import ManagerLayout from './components/layouts/ManagerLayout';
import MemberLayout from './components/layouts/MemberLayout';
import MemberDashboard from './components/pages/MemberPages/MemberDashboard';
import ManagerDashboard from './components/pages/ManagerPages/ManagerDashboard';
import ProtectedRoute from './ProtectedRoute';
import ManagerProfilePage from './components/pages/ManagerPages/ManagerProfilePage';
import ManagerProjectListPage from './components/pages/ManagerPages/ManagerProjectListPage';
import ManagerProjectViewPage from './components/pages/ManagerPages/ManagerProjectViewPage';
import ManagerTaskListPage from './components/pages/ManagerPages/ManagerTaskListPage';
import ManagerTaskViewPage from './components/pages/ManagerPages/ManagerTaskViewPage';
import CalendarPage from './components/pages/PublicPages/CalendarPage';
import NoticePage from './components/pages/PublicPages/NoticePage';
import MemberProjectListPage from './components/pages/MemberPages/MemberProjectList';
import MemberProjectViewPage from './components/pages/MemberPages/MemberProjectView';
import MemberTaskListPage from './components/pages/MemberPages/MemberTasksList';
import MemberTaskViewPage from './components/pages/MemberPages/MemberTaskViewPage';
import MemberReportHomePage from './components/pages/MemberPages/MemberReportHomePage';
import MemberCalendarPage from './components/pages/MemberPages/MemberCalendarPage';
import ProfilePage from './components/pages/MemberPages/MemberProfilePage';
import MemberNoticePage from './components/pages/MemberPages/MemberNoticePage';
import StartPage from './components/pages/PublicPages/StartPage';
import LoginPage from './components/pages/PublicPages/LoginPage';
import CoordinatorLoginPage from './components/pages/PublicPages/CoordinatorLogin';
import AuthPage from './components/pages/PublicPages/AuthPage';


const RouteConfigs = () => {
  const element = useRoutes([
    { path: '', element: <StartPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/logincoordinator', element: <CoordinatorLoginPage /> },
    { path: '/auth', element: <AuthPage /> },

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
            { path: 'reports', element: "" },
            { path: 'notices', element: <NoticePage /> },
            { path: 'calendar', element: <CalendarPage /> },
            { path: 'profile', element: <ManagerProfilePage /> },
          ],
        },
      ],
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
            { path: 'member-projects', element: <MemberProjectListPage /> },
            { path: 'member-projects/:id', element: <MemberProjectViewPage /> },
            { path: 'member-tasks', element: <MemberTaskListPage /> },
            { path: 'tasks/:id', element: <MemberTaskViewPage /> },
            { path: 'member-reports', element: <MemberReportHomePage /> },
            { path: 'calendar', element: <MemberCalendarPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'member-notices', element: <MemberNoticePage /> },
          ],
        },
      ],
    },

  ]);
  return element
};

export default RouteConfigs;