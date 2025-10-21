import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Welcome, Dashboard, Classes, Bookings, Memberships } from './pages';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Root app with Router, layout shell, and basic page routes.
   * Auth-free: no providers or guards. All routes are public.
   */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/classes"
          element={
            <Layout>
              <Classes />
            </Layout>
          }
        />
        <Route
          path="/bookings"
          element={
            <Layout>
              <Bookings />
            </Layout>
          }
        />
        <Route
          path="/memberships"
          element={
            <Layout>
              <Memberships />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
