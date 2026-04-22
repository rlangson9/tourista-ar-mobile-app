import { useState, useRef } from 'react';
import {
  LayoutDashboard,
  Package,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  TrendingUp,
  Shield,
  Plus,
  Eye,
  Edit,
  CreditCard,
  Building2,
  Users,
  Clock,
  Smartphone,
  Check,
  Truck,
  Globe,
  Zap,
  Lock,
  PackageCheck,
  Brain,
  BarChart2,
  Send,
  Target,
  Award,
  Activity,
  Calendar,
  AlertTriangle,
  Save,
  X,
  Trash2,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Search,
  Image,
  MapPin,
  Mic,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Screen } from '../App';

import { AdCreationForm, AdFormData } from './AdCreationForm';
import { WithdrawalManager } from './WithdrawalManager';
import { AutomatedRFQProcessor } from './AutomatedRFQProcessor';
import { AIResponseGenerator } from './AIResponseGenerator';
import { RFQTrackingDashboard } from './RFQTrackingDashboard';

interface SupplierDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function SupplierDashboard({ onNavigate }: SupplierDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inventory' | 'rfqs' | 'rfq-automation' | 'orders' | 'revenue' | 'payments' | 'advertisements' | 'analytics' | 'listing-automation' | 'messages' | 'settings'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              AR
            </div>
            <div>
              <h1 className="text-xl font-bold">Tourista AR</h1>
              <p className="text-xs text-gray-500">Supplier Portal</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Supplier</p>
            <p className="font-bold text-gray-900">Guangzhou Precision Mfg</p>
            <div className="flex items-center gap-1 mt-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-green-700">Verified</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          <NavItem
            icon={LayoutDashboard}
            label="Overview"
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <NavItem
            icon={Package}
            label="Products"
            isActive={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
          />
          <NavItem
            icon={PackageCheck}
            label="Inventory"
            isActive={activeTab === 'inventory'}
            onClick={() => setActiveTab('inventory')}
          />
          <NavItem
            icon={FileText}
            label="RFQs"
            isActive={activeTab === 'rfqs'}
            onClick={() => setActiveTab('rfqs')}
            badge="5"
          />
          <NavItem
            icon={Brain}
            label="RFQ Automation"
            isActive={activeTab === 'rfq-automation'}
            onClick={() => setActiveTab('rfq-automation')}
          />
          <NavItem
            icon={Package}
            label="Orders"
            isActive={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          />
          <NavItem
            icon={DollarSign}
            label="Revenue"
            isActive={activeTab === 'revenue'}
            onClick={() => setActiveTab('revenue')}
          />
          <NavItem
            icon={CreditCard}
            label="Payments"
            isActive={activeTab === 'payments'}
            onClick={() => setActiveTab('payments')}
          />
          <NavItem
            icon={TrendingUp}
            label="Advertisements"
            isActive={activeTab === 'advertisements'}
            onClick={() => setActiveTab('advertisements')}
          />
          <NavItem
            icon={BarChart2}
            label="Analytics"
            isActive={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          />
          <NavItem
            icon={Zap}
            label="Listing Automation"
            isActive={activeTab === 'listing-automation'}
            onClick={() => setActiveTab('listing-automation')}
          />
          <NavItem
            icon={MessageSquare}
            label="Messages"
            isActive={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
            badge="2"
          />
          <NavItem
            icon={Settings}
            label="Settings"
            isActive={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'inventory' && <InventoryTab />}
        {activeTab === 'rfqs' && <RFQsTab />}
        {activeTab === 'rfq-automation' && <AutomationTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'revenue' && <RevenueTab />}
        {activeTab === 'payments' && <PaymentsTab />}
        {activeTab === 'advertisements' && <AdvertisementsTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'listing-automation' && <ListingAutomationTab />}
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, isActive, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left font-medium">{label}</span>
      {badge && (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            isActive ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function MessagesTab() {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  // File input refs
  const photoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conversations = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Global Trade Inc.',
      message: "Hello, I'm interested in your CNC machines",
      time: '10:30 AM',
      unread: true,
      avatar: 'JS',
      messages: [
        {
          id: 1,
          sender: 'John Smith',
          content: "Hello, I'm interested in your CNC machines. Could you provide more information about the specifications and pricing?",
          time: '10:30 AM',
          isSelf: false
        },
        {
          id: 2,
          sender: 'You',
          content: "Hi John, thanks for your interest! We offer a range of CNC machines with different specifications. Could you tell me more about your specific needs and production requirements?",
          time: '10:35 AM',
          isSelf: true
        },
        {
          id: 3,
          sender: 'John Smith',
          content: "We need a 5-axis CNC milling machine for precision metal parts. Our budget is around $120K-150K, and we need it delivered to South Africa within 60 days.",
          time: '10:40 AM',
          isSelf: false
        }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Industrial Solutions Ltd.',
      message: "Thanks for the quote, let's discuss further",
      time: '9:15 AM',
      unread: true,
      avatar: 'SJ',
      messages: [
        {
          id: 1,
          sender: 'Sarah Johnson',
          content: "Thanks for the quote, let's discuss further details about the order.",
          time: '9:15 AM',
          isSelf: false
        },
        {
          id: 2,
          sender: 'You',
          content: "Hi Sarah, sure! What specific details would you like to discuss?",
          time: '9:20 AM',
          isSelf: true
        }
      ]
    },
    {
      id: 3,
      name: 'David Chen',
      company: 'Tech Innovations Co.',
      message: 'I received the samples, they look great!',
      time: 'Yesterday',
      unread: false,
      avatar: 'DC',
      messages: [
        {
          id: 1,
          sender: 'David Chen',
          content: "I received the samples, they look great!",
          time: 'Yesterday',
          isSelf: false
        },
        {
          id: 2,
          sender: 'You',
          content: "Great to hear! Let me know if you have any questions about the product.",
          time: 'Yesterday',
          isSelf: true
        }
      ]
    },
    {
      id: 4,
      name: 'Maria Rodriguez',
      company: 'Manufacturing Partners',
      message: 'Could you provide more information about lead times?',
      time: '2 days ago',
      unread: false,
      avatar: 'MR',
      messages: [
        {
          id: 1,
          sender: 'Maria Rodriguez',
          content: "Could you provide more information about lead times for your products?",
          time: '2 days ago',
          isSelf: false
        },
        {
          id: 2,
          sender: 'You',
          content: "Hi Maria, our standard lead time is 3-4 weeks, but it can vary depending on the product and quantity.",
          time: '2 days ago',
          isSelf: true
        }
      ]
    }
  ];

  const activeConv = conversations.find(conv => conv.id === activeConversation);

  const handleSendMessage = () => {
    if (messages.trim()) {
      const newMessage = {
        id: activeConv?.messages.length ? activeConv.messages.length + 1 : 1,
        sender: 'You',
        content: messages,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true
      };
      
      // Update the conversation with the new message
      const updatedConversations = conversations.map(conv => {
        if (conv.id === activeConversation) {
          return {
            ...conv,
            messages: [...(conv.messages || []), newMessage],
            message: messages,
            time: newMessage.time
          };
        }
        return conv;
      });
      
      // Set the updated conversations (in a real app, you would send this to a server)
      // For now, we'll just update the local state
      setMessages('');
    }
  };

  return (
    <div className="h-full relative">
      <div className="flex h-full">
        {/* Left Side: Contact List */}
        <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id} 
                className={`p-4 flex items-center justify-between cursor-pointer transition ${conversation.unread ? 'bg-blue-50' : conversation.id === activeConversation ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-gray-600">{conversation.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm truncate">{conversation.name}</p>
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.message}</p>
                  </div>
                </div>
                {conversation.unread && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">1</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Chat Window */}
        <div className="flex-1 flex flex-col bg-white relative">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="font-semibold text-gray-600">{activeConv?.avatar}</span>
              </div>
              <div>
                <p className="font-semibold">{activeConv?.name}</p>
                <p className="text-xs text-gray-500">{activeConv?.company} • Online</p>
              </div>
            </div>
            <div className="flex gap-3 relative">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        View Contact Info
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Clear Chat History
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Mute Notifications
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Delete Chat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
            {activeConv?.messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isSelf ? 'justify-end' : ''}`}>
                {!msg.isSelf && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-xs text-gray-600">{activeConv.avatar}</span>
                  </div>
                )}
                <div className="max-w-[70%]">
                  <div className={`rounded-lg p-3 ${msg.isSelf ? 'bg-green-100' : 'bg-white border border-gray-200'}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${msg.isSelf ? 'text-right' : ''}`}>{msg.time}</p>
                </div>
                {msg.isSelf && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-xs text-white">AR</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2 items-center relative">
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowAttachments(!showAttachments)}
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                {showAttachments && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 grid grid-cols-4 gap-4">
                      <button 
                        className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => {
                          photoInputRef.current?.click();
                          setShowAttachments(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Image className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xs text-gray-700">Photos</span>
                      </button>
                      <button 
                        className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => {
                          fileInputRef.current?.click();
                          setShowAttachments(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-xs text-gray-700">Files</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-xs text-gray-700">Location</span>
                      </button>
                      <button 
                        className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => {
                          setIsRecording(!isRecording);
                          setShowAttachments(false);
                        }}
                      >
                        <div className={`w-10 h-10 ${isRecording ? 'bg-red-500' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                          <Mic className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-red-600'}`} />
                        </div>
                        <span className="text-xs text-gray-700">{isRecording ? 'Stop' : 'Voice'}</span>
                      </button>
                    </div>
                  </div>
                )}
                {/* Hidden file inputs */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={photoInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      // Handle photo uploads
                      console.log('Photos selected:', files);
                      // In a real app, you would upload these files and send them as messages
                    }
                  }}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      // Handle file uploads
                      console.log('Files selected:', files);
                      // In a real app, you would upload these files and send them as messages
                    }
                  }}
                />
              </div>
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>
                {showEmojiPicker && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4">
                      <h3 className="text-xs font-semibold text-gray-500 mb-3">Common Emojis</h3>
                      <div className="grid grid-cols-7 gap-2">
                        {['😊', '😂', '❤️', '👍', '🎉', '😢', '😡', '🤔', '🤣', '😍', '👌', '🔥', '✨', '🤗', '😎', '🙏', '🤩', '😇'].map((emoji) => (
                          <button 
                            key={emoji}
                            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
                            onClick={() => {
                              setMessages(messages + emoji);
                              setShowEmojiPicker(false);
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {/* Voice recording indicator */}
            {isRecording && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">Recording Voice Message</p>
                    <p className="text-xs text-red-600">Tap to stop</p>
                  </div>
                </div>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
                  onClick={() => setIsRecording(false)}
                >
                  Stop
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's your business overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <KPICard title="Total Products" value="42" change="+3 this month" icon={Package} />
        <KPICard title="Active RFQs" value="5" change="2 new today" icon={FileText} />
        <KPICard title="Total Orders" value="127" change="+8 this week" icon={TrendingUp} />
        <KPICard title="Revenue (YTD)" value="$284K" change="+22%" icon={DollarSign} />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Recent RFQs</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-sm">Industrial CNC Machine Request</p>
                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-semibold">
                    New
                  </span>
                </div>
                <p className="text-xs text-gray-500">Quantity: 5 units • Budget: $120K-150K</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Top Products</h3>
          <div className="space-y-3">
            {['CNC Milling Machine', 'Laser Cutting System', 'Industrial Robot Arm'].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{product}</p>
                  <p className="text-xs text-gray-500">{15 - i * 2} orders this month</p>
                </div>
                <p className="font-bold text-green-600">${(25 + i * 5)}K</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Industrial CNC Milling Machine',
      category: 'Machinery',
      priceRange: '$15K - $28K',
      moq: '1 unit',
      orders: '15 this month',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=200'
    },
    {
      id: '2',
      name: 'Laser Cutting System',
      category: 'Machinery',
      priceRange: '$12K - $22K',
      moq: '1 unit',
      orders: '12 this month',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1581092270740-e71555c51a1a?w=200'
    },
    {
      id: '3',
      name: 'Industrial Robot Arm',
      category: 'Machinery',
      priceRange: '$20K - $35K',
      moq: '1 unit',
      orders: '8 this month',
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1592833620752-3a9418a4532f?w=200'
    },
    {
      id: '4',
      name: '3D Printer',
      category: 'Technology',
      priceRange: '$5K - $15K',
      moq: '2 units',
      orders: '20 this month',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1587654170055-f75100d6b726?w=200'
    }
  ]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    // In a real app, this would open a modal with an edit form
    alert(`Editing product: ${product.name}`);
    // For demo purposes, we'll just toggle the status
    setProducts(prev => prev.map(p => 
      p.id === product.id 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const handleDelete = (productId: string) => {
    setShowDeleteConfirm(productId);
  };

  const confirmDelete = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setShowDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-500">Manage your product listings</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-6 hover:shadow-md transition">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Price Range</p>
                  <p className="font-bold text-blue-600">{product.priceRange}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">MOQ</p>
                  <p className="font-bold">{product.moq}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="font-bold">{product.orders}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-1"
                  onClick={() => handleEdit(product)}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center gap-1"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={() => confirmDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryTab() {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: '1',
      productName: 'Industrial CNC Milling Machine',
      sku: 'CNC-1000',
      currentStock: 25,
      minStock: 10,
      status: 'in_stock',
      lastUpdated: '2024-01-20',
      location: 'Warehouse A'
    },
    {
      id: '2',
      productName: 'Laser Cutting System',
      sku: 'LASER-2000',
      currentStock: 8,
      minStock: 10,
      status: 'low_stock',
      lastUpdated: '2024-01-19',
      location: 'Warehouse B'
    },
    {
      id: '3',
      productName: 'Industrial Robot Arm',
      sku: 'ROBOT-3000',
      currentStock: 0,
      minStock: 5,
      status: 'out_of_stock',
      lastUpdated: '2024-01-18',
      location: 'Warehouse A'
    },
    {
      id: '4',
      productName: '3D Printer',
      sku: '3D-4000',
      currentStock: 15,
      minStock: 8,
      status: 'in_stock',
      lastUpdated: '2024-01-21',
      location: 'Warehouse C'
    },
    {
      id: '5',
      productName: 'Packaging Machine',
      sku: 'PACK-5000',
      currentStock: 3,
      minStock: 5,
      status: 'low_stock',
      lastUpdated: '2024-01-17',
      location: 'Warehouse B'
    }
  ]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    // In a real app, this would open a modal with an edit form
    alert(`Editing inventory item: ${item.productName}`);
    // For demo purposes, we'll just update the stock level
    setInventoryItems(prev => prev.map(i => 
      i.id === item.id 
        ? { ...i, currentStock: i.currentStock + 5, lastUpdated: new Date().toISOString().split('T')[0] }
        : i
    ));
  };

  const handleDelete = (itemId: string) => {
    setShowDeleteConfirm(itemId);
  };

  const confirmDelete = (itemId: string) => {
    setInventoryItems(prev => prev.filter(i => i.id !== itemId));
    setShowDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'text-green-600 bg-green-50';
      case 'low_stock': return 'text-amber-600 bg-amber-50';
      case 'out_of_stock': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_stock': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return status;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-500">Track and manage your stock levels</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Inventory Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 bg-gray-50">
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4">Min Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4">Location</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-semibold">{item.productName}</p>
                </td>
                <td className="p-4 font-mono text-sm">{item.sku}</td>
                <td className="p-4 font-semibold">{item.currentStock}</td>
                <td className="p-4">{item.minStock}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </td>
                <td className="p-4">{item.location}</td>
                <td className="p-4 text-sm text-gray-500">{item.lastUpdated}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button 
                      className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm flex items-center gap-1"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      className="px-3 py-1 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm flex items-center gap-1"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Inventory Summary</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">In Stock</p>
            <p className="text-2xl font-bold text-green-600">{inventoryItems.filter(item => item.status === 'in_stock').length}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-amber-600">{inventoryItems.filter(item => item.status === 'low_stock').length}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600">{inventoryItems.filter(item => item.status === 'out_of_stock').length}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Total Items</p>
            <p className="text-2xl font-bold text-blue-600">{inventoryItems.length}</p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this inventory item? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={() => confirmDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RFQsTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RFQ Management</h1>
        <p className="text-gray-500">Review and respond to sourcing requests</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">Industrial Machinery Sourcing</h3>
                <p className="text-sm text-gray-500">RFQ ID: RFQ-2024{i.toString().padStart(4, '0')}</p>
              </div>
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                Pending
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="font-semibold">{5 + i} units</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Budget Range</p>
                <p className="font-semibold">${100 + i * 20}K-${150 + i * 25}K</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="font-semibold">South Africa</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Timeline</p>
                <p className="font-semibold">30-60 days</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Looking for high-precision CNC milling machines for industrial metal processing...
            </p>
            <div className="flex gap-3">
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                View Details
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Send Quotation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationTab() {
  const [activeSection, setActiveSection] = useState<'processor' | 'response' | 'tracking'>('processor');

  // Mock RFQ for AI response generator
  const mockRFQ = {
    id: 'RFQ-20240001',
    productDescription: 'Looking for high-precision CNC milling machines for industrial metal processing. Need machines with at least 5-axis capability and precision of 0.001mm.',
    category: 'machinery',
    quantity: '5 units',
    budgetMin: '100000',
    budgetMax: '150000',
    destination: 'South Africa',
    deliveryTimeline: 'standard',
    status: 'pending',
    classification: 'Machinery',
    priority: 'medium'
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RFQ Automation</h1>
        <p className="text-gray-500">Streamline your sourcing request process with AI-powered automation</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {[
          { id: 'processor', label: 'Automated Processor', icon: Brain },
          { id: 'response', label: 'AI Response Generator', icon: Send },
          { id: 'tracking', label: 'Tracking Dashboard', icon: BarChart2 }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition border-b-2 ${activeSection === section.id ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeSection === 'processor' && (
        <AutomatedRFQProcessor onNavigate={() => {}} />
      )}

      {activeSection === 'response' && (
        <AIResponseGenerator 
          rfq={mockRFQ} 
          onResponseGenerated={(response) => console.log('Generated response:', response)} 
        />
      )}

      {activeSection === 'tracking' && (
        <RFQTrackingDashboard onNavigate={() => {}} />
      )}
    </div>
  );
}

function OrdersTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-500">Track and manage all orders</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 bg-gray-50">
              <th className="p-4">Order ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">TO-24{(i + 1).toString().padStart(2, '0')}</td>
                <td className="p-4">
                  <p className="font-semibold">CNC Machine</p>
                  <p className="text-xs text-gray-500">Model XYZ-100</p>
                </td>
                <td className="p-4">Customer {i + 1}</td>
                <td className="p-4">{2 + i} units</td>
                <td className="p-4 font-bold">${(45 + i * 5)}K</td>
                <td className="p-4">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Shipping
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:underline text-sm font-semibold">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevenueTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
        <p className="text-gray-500">Track your earnings and performance</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$284,200</p>
          <p className="text-sm text-green-600">+22% from last year</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Platform Fee (10%)</h3>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$28,420</p>
          <p className="text-sm text-gray-500">Commission</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Net Earnings</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$255,780</p>
          <p className="text-sm text-purple-600">Available</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Monthly Performance</h3>
        <div className="h-64 flex items-end justify-around gap-3">
          {[45, 52, 48, 65, 58, 72, 68, 85, 78, 90, 82, 92].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.05 }}
                className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg"
              />
              <span className="text-xs text-gray-500">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsTab() {
  const [activePaymentSection, setActivePaymentSection] = useState<'overview' | 'withdrawal' | 'methods' | 'invoices'>('overview');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments & Withdrawals</h1>
        <p className="text-gray-500">Manage your earnings and withdrawal requests</p>
      </div>

      {/* Payment Section Navigation */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'withdrawal', label: 'Withdrawals', icon: DollarSign },
          { id: 'methods', label: 'Payment Methods', icon: CreditCard },
          { id: 'invoices', label: 'Invoices', icon: FileText }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActivePaymentSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition border-b-2 ${
              activePaymentSection === section.id
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activePaymentSection === 'overview' && (
        <div className="space-y-6">
          {/* Commission Structure Banner */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-blue-600">ℹ️</span>
              Transaction Commission Structure
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Tourism Bookings</h4>
                <p className="text-sm text-gray-600 mb-2">10% commission per confirmed booking</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Commission deducted before payout</li>
                  <li>• Refund policy follows partner agreement</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Trade Transactions</h4>
                <p className="text-sm text-gray-600 mb-2">10% of total consignment value</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Paid after successful deal completion</li>
                  <li>• Transparent notice shown to buyers</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-blue-700 bg-blue-50 p-3 rounded-lg">
              💡 All transactions are subject to the standard 10% commission. Upgrade to a subscription plan for enhanced visibility and lower effective costs through increased sales volume.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm">Available Balance</h3>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">$18,750</p>
              <p className="text-sm text-gray-500">Ready for withdrawal</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm">Pending Balance</h3>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">$4,800</p>
              <p className="text-sm text-gray-500">Processing transactions</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm">Total Earnings</h3>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-2">$67,320</p>
              <p className="text-sm text-gray-500">All time earnings</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => setActivePaymentSection('withdrawal')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition"
            >
              <DollarSign className="w-5 h-5" />
              Request Withdrawal
            </button>
            <button
              onClick={() => setActivePaymentSection('methods')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition"
            >
              <CreditCard className="w-5 h-5" />
              Manage Payment Methods
            </button>
          </div>

          {/* Subscription Plans */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Plans</h2>
            <p className="text-gray-600 mb-6">Boost your visibility and get priority placement</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Free Tier */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Free</h3>
                  <p className="text-sm text-gray-500">Basic listing</p>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900">$0</p>
                  <p className="text-sm text-gray-500">per month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Standard product listing</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Basic search visibility</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">10% transaction commission</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400 mt-0.5">✗</span>
                    <span className="text-gray-400">Sponsored placement</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400 mt-0.5">✗</span>
                    <span className="text-gray-400">AI recommendation boost</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400 mt-0.5">✗</span>
                    <span className="text-gray-400">Advanced analytics</span>
                  </li>
                </ul>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">
                  Current Plan
                </button>
              </div>

              {/* Pro Tier */}
              <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 relative hover:shadow-xl transition">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  RECOMMENDED
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Pro</h3>
                  <p className="text-sm text-gray-500">Enhanced visibility</p>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-blue-600">$499</p>
                  <p className="text-sm text-gray-500">per month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">All Free features</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700"><strong>Sponsored section placement</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Priority in search results</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">AI recommendation boost</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Reduced commission (8%)</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                  Upgrade to Pro
                </button>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Enterprise</h3>
                  <p className="text-sm text-gray-500">Maximum exposure</p>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900">$1499</p>
                  <p className="text-sm text-gray-500">per month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">All Pro features</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700"><strong>Featured homepage placement</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Custom marketing campaigns</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">API access</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Lowest commission (5%)</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Section */}
      {activePaymentSection === 'withdrawal' && (
        <WithdrawalManager 
          availableBalance={18750}
          pendingBalance={4800}
          userType="supplier"
        />
      )}

      {/* Payment Methods Section */}
      {activePaymentSection === 'methods' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              Add Method
            </button>
          </div>

          <div className="space-y-4">
            {/* Bank Transfer */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold">Industrial & Commercial Bank</p>
                    <p className="text-sm text-gray-500">****5678</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Account Name</p>
                  <p className="font-semibold">Guangzhou Precision Mfg</p>
                </div>
                <div>
                  <p className="text-gray-500">SWIFT Code</p>
                  <p className="font-semibold">ICBKCNBJ</p>
                </div>
              </div>
            </div>

            {/* Alipay */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">Alipay</p>
                    <p className="text-sm text-gray-500">****8901</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
              </div>
            </div>

            {/* WeChat Pay */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">WeChat Pay</p>
                    <p className="text-sm text-gray-500">****1234</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
              </div>
            </div>

            {/* International Transfer */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold">SWIFT Transfer</p>
                    <p className="text-sm text-gray-500">International payments</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">SWIFT Code</p>
                  <p className="font-semibold">ICBKCNBJ</p>
                </div>
                <div>
                  <p className="text-gray-500">IBAN</p>
                  <p className="font-semibold">CN****1234</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Section */}
      {activePaymentSection === 'invoices' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Subscription Invoices</h2>
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No subscription invoices yet</p>
            <p className="text-sm">Upgrade to a paid plan to start receiving invoices</p>
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({ title, value, change, icon: Icon }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-sm text-green-600">{change}</p>
    </div>
  );
}

function AdvertisementsTab() {
  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'Premium Hotel Supplies Package',
      status: 'approved',
      submittedDate: '2024-01-15',
      approvedDate: '2024-01-17',
      impressions: 12450,
      clicks: 723,
      conversions: 34,
      cost: 2100,
      revenue: 3400,
      roi: 61.9
    },
    {
      id: '2',
      title: 'Restaurant Equipment Bundle',
      status: 'under_review',
      submittedDate: '2024-01-20',
      approvedDate: null,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: 0,
      revenue: 0,
      roi: 0
    },
    {
      id: '3',
      title: 'Tour Guide Accessories Kit',
      status: 'rejected',
      submittedDate: '2024-01-10',
      approvedDate: null,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: 0,
      revenue: 0,
      roi: 0,
      rejectionReason: 'Product images do not meet quality standards'
    },
    {
      id: '4',
      title: 'Transportation Management System',
      status: 'approved',
      submittedDate: '2024-01-05',
      approvedDate: '2024-01-07',
      impressions: 18930,
      clicks: 1156,
      conversions: 69,
      cost: 3200,
      revenue: 6900,
      roi: 115.6
    }
  ]);
  const [showAdCreationForm, setShowAdCreationForm] = useState(false);

  const handleCreateAd = (adData: AdFormData) => {
    // Create new ad submission
    const newAd = {
      id: `AD-${Date.now()}`,
      title: adData.title,
      status: 'under_review' as const,
      submittedDate: new Date().toISOString().split('T')[0],
      approvedDate: null,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: adData.budget,
      revenue: 0,
      roi: 0
    };
    
    setAds(prev => [newAd, ...prev]);
    setShowAdCreationForm(false);
    
    // In a real app, this would send the ad to admin for review
    console.log('Ad submitted for review:', adData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'under_review': return 'text-amber-600 bg-amber-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'under_review': return 'Under Review';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const totalAds = ads.length;
  const approvedAds = ads.filter(ad => ad.status === 'approved').length;
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const totalConversions = ads.reduce((sum, ad) => sum + ad.conversions, 0);
  const totalRevenue = ads.reduce((sum, ad) => sum + ad.revenue, 0);
  const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : '0.00';

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertisement Campaigns</h1>
            <p className="text-gray-500">Track the performance and status of your sponsored ads</p>
          </div>
          <button
            onClick={() => setShowAdCreationForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Create New Ad
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Total Campaigns</p>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalAds}</p>
          <p className="text-sm text-gray-500 mt-1">{approvedAds} approved</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Total Impressions</p>
            <Eye className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalImpressions.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Lifetime views</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">New Clients</p>
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalConversions}</p>
          <p className="text-sm text-gray-500 mt-1">From ads</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Revenue Generated</p>
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Avg CTR: {avgCTR}%</p>
        </div>
      </div>

      {/* Ads Table */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Clients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{ad.title}</p>
                      <p className="text-sm text-gray-500">ID: {ad.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ad.status)}`}>
                      {getStatusText(ad.status)}
                    </span>
                    {ad.rejectionReason && (
                      <p className="text-xs text-red-600 mt-1">{ad.rejectionReason}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(ad.submittedDate).toLocaleDateString()}
                    {ad.approvedDate && (
                      <p className="text-xs text-green-600 mt-1">
                        Approved: {new Date(ad.approvedDate).toLocaleDateString()}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ad.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ad.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ad.conversions}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${ad.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`font-medium ${ad.roi > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {ad.roi > 0 ? `${ad.roi}%` : '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ad Creation Form Modal */}
      {showAdCreationForm && (
        <AdCreationForm
          onClose={() => setShowAdCreationForm(false)}
          onSubmit={handleCreateAd}
          userType="supplier"
        />
      )}
    </div>
  );
}

function SettingsTab() {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    companyName: 'Guangzhou Precision Mfg',
    contactPerson: 'Li Wei',
    email: 'contact@guangzhouprecision.com',
    phone: '+86 20 8888 8888',
    website: 'www.guangzhouprecision.com',
    description: 'Manufacturer of precision industrial machinery and equipment',
    address: '123 Industrial Avenue, Guangzhou, China',
    taxId: '9876543210',
    businessLicense: 'Uploaded',
    exportLicense: 'Uploaded',
    establishedYear: '2010',
    companySize: '50-100',
    industry: 'Manufacturing',
    certifications: ['ISO 9001', 'CE Certified'],
    productionCapacity: '1000 units/month',
    leadTime: '30-45 days',
    paymentTerms: 'T/T, L/C',
    shippingPorts: 'Guangzhou, Shenzhen, Shanghai'
  });
  const [notifications, setNotifications] = useState({
    rfqAlerts: true,
    orderNotifications: true,
    paymentNotifications: true,
    promotionalEmails: false,
    systemUpdates: true,
    lowStockAlerts: true,
    competitorUpdates: false,
    marketInsights: true
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    changePassword: false,
    loginAlerts: true,
    sessionTimeout: '24h',
    apiAccess: false
  });
  const [productSettings, setProductSettings] = useState({
    autoAcceptOrders: false,
    requireDeposit: true,
    sendReminders: true,
    allowReviews: true,
    enableChat: true,
    autoTranslate: true,
    bulkPricing: false,
    minimumOrderQuantity: '1'
  });
  const [integrationSettings, setIntegrationSettings] = useState({
    erpIntegration: false,
    inventorySync: false,
    accountingSoftware: 'None',
    crmIntegration: false,
    webhookUrl: '',
    apiKeys: []
  });
  const [shippingSettings, setShippingSettings] = useState({
    freeShipping: false,
    freeShippingThreshold: '1000',
    shippingRegions: ['Global', 'Asia', 'Africa', 'Europe'],
    defaultShippingMethod: 'Sea Freight',
    expressShipping: true,
    trackingIntegration: true
  });

  const sections = [
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: MessageSquare },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'product-settings', label: 'Product Settings', icon: Package },
    { id: 'shipping', label: 'Shipping & Logistics', icon: Package },
    { id: 'integrations', label: 'Integrations', icon: Settings }
  ];

  const handleProfileChange = (key: string, value: string | string[]) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: string, value: boolean | string) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  const handleProductSettingsChange = (key: string, value: boolean | string) => {
    setProductSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleIntegrationChange = (key: string, value: boolean | string) => {
    setIntegrationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleShippingChange = (key: string, value: boolean | string | string[]) => {
    setShippingSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500">Manage your company profile and account preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-2xl shadow-sm p-4">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeSection === section.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <section.icon className="w-5 h-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Company Profile</h2>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={profile.companyName}
                        onChange={(e) => handleProfileChange('companyName', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                      <input
                        type="text"
                        value={profile.contactPerson}
                        onChange={(e) => handleProfileChange('contactPerson', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => handleProfileChange('website', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                      <select
                        value={profile.industry}
                        onChange={(e) => handleProfileChange('industry', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Technology">Technology</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Construction">Construction</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4">Company Details</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Established Year</label>
                      <input
                        type="text"
                        value={profile.establishedYear}
                        onChange={(e) => handleProfileChange('establishedYear', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                      <select
                        value={profile.companySize}
                        onChange={(e) => handleProfileChange('companySize', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="50-100">50-100 employees</option>
                        <option value="101-500">101-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Description</label>
                    <textarea
                      value={profile.description}
                      onChange={(e) => handleProfileChange('description', e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleProfileChange('address', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Business Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tax ID</label>
                      <input
                        type="text"
                        value={profile.taxId}
                        onChange={(e) => handleProfileChange('taxId', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Production Capacity</label>
                      <input
                        type="text"
                        value={profile.productionCapacity}
                        onChange={(e) => handleProfileChange('productionCapacity', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Time</label>
                      <input
                        type="text"
                        value={profile.leadTime}
                        onChange={(e) => handleProfileChange('leadTime', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Terms</label>
                      <input
                        type="text"
                        value={profile.paymentTerms}
                        onChange={(e) => handleProfileChange('paymentTerms', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Ports</label>
                    <input
                      type="text"
                      value={profile.shippingPorts}
                      onChange={(e) => handleProfileChange('shippingPorts', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Certifications */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{cert}</span>
                        <button className="ml-auto text-red-600 text-sm font-semibold hover:underline">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition text-center">
                      <p className="font-semibold text-gray-700">Add Certification</p>
                      <p className="text-sm text-gray-500">ISO, CE, FCC, etc.</p>
                    </button>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Legal Documents</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business License</label>
                      <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{profile.businessLicense}</span>
                        <button className="ml-auto text-blue-600 text-sm font-semibold hover:underline">
                          Replace
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Export License</label>
                      <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{profile.exportLicense}</span>
                        <button className="ml-auto text-blue-600 text-sm font-semibold hover:underline">
                          Replace
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">RFQ Alerts</label>
                    <p className="text-sm text-gray-500">Receive notifications for new RFQs</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.rfqAlerts}
                      onChange={(e) => handleNotificationChange('rfqAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Order Notifications</label>
                    <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.orderNotifications}
                      onChange={(e) => handleNotificationChange('orderNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Payment Notifications</label>
                    <p className="text-sm text-gray-500">Receive notifications for payment status updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.paymentNotifications}
                      onChange={(e) => handleNotificationChange('paymentNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Promotional Emails</label>
                    <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.promotionalEmails}
                      onChange={(e) => handleNotificationChange('promotionalEmails', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">System Updates</label>
                    <p className="text-sm text-gray-500">Receive platform updates and announcements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.systemUpdates}
                      onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Two-Factor Authentication</label>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactorAuth}
                      onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'product-settings' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Product Management Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto-Accept Orders</label>
                    <p className="text-sm text-gray-500">Automatically accept new orders without manual approval</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productSettings.autoAcceptOrders}
                      onChange={(e) => handleProductSettingsChange('autoAcceptOrders', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Deposit</label>
                    <p className="text-sm text-gray-500">Require a deposit for all orders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productSettings.requireDeposit}
                      onChange={(e) => handleProductSettingsChange('requireDeposit', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Send Reminders</label>
                    <p className="text-sm text-gray-500">Automatically send order reminders to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productSettings.sendReminders}
                      onChange={(e) => handleProductSettingsChange('sendReminders', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Allow Reviews</label>
                    <p className="text-sm text-gray-500">Allow customers to leave reviews for your products</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productSettings.allowReviews}
                      onChange={(e) => handleProductSettingsChange('allowReviews', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'shipping' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Shipping & Logistics Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Free Shipping</label>
                    <p className="text-sm text-gray-500">Offer free shipping on orders above threshold</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shippingSettings.freeShipping}
                      onChange={(e) => handleShippingChange('freeShipping', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {shippingSettings.freeShipping && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Free Shipping Threshold ($)</label>
                    <input
                      type="text"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) => handleShippingChange('freeShippingThreshold', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Regions</label>
                  <div className="space-y-2">
                    {['Global', 'Asia', 'Africa', 'Europe', 'Americas', 'Oceania'].map((region) => (
                      <label key={region} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={shippingSettings.shippingRegions.includes(region)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleShippingChange('shippingRegions', [...shippingSettings.shippingRegions, region]);
                            } else {
                              handleShippingChange('shippingRegions', shippingSettings.shippingRegions.filter(r => r !== region));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-900">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Default Shipping Method</label>
                  <select
                    value={shippingSettings.defaultShippingMethod}
                    onChange={(e) => handleShippingChange('defaultShippingMethod', e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Sea Freight">Sea Freight</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Land Transport">Land Transport</option>
                    <option value="Express Courier">Express Courier</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Express Shipping</label>
                    <p className="text-sm text-gray-500">Offer express shipping options</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shippingSettings.expressShipping}
                      onChange={(e) => handleShippingChange('expressShipping', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Tracking Integration</label>
                    <p className="text-sm text-gray-500">Enable real-time tracking integration</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shippingSettings.trackingIntegration}
                      onChange={(e) => handleShippingChange('trackingIntegration', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Integration Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">ERP Integration</label>
                    <p className="text-sm text-gray-500">Connect with your ERP system</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integrationSettings.erpIntegration}
                      onChange={(e) => handleIntegrationChange('erpIntegration', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Inventory Sync</label>
                    <p className="text-sm text-gray-500">Sync inventory levels automatically</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integrationSettings.inventorySync}
                      onChange={(e) => handleIntegrationChange('inventorySync', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Accounting Software</label>
                  <select
                    value={integrationSettings.accountingSoftware}
                    onChange={(e) => handleIntegrationChange('accountingSoftware', e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="None">None</option>
                    <option value="QuickBooks">QuickBooks</option>
                    <option value="Xero">Xero</option>
                    <option value="SAP">SAP</option>
                    <option value="Oracle">Oracle</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">CRM Integration</label>
                    <p className="text-sm text-gray-500">Connect with your CRM system</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integrationSettings.crmIntegration}
                      onChange={(e) => handleIntegrationChange('crmIntegration', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Webhook URL</label>
                  <input
                    type="url"
                    value={integrationSettings.webhookUrl}
                    onChange={(e) => handleIntegrationChange('webhookUrl', e.target.value)}
                    placeholder="https://your-webhook-url.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">Receive real-time notifications via webhooks</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">API Keys</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Production API Key</p>
                        <p className="text-sm text-gray-500">sk_live_...****</p>
                      </div>
                      <button className="text-blue-600 text-sm font-semibold hover:underline">
                        Regenerate
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Test API Key</p>
                        <p className="text-sm text-gray-500">sk_test_...****</p>
                      </div>
                      <button className="text-blue-600 text-sm font-semibold hover:underline">
                        Regenerate
                      </button>
                    </div>
                  </div>
                  <button className="mt-4 text-blue-600 text-sm font-semibold hover:underline">
                    + Generate New API Key
                  </button>
                </div>
                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const [analyticsTab, setAnalyticsTab] = useState<'demand' | 'customer' | 'competitor' | 'revenue'>('demand');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
        <p className="text-gray-500">Unlock powerful insights for your business</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {[
          { id: 'demand', label: 'Demand Forecasting', icon: Target },
          { id: 'customer', label: 'Customer Behavior', icon: Users },
          { id: 'competitor', label: 'Competitor Benchmarking', icon: Award },
          { id: 'revenue', label: 'Revenue Trends', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAnalyticsTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition border-b-2 ${
              analyticsTab === tab.id
                ? 'text-green-600 border-green-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {analyticsTab === 'demand' && <DemandForecasting />}
      {analyticsTab === 'customer' && <CustomerBehaviorAnalytics />}
      {analyticsTab === 'competitor' && <CompetitorBenchmarking />}
      {analyticsTab === 'revenue' && <RevenueTrendReports />}
    </div>
  );
}

function DemandForecasting() {
  const products = [
    { name: 'CNC Milling Machine', current: 15, predicted: 22, trend: 'up' },
    { name: 'Laser Cutting System', current: 12, predicted: 14, trend: 'up' },
    { name: 'Industrial Robot Arm', current: 8, predicted: 6, trend: 'down' },
    { name: '3D Printer Pro', current: 10, predicted: 13, trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Overall Demand Forecast</h3>
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">+31.2%</p>
          <p className="text-sm text-green-600">Next 30 days</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Peak Demand Period</h3>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">Q4 2025</p>
          <p className="text-sm text-gray-500">Holiday season surge</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Low Demand Period</h3>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">Jan-Feb</p>
          <p className="text-sm text-gray-500">Plan promotions</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Product Demand Forecast</h3>
        <div className="space-y-4">
          {products.map((product, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{product.name}</span>
                <span className={`text-sm font-semibold ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {product.trend === 'up' ? '↑' : '↓'} {Math.round(Math.abs((product.predicted - product.current) / product.current * 100))}%
                </span>
              </div>
              <div className="flex gap-2 h-8">
                <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-green-600 transition-all"
                    style={{ width: `${(product.current / 30) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 transition-all"
                    style={{ width: `${(product.predicted / 30) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Current: {product.current}</span>
                <span>Predicted: {product.predicted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomerBehaviorAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Avg. Order Value</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$45,200</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Repeat Customers</h3>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">42%</p>
          <p className="text-sm text-green-600">+7% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">RFQ Response Time</h3>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">4.2h</p>
          <p className="text-sm text-green-600">-15% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Conversion Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">12.8%</p>
          <p className="text-sm text-green-600">+3.2% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Popular Order Times</h3>
          <div className="space-y-3">
            {[
              { time: '9:00 AM - 12:00 PM', percentage: 40 },
              { time: '2:00 PM - 5:00 PM', percentage: 32 },
              { time: '7:00 PM - 10:00 PM', percentage: 18 },
              { time: 'Other times', percentage: 10 },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.time}</span>
                  <span className="font-semibold">{item.percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Product Category Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Machinery', value: 58 },
              { label: 'Electronics', value: 42 },
              { label: 'Textiles', value: 35 },
              { label: 'Raw Materials', value: 28 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-green-600">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full bg-green-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetitorBenchmarking() {
  const competitors = [
    { name: 'Shenzhen Industrial Co.', price: 22500, rating: 4.4, orders: 112, reviews: 215 },
    { name: 'Guangzhou Machinery Ltd', price: 19800, rating: 4.2, orders: 89, reviews: 168 },
    { name: 'Premium Manufacturing', price: 26500, rating: 4.8, orders: 134, reviews: 289 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Your Ranking</h3>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">#1</p>
          <p className="text-sm text-gray-500">In your category</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Price Position</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">Premium</p>
          <p className="text-sm text-green-600">Value-focused</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Market Share</h3>
            <BarChart2 className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">28%</p>
          <p className="text-sm text-green-600">+4% this quarter</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Competitor Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Competitor</th>
                <th className="pb-3">Price Range</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Orders</th>
                <th className="pb-3">Reviews</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b bg-green-50">
                <td className="py-4 font-semibold">Your Business (Guangzhou Precision)</td>
                <td className="py-4 font-bold text-green-600">$24,500</td>
                <td className="py-4">⭐ 4.9</td>
                <td className="py-4 font-semibold">145</td>
                <td className="py-4">324</td>
                <td className="py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">You</span>
                </td>
              </tr>
              {competitors.map((comp, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4 font-medium">{comp.name}</td>
                  <td className="py-4">${comp.price.toLocaleString()}</td>
                  <td className="py-4">⭐ {comp.rating}</td>
                  <td className="py-4">{comp.orders}</td>
                  <td className="py-4">{comp.reviews}</td>
                  <td className="py-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">Competitor</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Competitive Advantages</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">✓ Highest Rating</h4>
            <p className="text-sm text-green-700">Your 4.9 rating leads the market</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">✓ Most Orders</h4>
            <p className="text-sm text-green-700">Market leader in monthly volume</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <h4 className="font-semibold text-amber-800 mb-2">⚠ Price Optimization</h4>
            <p className="text-sm text-amber-700">Consider premium tier pricing</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">ℹ Growth Opportunity</h4>
            <p className="text-sm text-blue-700">Expand review collection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueTrendReports() {
  const monthlyData = [
    { month: 'Jan', revenue: 28500, orders: 18 },
    { month: 'Feb', revenue: 32400, orders: 22 },
    { month: 'Mar', revenue: 31800, orders: 20 },
    { month: 'Apr', revenue: 38500, orders: 26 },
    { month: 'May', revenue: 42200, orders: 29 },
    { month: 'Jun', revenue: 45800, orders: 32 },
    { month: 'Jul', revenue: 41200, orders: 28 },
    { month: 'Aug', revenue: 48500, orders: 34 },
    { month: 'Sep', revenue: 44800, orders: 31 },
    { month: 'Oct', revenue: 52500, orders: 38 },
    { month: 'Nov', revenue: 49200, orders: 35 },
    { month: 'Dec', revenue: 45500, orders: 32 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">YTD Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$500,900</p>
          <p className="text-sm text-green-600">+28.5% YoY</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Avg. Monthly</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$41,742</p>
          <p className="text-sm text-green-600">+18.3% vs last year</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Best Month</h3>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$52,500</p>
          <p className="text-sm text-gray-500">October 2025</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Projected Year</h3>
            <Target className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$565,000</p>
          <p className="text-sm text-green-600">On track to exceed</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Monthly Revenue Trend</h3>
        <div className="h-72 flex items-end justify-around gap-2">
          {monthlyData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-semibold text-gray-600">${(data.revenue / 1000).toFixed(0)}K</div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(data.revenue / 60000) * 100}%` }}
                transition={{ delay: i * 0.05 }}
                className="w-full bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-lg"
              />
              <div className="text-xs text-gray-500">{data.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Revenue by Product Category</h3>
          <div className="space-y-4">
            {[
              { category: 'Machinery', percentage: 52, color: 'from-green-600 to-emerald-400' },
              { category: 'Electronics', percentage: 28, color: 'from-purple-600 to-purple-400' },
              { category: 'Textiles', percentage: 12, color: 'from-blue-600 to-blue-400' },
              { category: 'Other', percentage: 8, color: 'from-gray-600 to-gray-400' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm font-bold">{item.percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: i * 0.1 }}
                    className={`h-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Quarterly Comparison</h3>
          <div className="space-y-4">
            {[
              { quarter: 'Q1 2025', revenue: 92700, growth: '+15%' },
              { quarter: 'Q2 2025', revenue: 126500, growth: '+22%' },
              { quarter: 'Q3 2025', revenue: 134500, growth: '+19%' },
              { quarter: 'Q4 2025 (Projected)', revenue: 147200, growth: '+25%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold">{item.quarter}</p>
                  <p className="text-2xl font-bold text-green-600">${(item.revenue / 1000).toFixed(1)}K</p>
                </div>
                <span className="text-green-600 font-semibold">{item.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingAutomationTab() {
  const [automationSection, setAutomationSection] = useState<'pricing' | 'expiration'>('pricing');
  
  const [peakSeasonRules, setPeakSeasonRules] = useState([
    { id: 1, name: 'Holiday Peak', startDate: '2026-11-01', endDate: '2026-12-31', surcharge: 12, products: ['CNC Milling Machine', 'Laser Cutting System'], active: true },
    { id: 2, name: 'Trade Show Season', startDate: '2026-04-01', endDate: '2026-05-15', surcharge: 8, products: ['All Products'], active: true },
  ]);
  
  const [expirationAlerts, setExpirationAlerts] = useState([
    { id: 1, productName: 'Industrial Robot Arm', daysRemaining: 5, status: 'critical' },
    { id: 2, productName: '3D Printer Pro', daysRemaining: 10, status: 'warning' },
    { id: 3, productName: 'Packaging Machine', daysRemaining: 45, status: 'info' },
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Listing Automation</h1>
        <p className="text-gray-500">Automate your product listing management</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {[
          { id: 'pricing', label: 'Dynamic Pricing', icon: DollarSign },
          { id: 'expiration', label: 'Expiration Alerts', icon: AlertTriangle },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setAutomationSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition border-b-2 ${
              automationSection === section.id
                ? 'text-green-600 border-green-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      {automationSection === 'pricing' && (
        <DynamicPricingRules 
          rules={peakSeasonRules} 
          setRules={setPeakSeasonRules} 
        />
      )}
      {automationSection === 'expiration' && (
        <ExpirationAlerts 
          alerts={expirationAlerts} 
          setAlerts={setExpirationAlerts} 
        />
      )}
    </div>
  );
}

function DynamicPricingRules({ rules, setRules }: { rules: any[], setRules: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    startDate: '',
    endDate: '',
    surcharge: 10,
    products: ['All Products'],
    active: true,
  });

  const handleAddRule = () => {
    if (newRule.name && newRule.startDate && newRule.endDate) {
      setRules([...rules, { ...newRule, id: Date.now() }]);
      setShowAddRule(false);
      setNewRule({
        name: '',
        startDate: '',
        endDate: '',
        surcharge: 10,
        products: ['All Products'],
        active: true,
      });
    }
  };

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Peak Season Surcharges</h2>
        <button
          onClick={() => setShowAddRule(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Rule
        </button>
      </div>

      {showAddRule && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">New Pricing Rule</h3>
            <button
              onClick={() => setShowAddRule(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rule Name</label>
              <input
                type="text"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Holiday Peak"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Surcharge (%)</label>
              <input
                type="number"
                value={newRule.surcharge}
                onChange={(e) => setNewRule({ ...newRule, surcharge: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={newRule.startDate}
                onChange={(e) => setNewRule({ ...newRule, startDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={newRule.endDate}
                onChange={(e) => setNewRule({ ...newRule, endDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowAddRule(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddRule}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Rule
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${rule.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <h3 className="font-bold text-lg">{rule.name}</h3>
                  <p className="text-sm text-gray-500">
                    {rule.startDate} to {rule.endDate} • +{rule.surcharge}% surcharge
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    rule.active 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rule.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>Applied to: {rule.products.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpirationAlerts({ alerts, setAlerts }: { alerts: any[], setAlerts: React.Dispatch<React.SetStateAction<any[]>> }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Expiring Soon';
      case 'warning': return 'Expiring';
      case 'info': return 'Upcoming';
      default: return 'Unknown';
    }
  };

  const renewListing = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, daysRemaining: 180, status: 'info' } : alert
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Critical Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold mb-2">{alerts.filter(a => a.status === 'critical').length}</p>
          <p className="text-sm text-red-600">Immediate action needed</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Warning Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">{alerts.filter(a => a.status === 'warning').length}</p>
          <p className="text-sm text-amber-600">Action recommended soon</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Total Listings</h3>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2">{alerts.length}</p>
          <p className="text-sm text-gray-500">Under expiration monitoring</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Expiration Alerts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Days Remaining</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {alerts.map((alert) => (
                <tr key={alert.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 font-medium">{alert.productName}</td>
                  <td className="py-4">
                    <span className={`font-bold ${
                      alert.status === 'critical' ? 'text-red-600' :
                      alert.status === 'warning' ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {alert.daysRemaining} days
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(alert.status)}`}>
                      {getStatusText(alert.status)}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:underline text-sm font-semibold">
                        Edit
                      </button>
                      <button
                        onClick={() => renewListing(alert.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                      >
                        Renew
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}