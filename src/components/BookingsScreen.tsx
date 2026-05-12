import { useState, useEffect } from 'react';
import { Calendar, Package, MapPin, Clock, DollarSign, Truck, FileText, Download, ChevronRight, Check, ArrowLeft, Plus, X, Briefcase, Sun, Factory, Globe, GraduationCap, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen, AppMode } from '../App';
import { mockTours, mockTradeOrders, mockCustomTourRequests, mockCustomTourProposals, type CustomTourRequest, type CustomTourProposal } from '../data/mockData';
import { BottomNav } from './BottomNav';
import { OrderDetailsModal } from './OrderDetailsModal';
import { DocumentsModal } from './DocumentsModal';
import { QuotationsModal } from './QuotationsModal';

interface BookingsScreenProps {
  onNavigate: (screen: Screen) => void;
  appMode: AppMode;
}

export function BookingsScreen({ onNavigate, appMode }: BookingsScreenProps) {
  const [activeTab, setActiveTab] = useState<'travel' | 'trade' | 'custom' | 'group'>(appMode === 'tourism' ? 'travel' : 'trade');
  const [travelTab, setTravelTab] = useState<'current' | 'previous' | 'pending'>('current');
  const [isQuotationsModalOpen, setIsQuotationsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [expandedProposals, setExpandedProposals] = useState<string[]>([]);
  const [bookingFilters, setBookingFilters] = useState({
    dateRange: 'all',
    priceRange: 'all',
    status: 'all',
  });

  const toggleProposalExpansion = (proposalId: string) => {
    setExpandedProposals(prev => 
      prev.includes(proposalId) 
        ? prev.filter(id => id !== proposalId) 
        : [...prev, proposalId]
    );
  };

  const getPurposeIcon = (purpose: string) => {
    switch (purpose) {
      case 'leisure': return Sun;
      case 'business': return Briefcase;
      case 'factory': return Factory;
      case 'cultural': return Globe;
      case 'education': return GraduationCap;
      default: return Sun;
    }
  };

  // Update active tab when app mode changes
  useEffect(() => {
    setActiveTab(appMode === 'tourism' ? 'travel' : 'trade');
  }, [appMode]);

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10" style={{ paddingTop: `env(safe-area-inset-top)` }}>
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-1 hover:bg-gray-100 rounded-full transition text-center"
            style={{ width: '41px', fontSize: '17px', textAlign: 'left' }}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold flex-1">My Bookings</h1>
          <button 
          onClick={() => onNavigate('explore')}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
          title={appMode === 'trade' ? 'View Products' : 'New Booking'}
        >
          <Plus className="w-6 h-6" />
        </button>
        </div>
        <div className="px-4 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('travel')}
              className={activeTab === 'travel' ? 'flex-1 py-2 px-4 rounded-xl font-semibold transition bg-blue-600 text-white' : 'flex-1 py-2 px-4 rounded-xl font-semibold transition bg-gray-100 text-gray-600 hover:bg-gray-200'}
            >
              Travel Bookings
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={activeTab === 'group' ? 'flex-1 py-2 px-4 rounded-xl font-semibold transition bg-[#ff6b35] text-white' : 'flex-1 py-2 px-4 rounded-xl font-semibold transition bg-gray-100 text-gray-600 hover:bg-gray-200'}
              style={activeTab === 'group' ? { color: '#e78d0d' } : {}}
            >
              Group Travel
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={activeTab === 'custom' ? 'flex-1 py-2 px-4 rounded-xl font-semibold transition text-white' : 'flex-1 py-2 px-4 rounded-xl font-semibold transition bg-gray-100 text-gray-600 hover:bg-gray-200'}
              style={activeTab === 'custom' ? { color: '#f00000' } : {}}
            >
              Custom Tours
            </button>
            <button
              onClick={() => setActiveTab('trade')}
              className={activeTab === 'trade' ? 'flex-1 py-2 px-4 rounded-xl font-semibold transition text-white' : 'flex-1 py-2 px-4 rounded-xl font-semibold transition bg-gray-100 text-gray-600 hover:bg-gray-200'}
              style={activeTab === 'trade' ? { color: '#1001e4', backgroundColor: '#f3f4f7' } : {}}
            >
              Trade Orders
            </button>
          </div>
        </div>
        
        {/* Travel Bookings Subtabs */}
        {activeTab === 'travel' && (
          <div className="px-4 pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setTravelTab('current')}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold transition text-sm ${
                  travelTab === 'current'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Current
              </button>
              <button
                onClick={() => setTravelTab('previous')}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold transition text-sm ${
                  travelTab === 'previous'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setTravelTab('pending')}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold transition text-sm ${
                  travelTab === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {activeTab === 'group' ? (
          <div className="space-y-6">
            {/* Group Travel Homepage */}
            <div style={{ backgroundColor: '#ff6b35', borderRadius: '1rem', padding: '2rem', color: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', zIndex: 1, position: 'relative' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Group Travel for Schools & Companies</h2>
              <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
                Custom group trips, transport, accommodation, guides, and cross-border logistics — all managed in one app.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => onNavigate('group-booking-form')}
                  style={{ backgroundColor: 'white', color: '#ff6b35', padding: '1rem', borderRadius: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', transition: 'all 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff3ed'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <GraduationCap style={{ width: '1.5rem', height: '1.5rem' }} />
                  <span>School Trips</span>
                </button>
                <button
                  onClick={() => onNavigate('group-booking-form')}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', padding: '1rem', borderRadius: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.3)', transition: 'all 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  <Briefcase style={{ width: '1.5rem', height: '1.5rem' }} />
                  <span>Corporate Trips</span>
                </button>
              </div>
            </div>

            {/* My Group Bookings */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">My Group Bookings</h2>
                <button 
                  onClick={() => onNavigate('group-booking-form')}
                  className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  New Request
                </button>
              </div>
              <div className="space-y-4">
                {/* Pending Request */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">University of Zimbabwe - Cultural Tour</h3>
                      <p className="text-sm text-gray-500">25 travelers • Beijing, China • May 15-20, 2026</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-sm">
                      View Details
                    </button>
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                      Chat with Team
                    </button>
                  </div>
                </div>

                {/* Approved Trip */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">ABC Corporation - Team Building</h3>
                      <p className="text-sm text-gray-500">15 travelers • Victoria Falls, Zimbabwe • June 10-14, 2026</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Approved
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-sm">
                      View Itinerary
                    </button>
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'travel' ? (
          <div className="space-y-4">
            {travelTab === 'current' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-lg">Current Bookings</h2>
                  <button 
                    onClick={() => setIsFilterModalOpen(true)}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Filter
                  </button>
                </div>
                {mockTours.slice(0, 2).map((tour) => (
                  <TravelBookingCard
                    key={tour.id}
                    tour={tour}
                    date="Mar 15 - Mar 22, 2026"
                    status="confirmed"
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
            
            {travelTab === 'previous' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-lg">Previous Bookings</h2>
                  <button 
                    onClick={() => setIsFilterModalOpen(true)}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Filter
                  </button>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center">
                  <p className="text-gray-500">No past trips yet</p>
                </div>
              </div>
            )}
            
            {travelTab === 'pending' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-lg">Pending Bookings</h2>
                  <button 
                    onClick={() => setIsFilterModalOpen(true)}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Filter
                  </button>
                </div>
                {mockTours.slice(2, 4).map((tour) => (
                  <PendingBookingCard
                    key={tour.id}
                    tour={tour}
                    date="Apr 10 - Apr 17, 2026"
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'custom' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">Custom Tour Requests</h2>
              <button 
                onClick={() => onNavigate('custom-tour-request')}
                className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                New Request
              </button>
            </div>
            {mockCustomTourRequests.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="text-gray-500">No custom tour requests yet</p>
                <button 
                  onClick={() => onNavigate('custom-tour-request')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Create Request
                </button>
              </div>
            ) : (
              mockCustomTourRequests.map((request) => {
                const PurposeIcon = getPurposeIcon(request.purpose);
                const proposals = mockCustomTourProposals.filter(p => p.requestId === request.id);

                return (
                  <div key={request.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <PurposeIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">
                              {request.city}, {request.country}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Requested on {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Calendar className="w-4 h-4" />
                          Dates
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Users className="w-4 h-4" />
                          Travelers
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{request.travelers}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <DollarSign className="w-4 h-4" />
                          Budget
                        </div>
                        <p className="text-sm font-semibold text-gray-900">${request.budget}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Briefcase className="w-4 h-4" />
                          Purpose
                        </div>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{request.purpose}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4">
                        {request.requirements}
                      </p>
                    </div>

                    {proposals.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Proposals ({proposals.length})</h4>
                        <div className="space-y-3">
                          {proposals.map((proposal) => (
                            <div key={proposal.id} className="border border-gray-200 rounded-xl overflow-hidden">
                              <div 
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleProposalExpansion(proposal.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    proposal.senderType === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
                                  }`}>
                                    <span className={`text-sm font-bold ${
                                      proposal.senderType === 'admin' ? 'text-purple-600' : 'text-blue-600'
                                    }`}>
                                      {proposal.senderName.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900">{proposal.senderName}</p>
                                    <p className="text-xs text-gray-500">
                                      {proposal.senderType === 'admin' ? 'Admin' : 'Partner'} • {new Date(proposal.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    proposal.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {proposal.status}
                                  </span>
                                  {expandedProposals.includes(proposal.id) ? (
                                    <ArrowUp className="w-5 h-5 text-gray-400" />
                                  ) : (
                                    <ArrowDown className="w-5 h-5 text-gray-400" />
                                  )}
                                </div>
                              </div>
                              
                              <AnimatePresence>
                                {expandedProposals.includes(proposal.id) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4 border-t border-gray-200">
                                      <div className="pt-4 space-y-4">
                                        <div>
                                          <h5 className="font-semibold text-gray-900 mb-1">{proposal.title}</h5>
                                          <p className="text-sm text-gray-600">{proposal.description}</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="bg-gray-50 rounded-xl p-3">
                                            <p className="text-xs text-gray-500 mb-1">Price</p>
                                            <p className="text-lg font-bold text-blue-600">${proposal.price} {proposal.currency}</p>
                                          </div>
                                          <div className="bg-gray-50 rounded-xl p-3">
                                            <p className="text-xs text-gray-500 mb-1">Duration</p>
                                            <p className="text-lg font-bold text-gray-900">{proposal.duration}</p>
                                          </div>
                                        </div>

                                        <div>
                                          <h5 className="font-semibold text-gray-900 mb-2">Itinerary</h5>
                                          <div className="space-y-2">
                                            {proposal.itinerary.map((day) => (
                                              <div key={day.day} className="flex gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                  <span className="text-xs font-bold text-blue-600">{day.day}</span>
                                                </div>
                                                <div>
                                                  <p className="text-sm font-semibold text-gray-900">{day.title}</p>
                                                  <p className="text-xs text-gray-600">{day.description}</p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <h5 className="font-semibold text-gray-900 mb-2 text-sm">Included</h5>
                                            <ul className="space-y-1">
                                              {proposal.included.map((item, i) => (
                                                <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                                                  <Check className="w-3 h-3 text-green-600" />
                                                  {item}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                          <div>
                                            <h5 className="font-semibold text-gray-900 mb-2 text-sm">Excluded</h5>
                                            <ul className="space-y-1">
                                              {proposal.excluded.map((item, i) => (
                                                <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                                                  <X className="w-3 h-3 text-red-600" />
                                                  {item}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>

                                        {proposal.status === 'pending' && (
                                          <div className="flex gap-2">
                                            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                                              Accept Proposal
                                            </button>
                                            <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
                                              Reject
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Orders */}
            <div>
              <h2 className="font-bold text-lg mb-3">Active Orders</h2>
              {mockTradeOrders.map((order) => (
                <TradeOrderCard key={order.id} order={order} />
              ))}
            </div>

            {/* RFQ History */}
            <div>
              <h2 className="font-bold text-lg mb-3">RFQ History</h2>
              <div className="bg-white rounded-2xl p-4 mb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Industrial Machinery</h3>
                    <p className="text-sm text-gray-500">Posted on Feb 8, 2026</p>
                  </div>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                    3 Quotes
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  <p className="text-sm text-gray-600">• Quantity: 10 units</p>
                  <p className="text-sm text-gray-600">• Budget: $200,000 - $280,000</p>
                </div>
                <button 
                  onClick={() => setIsQuotationsModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                >
                  View Quotations
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-w-md mx-auto max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Filter Bookings</h2>
                  <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Date Range */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Date Range</h3>
                  <div className="flex gap-2">
                    {['all', 'upcoming', 'past', 'this-month', 'next-month'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setBookingFilters({ ...bookingFilters, dateRange: range })}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          bookingFilters.dateRange === range
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {range === 'all' ? 'All' : 
                         range === 'upcoming' ? 'Upcoming' : 
                         range === 'past' ? 'Past' : 
                         range === 'this-month' ? 'This Month' : 'Next Month'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['all', 'under-1000', '1000-3000', 'over-3000'].map((price) => (
                      <button
                        key={price}
                        onClick={() => setBookingFilters({ ...bookingFilters, priceRange: price })}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          bookingFilters.priceRange === price
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {price === 'all' ? 'All' : 
                         price === 'under-1000' ? 'Under $1,000' : 
                         price === '1000-3000' ? '$1,000 - $3,000' : 'Over $3,000'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Status */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Booking Status</h3>
                  <div className="flex gap-2">
                    {['all', 'confirmed', 'pending', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setBookingFilters({ ...bookingFilters, status })}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          bookingFilters.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setBookingFilters({
                        dateRange: 'all',
                        priceRange: 'all',
                        status: 'all',
                      });
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quotations Modal */}
      <QuotationsModal
        rfqId="RFQ-20260208"
        isOpen={isQuotationsModalOpen}
        onClose={() => setIsQuotationsModalOpen(false)}
      />

      {/* Bottom Navigation */}
      <BottomNav currentScreen="bookings" onNavigate={onNavigate} />
    </div>
  );
}

function TravelBookingCard({ tour, date, status, onNavigate }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all mb-3 cursor-pointer"
      onClick={() => onNavigate('tour-details', tour.id)}
    >
      <div className="relative h-32">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
          Confirmed
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{tour.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
            View Details
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('booking-management', tour.id, undefined, undefined, undefined, date, 'confirmed');
            }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            Manage Booking
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PendingBookingCard({ tour, date, onNavigate }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all mb-3 cursor-pointer"
      onClick={() => onNavigate('tour-details', tour.id)}
    >
      <div className="relative h-32">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-amber-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
          Pending
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{tour.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
            View Details
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('booking-management', tour.id, undefined, undefined, undefined, date, 'pending');
            }}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            Complete Booking
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TradeOrderCard({ order }: { order: any }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const statusConfig = {
    'rfq-sent': { label: 'RFQ Sent', color: 'bg-blue-100 text-blue-700', icon: FileText },
    'quotation-received': { label: 'Quotation Received', color: 'bg-purple-100 text-purple-700', icon: FileText },
    'payment-pending': { label: 'Payment Pending', color: 'bg-amber-100 text-amber-700', icon: DollarSign },
    'paid': { label: 'Paid', color: 'bg-green-100 text-green-700', icon: Check },
    'production': { label: 'In Production', color: 'bg-indigo-100 text-indigo-700', icon: Package },
    'shipping': { label: 'Shipping', color: 'bg-cyan-100 text-cyan-700', icon: Truck },
    'delivered': { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: Check },
  };

  const config = statusConfig[order.status];
  const Icon = config.icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md p-4 mb-3 hover:shadow-lg transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">{order.productName}</h3>
            <p className="text-sm text-gray-500">{order.supplier}</p>
          </div>
          <span className={`${config.color} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono font-semibold">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-semibold">{order.quantity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-blue-600">${order.totalAmount.toLocaleString()}</span>
          </div>
          {order.estimatedDelivery && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Est. Delivery:</span>
              <span className="font-semibold">{order.estimatedDelivery}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {order.status === 'shipping' && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>In Transit</span>
              <span>75%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
              />
            </div>
          </div>
        )}

        {order.trackingNumber && (
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <p className="text-xs text-gray-600 mb-1">Tracking Number</p>
            <p className="font-mono text-sm font-bold text-blue-600">{order.trackingNumber}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button 
            onClick={() => setShowDocuments(true)}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1"
          >
            <FileText className="w-4 h-4" />
            Documents
          </button>
          {order.status === 'shipping' && (
            <button 
              onClick={() => setShowDetails(true)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-1"
            >
              <Truck className="w-4 h-4" />
              Track Order
            </button>
          )}
          {order.status === 'quotation-received' && (
            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
              Review Quote
            </button>
          )}
        </div>
      </motion.div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={order}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onViewDocuments={() => {
          setShowDetails(false);
          setShowDocuments(true);
        }}
      />

      {/* Documents Modal */}
      <DocumentsModal
        orderId={order.id}
        isOpen={showDocuments}
        onClose={() => setShowDocuments(false)}
      />
    </>
  );
}
