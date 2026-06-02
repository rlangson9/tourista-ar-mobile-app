/// <reference types="vite/client" />

import { Bot, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppMode } from '../App';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  appMode: AppMode;
}

const SYSTEM_PROMPTS: Record<AppMode, string> = {
  tourism: `You are a knowledgeable travel assistant for Tourista AR, a platform specialising in travel between China and Africa.
You help travellers plan trips, suggest destinations, create itineraries, explain visa requirements, and answer travel questions.
Focus on China and Africa as destinations. Be concise, friendly, and practical. Use bullet points for lists.
Keep responses under 150 words unless the user asks for more detail.`,

  trade: `You are a B2B trade assistant for Tourista AR, a platform connecting African buyers with Chinese suppliers.
You help with product sourcing, supplier vetting, MOQ negotiations, shipping logistics, customs procedures, and trade finance.
Be concise, professional, and practical. Use bullet points for lists.
Keep responses under 150 words unless the user asks for more detail.`,
};

const QUICK_SUGGESTIONS: Record<AppMode, { label: string; prompt: string }[]> = {
  tourism: [
    { label: 'Best China tours', prompt: 'What are the best tours to China for a business traveller?' },
    { label: 'Best time for Africa', prompt: 'When is the best time to visit East Africa for a safari?' },
    { label: 'Visa requirements', prompt: 'What are the visa requirements for African citizens visiting China?' },
  ],
  trade: [
    { label: 'Find suppliers', prompt: 'How do I find verified machinery suppliers in China?' },
    { label: 'Shipping costs', prompt: 'What are typical shipping costs from Guangzhou to Nairobi?' },
    { label: 'Customs process', prompt: 'What is the import customs process for goods from China to Nigeria?' },
  ],
};

function getWelcomeMessage(mode: AppMode): string {
  return mode === 'tourism'
    ? 'Hi! I can help you plan your perfect trip, suggest destinations, create itineraries, and answer travel questions. How can I assist you today?'
    : 'Hello! I can help you source products, find verified suppliers, estimate shipping costs, and explain trade procedures. What would you like to know?';
}

export function AIAssistant({ isOpen, onToggle, appMode }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: getWelcomeMessage(appMode) },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset conversation when mode switches
  useEffect(() => {
    setMessages([{ role: 'assistant', content: getWelcomeMessage(appMode) }]);
    setError(null);
  }, [appMode]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const text = (messageText ?? input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5002';

      // Build history excluding the initial welcome message
      const conversationHistory = updatedMessages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      }));

      const response = await fetch(`${backendUrl}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPTS[appMode] },
            ...conversationHistory,
          ],
          mode: appMode,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const assistantContent =
        data.response ?? 'Sorry, I could not generate a response.';

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      // Restore user input so they can retry
      setMessages(updatedMessages.slice(0, -1));
      setInput(text);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = QUICK_SUGGESTIONS[appMode];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={onToggle}
          className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-40"
        >
          <Bot className="w-7 h-7 text-white" />
        </motion.button>
      )}

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl z-40 flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: '60vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Touri ai</h3>
                  <p className="text-xs text-blue-100">
                    {appMode === 'tourism' ? 'Travel mode' : 'Trade mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-900 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 text-red-700 rounded-2xl p-3 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions — show only before first user message */}
            {messages.length === 1 && (
              <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSend(s.prompt)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-blue-100 transition flex-shrink-0"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
