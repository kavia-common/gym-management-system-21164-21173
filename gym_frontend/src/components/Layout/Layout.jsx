import React from 'react';
import TopBar from './TopBar';
import SideNav from './SideNav';
import { colors } from '../../theme/colors';

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  /** App shell with SideNav and TopBar composing the main area. */
  const shell = {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gridTemplateRows: '60px 1fr',
    gridTemplateAreas: `"sidebar topbar" "sidebar main"`,
    height: '100%',
    background: colors.background,
    color: colors.text,
  };
  const main = { gridArea: 'main', padding: '1rem' };

  return (
    <div style={shell}>
      <SideNav />
      <TopBar />
      <main style={main}>{children}</main>
    </div>
  );
}
