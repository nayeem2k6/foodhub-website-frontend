
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiLoader, FiX, FiBluetooth } from 'react-icons/fi';
import api from '../../lib/api';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    "Recommend Italian restaurants near me",
    "Best vegan options in the city",
    "Fine dining for special occasions",
    "Cheap eats under $20",
    "Family-friendly restaurants"
  ];

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/ai/chat', { message: input });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.data.response || "I'm having trouble processing that. Could you try rephrasing?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      toast.success('AI response generated!');
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to the AI service. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('AI service temporarily unavailable');
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <div className="glass shadow-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <FiBluetooth className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Your smart restaurant advisor
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearChat}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FiX className="w-5 h-5" />
                <span>Clear Chat</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 flex flex-col px-6 py-8 lg:px-12 lg:py-12">
          <div className="flex-1 overflow-y-auto space-y-6 mb-12">
            {/* Welcome Message */}
            {messages.length === 0 && showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-3xl max-w-2xl mx-auto text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                  <FiBluetooth className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  Hello! I'm your AI Restaurant Assistant 🤖
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                  Ask me anything about restaurants, cuisines, locations, or get personalized recommendations!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setInput(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="group flex items-center space-x-3 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 hover:border-blue-300 hover:shadow-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:-translate-y-1"
                    >
                      <FiBluetooth className="w-5 h-5 text-blue-500 flex-shrink-0 group-hover:scale-110" />
                      <span className="text-left flex-1 text-sm">{suggestion}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-4xl p-6 rounded-3xl shadow-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'glass bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50'
                  } ${message.role === 'user' ? 'rounded-br-xl' : 'rounded-bl-xl'}`}>
                    <div className="flex items-start space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.role === 'user'
                          ? 'bg-white/30 backdrop-blur-sm'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}>
                        {message.role === 'user' ? (
                          <FiUser className="w-6 h-6 text-white" />
                        ) : (
                          <FiBluetooth className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p className="text-xs opacity-75 mt-3">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="glass p-6 rounded-3xl max-w-4xl border border-gray-200/50 shadow-xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                      <FiBluetooth className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-pulse w-3/4 mb-4" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-pulse" />
                        <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-5/6 animate-pulse" />
                        <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-4/6 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-3xl shadow-2xl border-t border-white/20 sticky bottom-8 backdrop-blur-xl mx-6 lg:mx-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about restaurants... (Ctrl+Enter to send)"
                  rows={1}
                  className="flex-1 min-h-[44px] max-h-32 resize-none px-5 py-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl border-2 border-gray-200/50 dark:border-gray-700/50 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100/50 shadow-inner transition-all duration-300 placeholder-gray-500"
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg"
                >
                  {loading ? (
                    <FiLoader className="w-6 h-6 animate-spin" />
                  ) : (
                    <FiSend className="w-6 h-6" />
                  )}
                </motion.button>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-4 opacity-75">
                <span>AI-powered by Google Gemini</span>
                <div className="w-1 h-1 bg-current rounded-full" />
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded font-mono">Ctrl+Enter</kbd>
                <span>to send</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}