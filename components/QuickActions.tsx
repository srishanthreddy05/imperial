'use client';

import { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, Bot, X, MessageSquareText, Sparkles, Stethoscope } from 'lucide-react';
import BotModal from './BotModal';

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key handler
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsBotOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const openBot = () => {
    setIsBotOpen(true);
    closeMenu();
  };
  
  const closeBot = () => setIsBotOpen(false);

  const actions = [
    {
      id: 'call',
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+19039570417',
      color: 'bg-cyan-500 hover:bg-cyan-600',
      borderColor: 'border-l-cyan-500'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/19592824133',
      external: true,
      color: 'bg-green-500 hover:bg-green-600',
      borderColor: 'border-l-green-500'
    },
    {
      id: 'bot',
      icon: Bot,
      label: 'Ask AI Assistant',
      onClick: openBot,
      color: 'bg-[#FF6B6B] hover:bg-red-600',
      borderColor: 'border-l-[#FF6B6B]'
    }
  ];

  return (
    <>
      {/* Quick Actions Floating Button */}
      <div ref={wrapperRef} className="fixed bottom-6 right-6 z-50 font-sans">
        
        {/* Action Menu Items */}
        <div 
          className={`absolute bottom-20 right-0 flex flex-col gap-3 transition-all duration-300 origin-bottom-right ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 translate-y-5 scale-90 pointer-events-none'
          }`}
        >
          {actions.map((action, index) => (
            <ActionButton 
              key={action.id}
              {...action}
              delay={index * 50}
              isMenuOpen={isOpen}
            />
          ))}
        </div>

        {/* Main Floating Toggle Button with Chat/Support Icon */}
        <button
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            isOpen ? 'bg-gray-800 rotate-90' : 'bg-[#005EB8] hover:bg-[#004B93]'
          }`}
          aria-label={isOpen ? 'Close quick actions' : 'Open quick actions menu'}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <div className="relative">
              <MessageSquareText size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00A9CE] animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00A9CE]" />
            </div>
          )}
        </button>
      </div>

      {/* Bot Modal */}
      <BotModal isOpen={isBotOpen} onClose={closeBot} />
    </>
  );
}

// Individual Action Item
function ActionButton({ 
  icon: Icon, 
  label, 
  href, 
  onClick, 
  external, 
  color, 
  borderColor,
  delay,
  isMenuOpen 
}: any) {
  const baseClasses = `flex items-center gap-3 px-5 py-3 rounded-3xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap min-w-[180px] border-l-4 ${borderColor}`;
  
  const animationClasses = isMenuOpen 
    ? 'opacity-100 translate-x-0' 
    : 'opacity-0 translate-x-5';
  
  const hoverClasses = 'hover:translate-x-[-8px] hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]';

  const content = (
    <>
      <span className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white shrink-0 shadow-xs`}>
        <Icon size={16} />
      </span>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${baseClasses} ${animationClasses} ${hoverClasses}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${animationClasses} ${hoverClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {content}
    </button>
  );
}
