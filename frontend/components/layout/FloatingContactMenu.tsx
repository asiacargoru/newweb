'use client'

import { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const FloatingContactMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {/* Email Button */}
      <a
        href="mailto:info@asiacargo.ru"
        className={`absolute transition-all duration-300 ease-out ${
          isOpen 
            ? 'bottom-[220px] opacity-100 scale-100' 
            : 'bottom-0 opacity-0 scale-0 pointer-events-none'
        }`}
        aria-label="Написать на почту"
      >
        <div className="w-14 h-14 bg-[#f31911] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Mail className="w-6 h-6 text-white" />
        </div>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/79776882067"
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute transition-all duration-300 ease-out ${
          isOpen 
            ? 'bottom-[140px] opacity-100 scale-100' 
            : 'bottom-0 opacity-0 scale-0 pointer-events-none'
        }`}
        style={{ transitionDelay: isOpen ? '50ms' : '0ms' }}
        aria-label="Написать в WhatsApp"
      >
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6 text-white" fill="white" />
        </div>
      </a>

      {/* Main Phone Button */}
      <a
        href="tel:+74994040734"
        className={`block w-16 h-16 bg-[#f31911] rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(243,25,17,0.4)] hover:shadow-[0_6px_25px_rgba(243,25,17,0.6)] transition-all hover:scale-110 relative ${
          isOpen ? 'scale-110' : ''
        }`}
        onClick={(e) => {
          if (!isOpen) {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-label={isOpen ? "Позвонить нам" : "Открыть меню контактов"}
      >
        {/* Pulse animations */}
        <span className={`absolute inset-0 rounded-full border-2 border-[#f31911] animate-pulse-ring ${!isOpen ? 'block' : 'hidden'}`} />
        <span 
          className={`absolute inset-0 rounded-full border-2 border-[#f31911] animate-pulse-ring ${!isOpen ? 'block' : 'hidden'}`}
          style={{ animationDelay: '1s' }}
        />
        
        {/* Phone Icon with shake animation */}
        <Phone 
          className={`w-7 h-7 text-white transition-transform duration-300 ${
            isOpen ? 'rotate-135' : 'animate-shake'
          }`}
        />
      </a>

      {/* Close overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={handleToggle}
        />
      )}
    </div>
  );
};

export default FloatingContactMenu;
