// src/components/Contact.jsx
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
        {/* Contact Information */}
        <div className="mb-6">
          <p className="mb-2">Feel free to reach out to me via email or through my social media profiles.</p>
        </div>
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 text-3xl">
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaLinkedin />
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
            <FaGithub />
          </a>
          <a href="mailto:youremail@example.com" className="hover:text-red-500">
            <FaEnvelope />
          </a>
        </div>
        {/* Optional Contact Form */}
        {/* Uncomment the following code if you want to include a contact form */}
        {/*
        <form className="mt-8 max-w-md mx-auto">
          <input type="text" placeholder="Your Name" className="w-full p-2 mb-4 border rounded" />
          <input type="email" placeholder="Your Email" className="w-full p-2 mb-4 border rounded" />
          <textarea placeholder="Your Message" className="w-full p-2 mb-4 border rounded"></textarea>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Send Message</button>
        </form>
        */}
      </div>
    </section>
  );
}

export default Contact;
