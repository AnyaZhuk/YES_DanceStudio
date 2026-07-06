import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout.jsx';
import MainLayout from '../layout/MainLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import SchedulePage from '../pages/SchedulePage.jsx';
import ClassesPage from '../pages/ClassesPage.jsx';
import InstructorsPage from '../pages/InstructorsPage.jsx';
import PricingPage from '../pages/PricingPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import AdminPage from '../pages/AdminPage.jsx';
import RequireAuth from '../components/auth/RequireAuth.jsx';

export const routes = [
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/schedule', element: <SchedulePage /> },
      { path: '/classes', element: <ClassesPage /> },
      { path: '/instructors', element: <InstructorsPage /> },
      { path: '/pricing', element: <PricingPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: '/profile', element: <ProfilePage /> },
          { path: '/admin', element: <AdminPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
