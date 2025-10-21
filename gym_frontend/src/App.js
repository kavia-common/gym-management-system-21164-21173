import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.css';
import AppRoutes from './router/AppRoutes';

// PUBLIC_INTERFACE
function App() {
  /** Root app renders Router + Routes. */
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
