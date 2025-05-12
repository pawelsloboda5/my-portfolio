// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LazyLoad from './components/LazyLoad';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const AIChatbot = lazy(() => import('./components/AIChatbot'));

function App() {
  return (
    <>
    <Helmet>
      <title>Pawel Sloboda | ML Engineer & Software Developer</title>
      <meta name="description" content="Portfolio of Pawel Sloboda – projects in machine learning, web development and cybersecurity." />
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://www.pstech.website/'} />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Pawel Sloboda",
          "url": "https://www.pstech.website/",
          "sameAs": [
            "https://www.linkedin.com/in/pawel-sloboda-383181216/",
            "https://github.com/pawelsloboda5"
          ]
        }
      `}</script>
    </Helmet>
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <Suspense fallback={null}>
        <AIChatbot />
      </Suspense>
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <LazyLoad loader={() => import('./components/Projects')} />
        <LazyLoad loader={() => import('./components/Experience')} />
        <LazyLoad loader={() => import('./components/OldGamesGallery')} />
        <LazyLoad loader={() => import('./components/Blog')} />
        <Contact />
        <Analytics />
        <SpeedInsights />
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
