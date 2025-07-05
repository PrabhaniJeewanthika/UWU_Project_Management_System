import React from 'react';
import { useRoutes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const RouteConfigs = () => {
  const routes = useRoutes([
    
    {
      path: '/manager',
      element: <ProtectedRoutes allowedRole="manager" />,
      children: [
       
      ]
    },

   
  ]);

  return routes;
};

export default RouteConfigs;