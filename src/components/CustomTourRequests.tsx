import { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Briefcase, Sun, Factory, Globe, GraduationCap, Plus, Check, X, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCustomTourRequests, mockCustomTourProposals, type CustomTourRequest, type CustomTourProposal } from '../data/mockData';

interface CustomTourRequestsProps {
  userType: 'admin' | 'partner';
  partnerCountry?: string;
  partnerCity?: string;
}

export function CustomTourRequests({ userType, partnerCountry, partnerCity }: CustomTourRequestsProps) {
  const [selectedRequest, setSelectedRequest] = useState<CustomTourRequest | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [expandedProposals, setExpandedProposals] = useState<string[]>([]);

  const filteredRequests = userType === 'admin' 
    ? mockCustomTourRequests 
    : mockCustomTourRequests.filter(req => 
        req.country.toLowerCase() === partnerCountry?.toLowerCase() && 
        req.city.toLowerCase().includes(partnerCity?.toLowerCase() || '')
      );

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

  const toggleProposalExpansion = (proposalId: string) => {
    setExpandedProposals(prev => 
      prev.includes(proposalId) 
        ? prev.filter(id => id !== proposalId) 
        : [...prev, proposalId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Custom Tour Requests</h1>
        <p className="text-gray-500">
          {userType === 'admin' 
            ? 'View and respond to all custom tour requests' 
            : 'View custom tour requests for your area'
          }
        </p>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No custom tour requests yet</h3>
          <p className="text-gray-500">Check back later for new requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
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

                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowProposalModal(true);
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Send Proposal
                </button>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showProposalModal && selectedRequest && (
          <SendProposalModal
            request={selectedRequest}
            onClose={() => setShowProposalModal(false)}
            userType={userType}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SendProposalModal({ 
  request, 
  onClose, 
  userType 
}: { 
  request: CustomTourRequest; 
  onClose: () => void; 
  userType: 'admin' | 'partner';
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    itinerary: [{ day: 1, title: '', description: '' }],
    included: [''],
    excluded: [''],
  });

  const handleAddItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', description: '' }]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProposal: CustomTourProposal = {
      id: `cp${Date.now()}`,
      requestId: request.id,
      senderId: userType === 'admin' ? 'admin1' : 'p1',
      senderName: userType === 'admin' ? 'Tourista Admin' : 'China Elite Tours',
      senderType: userType,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      currency: 'USD',
      duration: formData.duration,
      itinerary: formData.itinerary.filter(day => day.title && day.description),
      included: formData.included.filter(item => item),
      excluded: formData.excluded.filter(item => item),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    mockCustomTourProposals.push(newProposal);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Send Custom Tour Proposal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Proposal Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g., Beijing Business & Culture Experience"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              placeholder="Describe your tour proposal..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="2800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="7 days"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">Itinerary</label>
              <button
                type="button"
                onClick={handleAddItineraryDay}
                className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Day
              </button>
            </div>
            <div className="space-y-3">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Day {day.day}</p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => {
                        const newItinerary = [...formData.itinerary];
                        newItinerary[index].title = e.target.value;
                        setFormData({ ...formData, itinerary: newItinerary });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      placeholder="Day title"
                    />
                    <textarea
                      value={day.description}
                      onChange={(e) => {
                        const newItinerary = [...formData.itinerary];
                        newItinerary[index].description = e.target.value;
                        setFormData({ ...formData, itinerary: newItinerary });
                      }}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm resize-none"
                      placeholder="Day description"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Included</label>
            {formData.included.map((item, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newIncluded = [...formData.included];
                    newIncluded[index] = e.target.value;
                    if (index === newIncluded.length - 1 && e.target.value) {
                      newIncluded.push('');
                    }
                    setFormData({ ...formData, included: newIncluded });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="e.g., 6 nights accommodation"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Excluded</label>
            {formData.excluded.map((item, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newExcluded = [...formData.excluded];
                    newExcluded[index] = e.target.value;
                    if (index === newExcluded.length - 1 && e.target.value) {
                      newExcluded.push('');
                    }
                    setFormData({ ...formData, excluded: newExcluded });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="e.g., International flights"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Send Proposal
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
