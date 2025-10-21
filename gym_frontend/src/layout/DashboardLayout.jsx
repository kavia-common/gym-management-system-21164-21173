import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';

// PUBLIC_INTERFACE
export default function DashboardLayout() {
  /** App shell with Sidebar and Topbar composing the main content area. */
  return (
    <div className="app-shell">
      <Sidebar />
      <Topbar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
