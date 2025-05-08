// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BlogPost from './components/BlogPost';
import { ThemeProvider } from './components/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
