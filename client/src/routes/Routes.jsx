import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRoute from './PrivateRoute.jsx';

/* =============================
📦 Custom Imports
============================= */
const MainPage = lazy(() => import('../pages/MainPage.jsx'));
const AuthPage = lazy(() => import('../pages/AuthPage.jsx'));
const DashboardPage = lazy(() => import('../pages/DashboardPage.jsx'));

/* =============================
📦 Component - Routes
============================= */
export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/dashboard',
      element: <PrivateRoute />,
      children: [
        {
          path: '/dashboard',
          element: <DashboardPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/' replace={true} />,
    },
  ]);
}
