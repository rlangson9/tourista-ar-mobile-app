import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Image, Video, Paperclip } from 'lucide-react';
import { Message } from '../data/mockData';
import type { Screen } from '../App';

interface MessageScreenProps {
  onNavigate: (screen: Screen) => void;
  partnerId?: string;
  partnerName?: string;
  previousScreen?: Screen;
  productId?: string;
  tourId?: string;
}

// Mock messages for demonstration
const mockMessages: { [key: string]: Array<{
  id: string;
  sender: 'user' | 'partner';
  text: string;
  timestamp: string;
  media?: string;
}> } = {
  'p1': [
    { id: '1', sender: 'partner', text: 'Hello! Welcome to China Elite Tours. How can I help you today?', timestamp: '10:00 AM' },
    { id: '2', sender: 'user', text: 'Hi! Im interested in your Beijing Business & Culture Tour. Can you tell me more about the itinerary?', timestamp: '10:05 AM' },
    { id: '3', sender: 'partner', text: 'Absolutely! The Beijing Business & Culture Tour includes 7 days of business meetings, cultural experiences, and sightseeing. Would you like a detailed itinerary?', timestamp: '10:10 AM' },
    { id: '4', sender: 'partner', text: 'Heres a photo of the Great Wall section we visit:', timestamp: '10:12 AM' },
    { id: '5', sender: 'partner', media: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', timestamp: '10:13 AM' },
  ],
};

export function MessageScreen({ onNavigate, partnerId = 'p1', partnerName = 'China Elite Tours', previousScreen = 'tour-details', productId, tourId }: MessageScreenProps) {
  const [messages, setMessages] = useState(mockMessages[partnerId] || []);
  const [inputText, setInputText] = useState('');
  const [showMediaOptions, setShowMediaOptions] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    const messagesEnd = document.getElementById('messages-end');
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate partner response
      setTimeout(() => {
        const partnerResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'partner',
          text: 'Thank you for your message. Well get back to you shortly!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, partnerResponse]);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <button 
          onClick={() => onNavigate(previousScreen, previousScreen === 'trade-product-detail' ? productId : tourId)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {partnerName.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold">{partnerName}</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>
                <div className="p-3 rounded-lg">
                  {message.text && (
                    <p className={`${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.text}
                    </p>
                  )}
                  {message.media && (
                    <div className="mt-2 rounded-md overflow-hidden">
                      <img 
                        src={message.media} 
                        alt="Shared media" 
                        className="w-full h-auto rounded"
                      />
                    </div>
                  )}
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div id="messages-end" />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowMediaOptions(!showMediaOptions)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Media Options */}
        {showMediaOptions && (
          <div className="mt-3 flex gap-4">
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Image className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Photo</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Video className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Video</span>
            </button>
          </div>
        )}
        
        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Note: You cannot send contact details or media. Tour operators can share media without contact information.
        </p>
      </div>
    </div>
  );
}
