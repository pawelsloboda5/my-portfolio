// src/components/Header.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { FaBars } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo or Name */}
        <div className="text-xl font-bold">
          <a href="#hero">Pawel Sloboda</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#skills" className="hover:underline">Skills</a></li>
            <li><a href="#projects" className="hover:underline">Projects</a></li>
            <li><a href="#experience" className="hover:underline">Experience</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>

        {/* Theme Toggle Switch and Hamburger Menu */}
        <div className="flex items-center">
          {/* Theme Toggle Switch */}
          <div className="mr-4">
            {/* Toggle Switch Container */}
            <label htmlFor="theme-toggle" className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                id="theme-toggle"
                className="sr-only"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
              <div className="w-16 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-between px-2 relative overflow-hidden">
                {/* Knob */}
                <div
                  className={`absolute left-1 top-1 w-7 h-6 bg-gray-400 rounded-full transform transition-transform duration-300 ease-in-out ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                  }`}
                  style={{ zIndex: 1 }}
                ></div>
                {/* Sun Icon */}
                <FiSun className="w-5 h-5 text-yellow-500 z-10" />
                {/* Moon Icon */}
                <FiMoon className="w-5 h-5 text-gray-800 dark:text-yellow-300 z-10" />
              </div>
            </label>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none text-gray-800 dark:text-black hover:text-gray-600 dark:hover:text-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <a href="#about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</a>
            </li>
            <li>
              <a href="#skills" className="hover:underline" onClick={() => setMenuOpen(false)}>Skills</a>
            </li>
            <li>
              <a href="#projects" className="hover:underline" onClick={() => setMenuOpen(false)}>Projects</a>
            </li>
            <li>
              <a href="#experience" className="hover:underline" onClick={() => setMenuOpen(false)}>Experience</a>
            </li>
            <li>
              <a href="#contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
