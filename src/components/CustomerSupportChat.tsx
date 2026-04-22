import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Smile, Paperclip, Phone, Info, Clock, User as UserIcon } from 'lucide-react';

interface CustomerSupportChatProps {
  onBack: () => void;
}

export function CustomerSupportChat({ onBack }: CustomerSupportChatProps) {
  const [messages, setMessages] = useState<{
    id: string;
    text: string;
    sender: 'user' | 'support';
    timestamp: string;
  }[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'support',
      timestamp: '10:00 AM',
    },
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(typingTimeout);
  }, [isTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate support response
      setIsTyping(true);
      setTimeout(() => {
        const supportResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. We will get back to you shortly!',
          sender: 'support' as const,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, supportResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">Customer Support</h1>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            24/7 Live Support
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <Phone className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* Support Info */}
      <div className="bg-blue-50 border-b border-blue-100 p-3 text-sm text-blue-800 flex items-center gap-2">
        <Info className="w-4 h-4" />
        <span>Our support team typically responds within a few minutes</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'} rounded-2xl p-3 shadow-sm`}
            >
              <p className="mb-1">{message.text}</p>
              <p className={`text-xs ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'} text-right`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3 flex items-center gap-2 shadow-sm">
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <Smile className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`p-2 rounded-full transition ${inputText.trim() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Support Agent Info */}
      <div className="bg-white border-t border-gray-200 p-3 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          CS
        </div>
        <div>
          <p className="font-semibold">Customer Support</p>
          <p className="text-xs text-gray-500">Online • Average response time: 2 mins</p>
        </div>
      </div>
    </div>
  );
}
