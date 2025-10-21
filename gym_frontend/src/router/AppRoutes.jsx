import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Memberships from '../pages/Memberships';
import Classes from '../pages/Classes';
import Bookings from '../pages/Bookings';
import Payments from '../pages/Payments';
import Profile from '../pages/Profile';
import AuthCallback from '../pages/AuthCallback';
import NotFound from '../pages/NotFound';
import { useAuthStore } from '../state/authStore';
import Login from '../pages/Login';

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Defines public and protected routes with a common dashboard layout. */
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

// PUBLIC_INTERFACE
function RequireAuth() {
  /** Redirects to /login if not authenticated. */
  const isAuthed = useAuthStore(s => !!s.token);
  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }
  return <OutletWrapper />;
}

function OutletWrapper() {
  // Small wrapper to avoid importing Outlet directly where not necessary
  const { Outlet } = require('react-router-dom');
  return <Outlet />;
}
