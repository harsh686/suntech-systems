'use client';

import { useState, useRef, useEffect } from 'react';
import { FiX, FiSend, FiUser, FiMinus, FiMaximize2, FiSun } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Format AI message with clean structure - NO MARKDOWN SYMBOLS
function formatMessage(content: string) {
  // Clean up any markdown symbols that might slip through
  let cleanContent = content
    .replace(/\*\*/g, '') // Remove bold asterisks
    .replace(/\|/g, '') // Remove pipe symbols
    .replace(/---+/g, '') // Remove dash separators
    .replace(/###/g, '') // Remove heading markers
    .replace(/##/g, '')
    .replace(/#/g, '');
  
  const lines = cleanContent.split('\n');
  const formatted: JSX.Element[] = [];
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Section headers (text ending with :)
    if (trimmed.match(/^[A-Za-z][^:]*:$/) && trimmed.length < 50) {
      formatted.push(
        <div key={index} className="font-bold text-orange-700 mt-3 mb-1.5 text-sm">
          {trimmed.replace(':', '')}
        </div>
      );
    }
    // Bullet points
    else if (trimmed.startsWith('•') || (trimmed.startsWith('-') && !trimmed.match(/^\-\s*₹/))) {
      const text = trimmed.substring(1).trim();
      formatted.push(
        <div key={index} className="flex gap-2 ml-1 mb-1.5">
          <span className="text-green-600 mt-0.5 font-bold">•</span>
          <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
        </div>
      );
    }
    // Numbered lists
    else if (trimmed.match(/^\d+\./)) {
      const match = trimmed.match(/^(\d+)\.\s*(.+)/);
      if (match) {
        formatted.push(
          <div key={index} className="flex gap-2 ml-1 mb-1.5">
            <span className="text-orange-600 font-bold text-sm flex-shrink-0">{match[1]}.</span>
            <span className="text-sm text-gray-700 leading-relaxed">{match[2]}</span>
          </div>
        );
      }
    }
    // Highlight rupee amounts
    else if (trimmed.includes('₹')) {
      const parts = trimmed.split(/(₹[\d,]+(?:\s*to\s*₹[\d,]+)?)/g);
      formatted.push(
        <div key={index} className="mb-1.5 text-sm leading-relaxed">
          {parts.map((part, i) => 
            part.match(/₹[\d,]+/) ? (
              <span key={i} className="font-bold text-green-600">{part}</span>
            ) : (
              <span key={i} className="text-gray-700">{part}</span>
            )
          )}
        </div>
      );
    }
    // Questions (end with ?)
    else if (trimmed.endsWith('?')) {
      formatted.push(
        <div key={index} className="text-sm text-orange-600 mb-2 leading-relaxed font-medium">
          {trimmed}
        </div>
      );
    }
    // Regular text
    else {
      formatted.push(
        <div key={index} className="text-sm text-gray-700 mb-1.5 leading-relaxed">
          {trimmed}
        </div>
      );
    }
  });

  return <div className="space-y-0.5">{formatted}</div>;
}

export default function SolarGPTChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Solar Energy Advisor at Suntech Systems. I can help you with:\n\n• Calculate your savings & ROI\n• Explain government subsidies (up to ₹78,000)\n• System sizing & cost estimates\n• Technical specifications\n• Installation process\n\nWhat would you like to know about going solar?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const aiMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: '😕 Sorry, I\'m having trouble connecting. Please try again or call us at 9771045001.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Quick action buttons
  const quickActions = [
    'Calculate my solar savings',
    'Government subsidy details',
    'System cost & sizing',
    'Schedule free consultation'
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
          aria-label="Chat with Solar Advisor"
        >
          <div className="relative">
            <FiSun size={28} className="animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          } max-w-[95vw] max-h-[90vh] flex flex-col`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white p-4 rounded-t-2xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative bg-white bg-opacity-20 p-2 rounded-full">
                <FiSun size={24} className="animate-pulse" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Suntech Advisor</h3>
                <p className="text-xs text-orange-100">Solar Energy Expert • Online Now</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <FiMaximize2 size={18} /> : <FiMinus size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
                aria-label="Close chat"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                          : 'bg-gradient-to-br from-orange-400 to-yellow-500 text-white'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <FiUser size={20} />
                      ) : (
                        <FiSun size={20} />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none shadow-lg p-3'
                          : 'bg-white border border-gray-200 rounded-tl-none shadow-sm p-4'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      ) : (
                        formatMessage(message.content)
                      )}
                      <span
                        className={`text-xs mt-2 block ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 text-white flex items-center justify-center shadow-md">
                      <FiSun size={20} className="animate-spin" />
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce"></span>
                        <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                        <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="text-xs text-gray-500 ml-2">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="p-4 border-t bg-gradient-to-br from-orange-50 to-yellow-50">
                  <p className="text-xs font-semibold text-gray-600 mb-2.5 flex items-center gap-2">
                    <FiSun size={14} className="text-orange-500" />
                    Popular questions:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="text-xs bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 p-3 rounded-lg transition text-left border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-md"
                      >
                        <span className="font-medium">{action}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t bg-white rounded-b-2xl">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about solar energy..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-3 rounded-full hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
                    aria-label="Send message"
                  >
                    <FiSend size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2.5 text-center flex items-center justify-center gap-1">
                  <FiSun size={12} className="text-orange-500" />
                  Powered by AI • Instant solar expertise
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
