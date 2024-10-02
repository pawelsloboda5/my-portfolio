// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        {/* Optional: Add footer navigation links */}
      </div>
    </footer>
  );
}

export default Footer;
