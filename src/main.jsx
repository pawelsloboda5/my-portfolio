// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BlogPost from './components/BlogPost';
import { ThemeProvider } from './components/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
