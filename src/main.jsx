// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import { ThemeProvider } from './components/ThemeContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
