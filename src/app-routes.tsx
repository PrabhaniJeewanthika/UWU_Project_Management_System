import React from 'react';
import { useRoutes } from 'react-router';


import ManagerLayout from './components/layouts/ManagerLayout';
const RouteConfigs = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <ManagerLayout />,
            children: [
                
            ]
        }
    ])
    return element
};

export default RouteConfigs;