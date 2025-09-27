'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MessageCircle, Send, Heart, Sparkles, Zap, Coffee, CloudRain, Sun } from 'lucide-react';

// TypeScript Interfaces
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp?: Date;
}

interface ChatbotResponse {
  response?: string;
  error?: string;
  message?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  suggestions?: string[];
}

interface MoodMateProps {
  chatbotApiEndpoint?: string;
  apiKey?: string;
}

// Quick starter prompts to help users begin conversations
const quickStarters = [
  { 
    icon: CloudRain, 
    text: "I'm feeling overwhelmed with school", 
    color: "from-teal-400/90 to-teal-500/90" 
  },
  { 
    icon: Coffee, 
    text: "I'm stressed about upcoming exams", 
    color: "from-cyan-400/90 to-cyan-500/90" 
  },
  { 
    icon: Heart, 
    text: "I'm feeling lonely lately", 
    color: "from-sky-400/90 to-sky-500/90" 
  },
  { 
    icon: Zap, 
    text: "I'm anxious about my future", 
    color: "from-teal-500/90 to-cyan-600/90" 
  },
  { 
    icon: Sun, 
    text: "I want to improve my mood", 
    color: "from-emerald-400/90 to-teal-500/90" 
  },
  { 
    icon: Sparkles, 
    text: "I need motivation to keep going", 
    color: "from-cyan-500/90 to-sky-500/90" 
  }
];

// Custom Hook for Chat API
const useChatbot = (apiEndpoint?: string, apiKey?: string) => {
  const sendMessage = useCallback(async (message: string): Promise<string> => {
    const endpoint = apiEndpoint || 'https://therepybot.onrender.com/chat';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
        },
        body: JSON.stringify({ 
          message: message.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: ChatbotResponse = await response.json();
      const botMessage = data.response || data.message || data.error;
      
      if (botMessage) {
        return botMessage;
      } else {
        throw new Error('No response from API');
      }
    } catch (error) {
      console.error('Chatbot API Error:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, and remember that you're not alone in this.";
    }
  }, [apiEndpoint, apiKey]);

  return { sendMessage };
};

const MoodMate: React.FC<MoodMateProps> = ({ 
  chatbotApiEndpoint,
  apiKey 
}) => {
  const [message, setMessage] = useState<string>('');
  const [chatStarted, setChatStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showStarters, setShowStarters] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm MoodMate, your compassionate AI wellness buddy. I'm here to listen and support you through whatever you're experiencing. How are you feeling today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useChatbot(chatbotApiEndpoint, apiKey);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSendMessage = useCallback(async (messageToSend?: string): Promise<void> => {
    const textToSend = messageToSend || message.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setChatStarted(true);
    setShowStarters(false);
    setIsLoading(true);

    try {
      const botResponse = await sendMessage(textToSend);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I apologize, but I'm experiencing some technical difficulties. Please try again, and remember that you can always reach out to a mental health professional if you need immediate support.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [message, isLoading, sendMessage]);

  const handleQuickStart = useCallback((starterText: string) => {
    handleSendMessage(starterText);
  }, [handleSendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
    if (e.target.value.trim()) {
      setShowStarters(false);
    } else if (!chatStarted) {
      setShowStarters(true);
    }
  }, [chatStarted]);

  const formatTimestamp = useCallback((date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Inter", sans-serif' }}>
      {/* Simple Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-teal-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-400/90 to-cyan-200 rounded-2xl flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-light text-teal-700 tracking-wide">MoodMate</h1>
            <div className="text-xs bg-teal-50 text-teal-600 px-3 py-1.5 rounded-full border border-teal-200/60">
              ● Online
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Chat Interface */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 px-8 py-6 text-white">
            <div className="flex items-center space-x-4">
              <MessageCircle className="w-6 h-6 opacity-90" />
              <div>
                <div className="font-light text-lg">Your Safe Space</div>
                <div className="text-sm opacity-80 font-light">Anonymous • Confidential • Supportive</div>
              </div>
            </div>
          </div>
          
          {/* Messages Area */}
          <div 
            className="h-[520px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-teal-50/20 to-white/80"
            role="log"
            aria-label="Chat messages"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl shadow-sm ${
                  msg.isBot 
                    ? 'bg-white/90 border border-teal-200/40 text-teal-800' 
                    : 'bg-gradient-to-br from-teal-400/90 to-cyan-500/90 text-white shadow-lg'
                }`}>
                  <div className="text-sm whitespace-pre-line leading-relaxed font-light">{msg.text}</div>
                  {msg.timestamp && (
                    <div className={`text-xs mt-3 opacity-60 font-light ${msg.isBot ? 'text-teal-600' : 'text-white'}`}>
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/90 border border-teal-200/40 text-teal-800 max-w-xs lg:max-w-md px-6 py-4 rounded-3xl shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1" aria-label="MoodMate is typing">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-teal-600 font-light">MoodMate is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starters - Only show when appropriate */}
          {showStarters && !chatStarted && (
            <div className="px-8 py-6 bg-teal-50/30 border-t border-teal-200/40">
              <div className="text-sm font-light text-teal-700 mb-4">
                💭 Not sure how to start? Try one of these:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickStarters.map((starter, index) => {
                  const IconComponent = starter.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickStart(starter.text)}
                      className={`flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r ${starter.color} text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 border border-white/20 backdrop-blur-sm`}
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0 opacity-90" />
                      <span className="text-sm font-light">{starter.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-8 bg-white/90 border-t border-teal-200/40">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <label htmlFor="message-input" className="sr-only">
                  Enter your message
                </label>
                <textarea
                  id="message-input"
                  ref={textareaRef}
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... I'm here to listen 💙"
                  className="w-full resize-none border-2 border-teal-200/50 rounded-2xl px-5 py-4 outline-none text-teal-800 placeholder-teal-400 min-h-[52px] max-h-[120px] focus:border-teal-400 transition-all duration-300 font-light bg-white/70 backdrop-blur-sm"
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!message.trim() || isLoading}
                className="p-4 bg-gradient-to-br from-teal-400/90 to-cyan-500/90 text-white rounded-2xl hover:from-teal-500/90 hover:to-cyan-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Helpful info */}
            <div className="mt-4 text-xs text-teal-600 text-center font-light">
              This is a safe space. Your conversations are private and anonymous.
            </div>
          </div>
        </div>

        {/* Crisis Support Info */}
        <div className="mt-8 bg-rose-50/80 border border-rose-200/60 rounded-3xl p-6 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-sm font-light text-rose-700 mb-2">Crisis Support Available</div>
            <div className="text-xs text-rose-600 font-light">
              If you're in crisis: <strong className="font-medium">Call 988</strong> (Suicide & Crisis Lifeline) or <strong className="font-medium">Text HOME to 741741</strong> (Crisis Text Line)
            </div>
          </div>
        </div>

        {/* Additional Support Resources */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-sky-50/80 border border-sky-200/60 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-sm font-light text-sky-700 mb-2">Student Counseling</div>
            <div className="text-xs text-sky-600 font-light">
              Many schools offer free counseling services for students
            </div>
          </div>
          <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-sm font-light text-emerald-700 mb-2">Professional Help</div>
            <div className="text-xs text-emerald-600 font-light">
              Consider reaching out to a licensed therapist for ongoing support
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// src/app/therabot/page.tsx

export default function TherabotPage() {
  return <MoodMate />;
}
