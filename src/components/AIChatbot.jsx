import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext
import robotIcon from '../assets/robot_1_blue.png'; // Assuming this is the correct path

// Placeholder for a generic user icon (SVG)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

const AIChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useContext(ThemeContext); // Use theme from context
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ask me if Pawel is a good fit for your job or solution!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // Show teaser after a delay, only if chat is not open and teaser not dismissed
    const timer = setTimeout(() => {
      if (!isChatOpen && !teaserDismissed) {
        setShowTeaser(true);
      }
    }, 3000); // 3-second delay

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, [isChatOpen, teaserDismissed]); // Re-run if chat opens or teaser is dismissed

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (showTeaser) {
      setShowTeaser(false); // Hide teaser when chat is toggled
    }
    if (!isChatOpen) { // If opening chat
        setTeaserDismissed(true); // Also mark teaser as dismissed so it doesn't reappear after chat close
    }
  };

  const handleOpenChatFromTeaser = () => {
    setIsChatOpen(true);
    setShowTeaser(false);
    setTeaserDismissed(true); // Permanently dismiss teaser for the session after interaction
  };

  const handleDismissTeaser = (e) => {
    e.stopPropagation(); // Prevent opening chat window if clicking close on teaser
    setShowTeaser(false);
    setTeaserDismissed(true); // Permanently dismiss for the session
  };

  const iconPosition = isMobile
    ? { top: '85px', left: '20px' } // Moved down further for mobile
    : { top: '90px', right: '30px' }; // Moved down further for desktop

  const iconSize = isMobile ? '48px' : '56px';

  const chatWindowVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }
  };
  
  const initialMessageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.4, ease: "easeOut" } },
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    const content = inputValue.trim();
    if (!content) return;
    setMessages(prev => [...prev, { role: 'user', content }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content }] })
      });
      const data = await res.json();
      const reply = data.content || "I'm sorry, I couldn't get a response.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          ...iconPosition,
          zIndex: 1000,
          width: iconSize,
          height: iconSize,
          cursor: 'pointer',
        }}
        onClick={toggleChat}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, y: [-2, 2, -2] }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.3 },
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="rounded-full shadow-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
      >
        <img src={robotIcon} alt="AI Chatbot Icon" className="w-3/4 h-3/4 object-contain" />
      </motion.div>

      {/* Proactive Teaser Speech Bubble */}
      <AnimatePresence>
        {showTeaser && !isChatOpen && (
          <motion.div
            key="teaserBubble"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              position: 'fixed',
              ...(isMobile
                ? { top: '90px', left: '70px', right: '10px' } // Adjusted to leave space for robot icon
                : { top: '90px', right: '100px' }), // Fixed position to the left of robot on desktop
              zIndex: 1001,
            }}
            className={`${isMobile ? 'w-auto' : 'w-64'} p-3 bg-white dark:bg-gray-700 rounded-lg shadow-2xl cursor-pointer ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10`}
            onClick={handleOpenChatFromTeaser}
          >
            <button 
              onClick={handleDismissTeaser}
              className="absolute top-1 right-1 p-0.5 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Dismiss teaser"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className={`text-sm font-medium text-gray-900 dark:text-gray-100 ${isMobile ? 'text-center' : ''}`}>
              Got questions for Pawel?
            </p>
            <p className={`text-xs text-gray-600 dark:text-gray-300 mt-1 ${isMobile ? 'text-center' : ''}`}>
              Ask if he's a good fit for your job or solution!
            </p>
            <p className={`text-xs text-blue-600 dark:text-blue-400 font-semibold mt-2 ${isMobile ? 'text-center' : ''}`}>
              Click me to start chatting!
            </p>
            {/* Speech bubble tail (only show on desktop) */}
            {!isMobile && (
              <div 
                className="absolute w-3 h-3 bg-white dark:bg-gray-700 transform rotate-45"
                style={{
                  right: '-6px',
                  top: '20px',
                }}
              ></div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            key="chatWindow"
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              zIndex: 999,
              ...(isMobile
                ? { bottom: '20px', left: '10px', right: '10px', maxHeight: '70vh' }
                : { bottom: '90px', right: '30px', width: '370px', maxHeight: '550px' }),
            }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">AI Assistant</h3>
              <button 
                onClick={toggleChat} 
                className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start space-x-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <img src={robotIcon} alt="Bot Avatar" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 p-1" />
                  )}
                  <div className={`${msg.role === 'user' ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-tr-none' : 'bg-blue-500 dark:bg-blue-600 text-white rounded-tl-none'} p-3 rounded-lg shadow-md max-w-xs sm:max-w-sm md:max-w-md text-sm whitespace-pre-line`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-500 flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <UserIcon />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-2">
                  <img src={robotIcon} alt="Bot Avatar" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 p-1" />
                  <div className="bg-blue-500 dark:bg-blue-600 text-white p-3 rounded-lg rounded-tl-none shadow-md flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-grow p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 h-10"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button 
                  className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full transition-colors flex-shrink-0"
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-6 9 6M21 10l-9 6-9-6" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot; 