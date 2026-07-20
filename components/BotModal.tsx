'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { Message } from '@/types/chat';

interface BotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BotModal({ isOpen, onClose }: BotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm the Imperial Care assistant. I can help you with questions about our services, locations, hours, and more. How can I help you today?",
      timestamp: getCurrentTime()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: getCurrentTime()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: getCurrentTime()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please call us at (903) 957-0417 for assistance.",
        timestamp: getCurrentTime()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-xs z-[9998] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 right-0 md:bottom-24 md:right-6 w-full md:w-[400px] h-[85vh] md:h-[600px] max-h-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden border border-gray-200 animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#005EB8] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-base leading-tight">Imperial Care Assistant</h3>
              <div className="flex items-center gap-1.5 text-xs opacity-90">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-[#005EB8]' : 'bg-gray-200'
                }`}>
                  {msg.role === 'user' ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-gray-600" />
                  )}
                </div>
                
                {/* Bubble */}
                <div className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#005EB8] text-white rounded-br-xs' 
                    : 'bg-white text-gray-800 rounded-bl-xs shadow-xs border border-gray-100'
                }`}>
                  {msg.content}
                </div>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-10">{msg.timestamp}</span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-gray-600" />
              </div>
              <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-xs shadow-xs flex gap-1.5 border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question..."
              maxLength={500}
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-xs sm:text-sm outline-hidden focus:bg-white focus:border-[#005EB8] focus:ring-2 focus:ring-[#005EB8]/10 transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-10 h-10 rounded-full bg-[#005EB8] text-white flex items-center justify-center hover:bg-[#004B93] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 shrink-0">
          <p className="text-[11px] text-amber-800 leading-tight">
            <span className="font-bold">⚠️</span> I cannot provide medical advice. For emergencies, call <strong>911</strong>. For appointments, call <strong>(903) 957-0417</strong>.
          </p>
        </div>
      </div>
    </>
  );
}

function getCurrentTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
