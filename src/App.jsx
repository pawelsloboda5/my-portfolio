// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import OldGamesGallery from './components/OldGamesGallery';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <AIChatbot />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <OldGamesGallery />
        <Blog />
        <Contact />
        <Analytics />
      </main>
      <Footer />
    </div>
  );
}

export default App;
