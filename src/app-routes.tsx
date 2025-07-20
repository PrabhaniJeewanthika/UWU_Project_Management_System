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
import ManagerCalendarPage from './components/pages/ManagerPages/ManagerCalendarPage';
import ManagerNoticePage from './components/pages/ManagerPages/ManagerNoticePage';
import MemberProjectListPage from './components/pages/MemberPages/MemberProjectList';
import MemberProjectViewPage from './components/pages/MemberPages/MemberProjectView';
import MemberTaskListPage from './components/pages/MemberPages/MemberTasksList';
import MemberTaskViewPage from './components/pages/MemberPages/MemberTaskViewPage';
import MemberReportHomePage from './components/pages/MemberPages/MemberReportHomePage';
import MemberCalendarPage from './components/pages/MemberPages/MemberCalendarPage';
import ProfilePage from './components/pages/MemberPages/MemberProfilePage';
import MemberNoticePage from './components/pages/MemberPages/MemberNoticePage';
<<<<<<< HEAD
import ManagerReportPage from './components/pages/ManagerPages/ManagerReportPage';
=======
import StartPage from './components/pages/PublicPages/StartPage';
import LoginPage from './components/pages/PublicPages/LoginPage';
import CoordinatorLoginPage from './components/pages/CoordinatorPages/CoordinatorLogin';
import AuthPage from './components/pages/PublicPages/AuthPage';
import CoordinatorLayout from './components/layouts/CoordinatorLayout';
import CoordinatorDashboardPage from './components/pages/CoordinatorPages/CoordinatorDashboard';
import CoordinatorProjectList from './components/pages/CoordinatorPages/CoordinatorProjectList';
import CoordinatorNoticePage from './components/pages/CoordinatorPages/CoordinatorNoticePage';
import CoordinatorReportPage from './components/pages/CoordinatorPages/CoordinatorReportPage';
import CoordinatorCalendarPage from './components/pages/CoordinatorPages/CoordinatorCalendarPage';
import CoordinatorProfilePage from './components/pages/CoordinatorPages/CoordinatorProfilePage';
import SupervisorPage from './components/pages/PublicPages/SupervisorPage';
import CoordinatorLogout from './components/pages/CoordinatorPages/CoordinatorLoginout';
import CoordinatorScheduleMeeting from './components/pages/CoordinatorPages/CoordinatorScheduleMeeting';



>>>>>>> 0f69b7f87f69be81e24bc0873afb20f8d1a739b7


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
<<<<<<< HEAD
            { path: 'reports', element: <ManagerReportPage /> },
            { path: 'notices', element: <NoticePage /> },
            { path: 'calendar', element: <CalendarPage /> },
=======
            // { path: 'reports', element: <ManagerReportHomePage /> },
            { path: 'notices', element: <ManagerNoticePage /> },
            { path: 'calendar', element: <ManagerCalendarPage /> },
>>>>>>> 0f69b7f87f69be81e24bc0873afb20f8d1a739b7
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

    {
      path: '/coordinator',
      element: <ProtectedRoute allowedRole="coordinator" />,
      children: [
        {
          path: '',
          element: <CoordinatorLayout />,
          children: [
            { index: true, element: <CoordinatorDashboardPage /> },
            { path: 'dashboard', element: <CoordinatorDashboardPage /> },
            { path: 'projects', element: <CoordinatorProjectList /> },
            { path: 'supervisors', element: <SupervisorPage /> },
            { path: 'notices', element: <CoordinatorNoticePage /> },
            { path: 'reports', element: <CoordinatorReportPage /> },
            { path: 'calendar', element: <CoordinatorCalendarPage /> },
            { path: 'profile', element: <CoordinatorProfilePage /> },
            { path: 'logout', element: <CoordinatorLogout />}
          ],
        },
      ],
    },
  ]);

  return element;
};

export default RouteConfigs;