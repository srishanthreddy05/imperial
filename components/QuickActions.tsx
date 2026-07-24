'use client';

import { useState, useRef, useEffect } from 'react';
import { Phone, Bot, X, MessageSquareText, Smartphone } from 'lucide-react';
import BotModal from './BotModal';

const phoneNumber = '+19039570417';

export default function QuickActions() {
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setChatMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key handler
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setChatMenuOpen(false);
        setIsBotOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const openBot = () => {
    setIsBotOpen(true);
    setChatMenuOpen(false);
  };

  const closeBot = () => setIsBotOpen(false);

  return (
    <>
      {/* Floating Actions Container */}
      <div ref={wrapperRef} className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end gap-3">
        
        {/* Support Popover Widget */}
        <div 
          className={`absolute bottom-full right-0 mb-3 w-[320px] bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${
            chatMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          {/* Popover Header */}
          <div className="bg-gradient-to-r from-[#005EB8] to-[#007cc2] text-white p-5 rounded-t-[20px] relative">
            <button 
              onClick={() => setChatMenuOpen(false)} 
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close conversation menu"
            >
              <X size={18} />
            </button>
            <h3 className="font-bold text-lg leading-tight">Start a Conversation</h3>
            <p className="text-white/80 text-xs mt-1">{"Choose how you'd like to contact us."}</p>
          </div>

          {/* Popover Body Option Cards */}
          <div className="p-4 flex flex-col gap-3">
            {/* Card 1: AI Assistant */}
            <button 
              onClick={openBot}
              className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all duration-200 flex items-start gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center text-[#FF6B6B] shrink-0 group-hover:scale-105 transition-transform">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#005EB8] transition-colors">AI Assistant</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Get instant answers to your questions.</p>
              </div>
            </button>

            {/* Card 2: Send an SMS */}
            <a 
              href={`sms:${phoneNumber}?body=${encodeURIComponent('Hello, I would like to schedule an appointment.')}`}
              className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all duration-200 flex items-start gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 shrink-0 group-hover:scale-105 transition-transform">
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#005EB8] transition-colors">Send an SMS</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Text our office directly.</p>
              </div>
            </a>
          </div>
        </div>

        {/* 1. Independent Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-3 px-5 py-3 rounded-3xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap min-w-[140px] sm:min-w-[180px] border-l-4 border-l-cyan-500 hover:translate-x-[-8px] hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
        >
          <span className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Phone size={16} />
          </span>
          <span>Call Now</span>
        </a>

        {/* 2. Chat Button (Triggers Popover) */}
        <button
          onClick={() => setChatMenuOpen(!chatMenuOpen)}
          className="flex items-center gap-3 px-5 py-3 rounded-3xl bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap min-w-[140px] sm:min-w-[180px] border-l-4 border-l-[#005EB8] hover:translate-x-[-8px] hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] cursor-pointer"
        >
          <span className="w-8 h-8 rounded-full bg-[#005EB8] flex items-center justify-center text-white shrink-0 shadow-xs">
            <MessageSquareText size={16} />
          </span>
          <span>Chat</span>
        </button>
      </div>

      {/* Bot Modal */}
      <BotModal isOpen={isBotOpen} onClose={closeBot} />
    </>
  );
}
