import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Login, Dashboard, Classes, Bookings, Memberships } from './pages';
import { AuthProvider } from './context';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Root app with Router, layout shell, and basic page routes.
   */
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
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
    </AuthProvider>
  );
}
