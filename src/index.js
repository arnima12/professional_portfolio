import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DropdownProvider } from './Admin/Dashboard/DropdownContext/DropdownContext';
import AuthProvider from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DropdownProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DropdownProvider>
  </React.StrictMode>
);

reportWebVitals();
