import { useState } from 'react';
import { MapPin, Globe, Calendar, Users, DollarSign, Check, X, Filter, Search, Edit, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourRequest {
  id: string;
  title: string;
  destination: string;
  duration: string;
  groupSize: number;
  budget: string;
  services: string[];
  specialRequirements: string;
  customerName: string;
  customerEmail: string;
  requestedDate: Date;
  status: 'new' | 'negotiating' | 'countered' | 'accepted' | 'declined';
  negotiationHistory?: NegotiationMessage[];
  currentOffer?: {
    price: string;
    from: 'partner' | 'client';
    timestamp: Date;
  };
}

interface NegotiationMessage {
  id: string;
  sender: 'partner' | 'client';
  message: string;
  price?: string;
  timestamp: Date;
  type: 'message' | 'offer' | 'counteroffer' | 'acceptance' | 'rejection';
}

interface PartnerProfile {
  country: string;
  cities: string[];
  services: string[];
  maxGroupSize: number;
  priceRange: { min: string; max: string };
}

const ALL_COUNTRIES = [
  { code: 'CN', name: 'China' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'MO', name: 'Macau' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'MA', name: 'Morocco' },
  { code: 'KE', name: 'Kenya' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'UG', name: 'Uganda' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'BW', name: 'Botswana' },
  { code: 'NA', name: 'Namibia' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'AO', name: 'Angola' },
  { code: 'MZ', name: 'Mozambique' }
];

const ALL_CITIES = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou', 'Chengdu', 'Xian', 'Hong Kong'];
const ALL_SERVICES = ['Business Tours', 'Cultural Tours', 'Airport Transfers', 'Hotel Booking', 'Interpreter Services', 'Restaurant Reservations', 'Visa Assistance', 'Travel Insurance'];

export function PartnerTourMatching() {
  const [activeSection, setActiveSection] = useState<'available' | 'negotiations' | 'history'>('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourRequest | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [counterPrice, setCounterPrice] = useState('');
  const [quoteData, setQuoteData] = useState({
    price: '',
    duration: '',
    includes: [] as string[],
    notes: ''
  });

  const [partnerProfile, setPartnerProfile] = useState<PartnerProfile>({
    country: 'CN',
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'],
    services: ['Business Tours', 'Cultural Tours', 'Airport Transfers', 'Hotel Booking', 'Interpreter Services'],
    maxGroupSize: 20,
    priceRange: { min: '$500', max: '$10,000' }
  });

  const [tourRequests, setTourRequests] = useState<TourRequest[]>([
    {
      id: 'TR-001',
      title: 'Beijing Business Executive Tour',
      destination: 'Beijing',
      duration: '5 days',
      groupSize: 4,
      budget: '$3,500',
      services: ['Business Tours', 'Interpreter Services', 'Airport Transfers'],
      specialRequirements: 'Need Mandarin speaking guide, luxury vehicle transport',
      customerName: 'John Smith',
      customerEmail: 'john.smith@company.com',
      requestedDate: new Date('2026-04-20'),
      status: 'new'
    },
    {
      id: 'TR-002',
      title: 'Shanghai Cultural Experience',
      destination: 'Shanghai',
      duration: '3 days',
      groupSize: 8,
      budget: '$2,800',
      services: ['Cultural Tours', 'Hotel Booking'],
      specialRequirements: 'Vegetarian meal options required',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      requestedDate: new Date('2026-04-19'),
      status: 'negotiating',
      negotiationHistory: [
        {
          id: '1',
          sender: 'client',
          message: 'Hi, I\'m interested in this tour. Is there any flexibility on the price?',
          timestamp: new Date('2026-04-19T10:00:00'),
          type: 'message'
        },
        {
          id: '2',
          sender: 'partner',
          message: 'Thank you for your interest! I can offer a 10% discount if you book for at least 5 people.',
          price: '$2,520',
          timestamp: new Date('2026-04-19T11:30:00'),
          type: 'counteroffer'
        }
      ],
      currentOffer: {
        price: '$2,520',
        from: 'partner',
        timestamp: new Date('2026-04-19T11:30:00')
      }
    },
    {
      id: 'TR-003',
      title: 'Guangzhou Trade Fair Tour',
      destination: 'Guangzhou',
      duration: '7 days',
      groupSize: 12,
      budget: '$5,500',
      services: ['Business Tours', 'Airport Transfers', 'Interpreter Services'],
      specialRequirements: 'Canton Fair exhibition tickets needed',
      customerName: 'Mike Chen',
      customerEmail: 'mike.chen@trade.com',
      requestedDate: new Date('2026-04-18'),
      status: 'new'
    },
    {
      id: 'TR-004',
      title: 'Shenzhen Tech Innovation Tour',
      destination: 'Shenzhen',
      duration: '4 days',
      groupSize: 6,
      budget: '$2,200',
      services: ['Business Tours', 'Cultural Tours'],
      specialRequirements: 'Visit to technology parks and startups',
      customerName: 'Emily Wong',
      customerEmail: 'emily.wong@tech.io',
      requestedDate: new Date('2026-04-17'),
      status: 'countered',
      negotiationHistory: [
        {
          id: '1',
          sender: 'partner',
          message: 'I can organize a tech tour including visits to major tech companies and innovation centers.',
          price: '$2,400',
          timestamp: new Date('2026-04-17T14:00:00'),
          type: 'offer'
        },
        {
          id: '2',
          sender: 'client',
          message: 'That sounds great! Could you do it for $2,000?',
          price: '$2,000',
          timestamp: new Date('2026-04-18T09:00:00'),
          type: 'counteroffer'
        }
      ],
      currentOffer: {
        price: '$2,000',
        from: 'client',
        timestamp: new Date('2026-04-18T09:00:00')
      }
    }
  ]);

  const filteredTours = tourRequests.filter(tour => {
    // First filter by partner profile criteria
    const matchesCity = partnerProfile.cities.includes(tour.destination);
    const matchesServices = tour.services.some(s => partnerProfile.services.includes(s));
    const matchesGroupSize = tour.groupSize <= partnerProfile.maxGroupSize;
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProfile = matchesCity && matchesServices && matchesGroupSize && matchesSearch;
    
    // Then filter by active tab
    if (activeSection === 'available') {
      return matchesProfile && tour.status === 'new';
    } else if (activeSection === 'negotiations') {
      return matchesProfile && ['negotiating', 'countered'].includes(tour.status);
    } else if (activeSection === 'history') {
      return matchesProfile && ['accepted', 'declined'].includes(tour.status);
    }
    
    return matchesProfile;
  });

  const handleUpdateProfile = () => {
    setShowProfileModal(false);
    alert('Profile updated successfully!');
  };

  const handleAcceptTour = (tour: TourRequest) => {
    setTourRequests(prev => prev.map(t => 
      t.id === tour.id ? { ...t, status: 'negotiating' as const } : t
    ));
  };

  const handleDeclineTour = (tour: TourRequest) => {
    setTourRequests(prev => prev.map(t => 
      t.id === tour.id ? { ...t, status: 'declined' as const } : t
    ));
  };

  const handleStartNegotiation = (tour: TourRequest) => {
    setSelectedTour(tour);
    setShowNegotiationModal(true);
  };

  const handleSendMessage = () => {
    if (!selectedTour || !negotiationMessage.trim()) return;

    const newMessage: NegotiationMessage = {
      id: Date.now().toString(),
      sender: 'partner',
      message: negotiationMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setTourRequests(prev => prev.map(t => {
      if (t.id === selectedTour.id) {
        return {
          ...t,
          negotiationHistory: [...(t.negotiationHistory || []), newMessage]
        };
      }
      return t;
    }));

    setNegotiationMessage('');
  };

  const handleSendCounterOffer = () => {
    if (!selectedTour || !counterPrice.trim()) return;

    const newOffer: NegotiationMessage = {
      id: Date.now().toString(),
      sender: 'partner',
      message: `Counter offer: $${counterPrice}`,
      price: `$${counterPrice}`,
      timestamp: new Date(),
      type: 'counteroffer'
    };

    setTourRequests(prev => prev.map(t => {
      if (t.id === selectedTour.id) {
        return {
          ...t,
          status: 'negotiating' as const,
          negotiationHistory: [...(t.negotiationHistory || []), newOffer],
          currentOffer: {
            price: `$${counterPrice}`,
            from: 'partner',
            timestamp: new Date()
          }
        };
      }
      return t;
    }));

    setCounterPrice('');
    alert('Counter offer sent!');
  };

  const handleAcceptCurrentOffer = () => {
    if (!selectedTour) return;

    const acceptance: NegotiationMessage = {
      id: Date.now().toString(),
      sender: 'partner',
      message: 'Offer accepted! Looking forward to serving you.',
      timestamp: new Date(),
      type: 'acceptance'
    };

    setTourRequests(prev => prev.map(t => {
      if (t.id === selectedTour.id) {
        return {
          ...t,
          status: 'accepted' as const,
          negotiationHistory: [...(t.negotiationHistory || []), acceptance]
        };
      }
      return t;
    }));

    setShowNegotiationModal(false);
    alert('Tour accepted! The customer will be notified.');
  };

  const handleSubmitQuote = () => {
    if (!quoteData.price || !quoteData.duration) {
      alert('Please fill in price and duration');
      return;
    }
    alert(`Quote submitted successfully!\nPrice: ${quoteData.price}\nDuration: ${quoteData.duration}`);
    setShowQuoteModal(false);
    setSelectedTour(null);
    setQuoteData({ price: '', duration: '', includes: [], notes: '' });
  };

  const getStatusBadge = (status: TourRequest['status']) => {
    const badges = {
      new: 'bg-blue-100 text-blue-700',
      negotiating: 'bg-yellow-100 text-yellow-700',
      countered: 'bg-orange-100 text-orange-700',
      accepted: 'bg-green-100 text-green-700',
      declined: 'bg-red-100 text-red-700'
    };
    return badges[status];
  };

  const getStatusLabel = (status: TourRequest['status']) => {
    const labels = {
      new: 'New Request',
      negotiating: 'Negotiating',
      countered: ' Counteroffer Received',
      accepted: 'Accepted',
      declined: 'Declined'
    };
    return labels[status];
  };

  const getCountryName = (code: string) => {
    const country = ALL_COUNTRIES.find(c => c.code === code);
    return country ? country.name : code;
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tour Matching</h1>
        <p className="text-gray-500">View and respond to tour requests that match your services and locations</p>
      </div>

      {/* Partner Profile Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Your Service Profile</h3>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-600 mb-2">Country</p>
                <p className="font-semibold text-gray-900">{getCountryName(partnerProfile.country)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Cities You Serve</p>
                <div className="flex flex-wrap gap-2">
                  {partnerProfile.cities.map(city => (
                    <span key={city} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-700">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Services Offered</p>
                <div className="flex flex-wrap gap-2">
                  {partnerProfile.services.slice(0, 3).map(service => (
                    <span key={service} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-green-700">
                      {service}
                    </span>
                  ))}
                  {partnerProfile.services.length > 3 && (
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-500">
                      +{partnerProfile.services.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Capacity</p>
                <p className="text-sm font-bold text-gray-900">Up to {partnerProfile.maxGroupSize} travelers</p>
                <p className="text-xs text-gray-500">Price Range: {partnerProfile.priceRange.min} - {partnerProfile.priceRange.max}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition flex items-center gap-2"
            style={{ fontSize: '7px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '16px', paddingRight: '16px' }}
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {[
          { id: 'available', label: 'Available Tours', count: filteredTours.filter(t => t.status === 'new').length },
          { id: 'negotiations', label: 'Active Negotiations', count: filteredTours.filter(t => ['negotiating', 'countered'].includes(t.status)).length },
          { id: 'history', label: 'History', count: filteredTours.filter(t => ['accepted', 'declined'].includes(t.status)).length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeSection === tab.id
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                activeSection === tab.id ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by tour name or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl border transition flex items-center gap-2 ${
            showFilters ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Tour Request Cards */}
      <div className="space-y-4">
        {filteredTours.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Globe className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Matching Tours</h3>
            <p className="text-gray-500">There are no tour requests matching your profile right now. Check back later!</p>
          </div>
        ) : (
          filteredTours.map(tour => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{tour.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(tour.status)}`}>
                      {getStatusLabel(tour.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Request ID: {tour.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">{tour.budget}</p>
                  <p className="text-xs text-gray-500">Customer Budget</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{tour.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{tour.groupSize} travelers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>Your Price Range</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Services Required:</p>
                <div className="flex flex-wrap gap-2">
                  {tour.services.map(service => (
                    <span
                      key={service}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        partnerProfile.services.includes(service)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {tour.specialRequirements && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Special Requirements:</p>
                  <p className="text-sm text-gray-700">{tour.specialRequirements}</p>
                </div>
              )}

              {/* Negotiation Status */}
              {tour.currentOffer && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-blue-900">Current Offer:</p>
                    <span className={`text-lg font-bold ${tour.currentOffer.from === 'partner' ? 'text-blue-600' : 'text-green-600'}`}>
                      {tour.currentOffer.price}
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    {tour.currentOffer.from === 'partner' ? 'Your offer' : 'Customer offer'} - 
                    waiting for {tour.currentOffer.from === 'partner' ? 'customer response' : 'your response'}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <p className="text-gray-500">Customer: <span className="font-medium">{tour.customerName}</span></p>
                  <p className="text-xs text-gray-400">Requested: {tour.requestedDate.toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                  {tour.status === 'new' && (
                    <>
                      <button
                        onClick={() => handleDeclineTour(tour)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Decline
                      </button>
                      <button
                        onClick={() => handleAcceptTour(tour)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Accept & Negotiate
                      </button>
                    </>
                  )}
                  {(tour.status === 'negotiating' || tour.status === 'countered') && (
                    <button
                      onClick={() => handleStartNegotiation(tour)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Continue Negotiation
                    </button>
                  )}
                  {tour.status === 'accepted' && (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Accepted
                    </span>
                  )}
                  {tour.status === 'declined' && (
                    <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium">
                      Declined
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Edit Service Profile</h3>
              <button onClick={() => setShowProfileModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country/Region</label>
                <select
                  value={partnerProfile.country}
                  onChange={(e) => setPartnerProfile({...partnerProfile, country: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {ALL_COUNTRIES.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Cities You Serve</label>
                <div className="grid grid-cols-4 gap-3">
                  {ALL_CITIES.map(city => (
                    <label key={city} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={partnerProfile.cities.includes(city)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPartnerProfile({...partnerProfile, cities: [...partnerProfile.cities, city]});
                          } else {
                            setPartnerProfile({...partnerProfile, cities: partnerProfile.cities.filter(c => c !== city)});
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Services Offered</label>
                <div className="grid grid-cols-2 gap-3">
                  {ALL_SERVICES.map(service => (
                    <label key={service} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={partnerProfile.services.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPartnerProfile({...partnerProfile, services: [...partnerProfile.services, service]});
                          } else {
                            setPartnerProfile({...partnerProfile, services: partnerProfile.services.filter(s => s !== service)});
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Group Size</label>
                <input
                  type="number"
                  value={partnerProfile.maxGroupSize}
                  onChange={(e) => setPartnerProfile({...partnerProfile, maxGroupSize: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  min="1"
                  max="100"
                />
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Price</label>
                  <input
                    type="text"
                    placeholder="$500"
                    value={partnerProfile.priceRange.min}
                    onChange={(e) => setPartnerProfile({...partnerProfile, priceRange: {...partnerProfile.priceRange, min: e.target.value}})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Price</label>
                  <input
                    type="text"
                    placeholder="$10,000"
                    value={partnerProfile.priceRange.max}
                    onChange={(e) => setPartnerProfile({...partnerProfile, priceRange: {...partnerProfile.priceRange, max: e.target.value}})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Negotiation Modal */}
      {showNegotiationModal && selectedTour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Negotiation: {selectedTour.title}</h3>
                <p className="text-sm text-gray-500">Tour ID: {selectedTour.id}</p>
              </div>
              <button onClick={() => setShowNegotiationModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Offer Status */}
            {selectedTour.currentOffer && (
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Current Offer:</p>
                    <p className="text-xs text-blue-700 mt-1">
                      {selectedTour.currentOffer.from === 'partner' ? 'You offered' : 'Customer offered'} on {selectedTour.currentOffer.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <p className={`text-2xl font-bold ${selectedTour.currentOffer.from === 'partner' ? 'text-blue-600' : 'text-green-600'}`}>
                    {selectedTour.currentOffer.price}
                  </p>
                </div>
              </div>
            )}

            {/* Negotiation History */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[400px]">
              {selectedTour.negotiationHistory && selectedTour.negotiationHistory.length > 0 ? (
                selectedTour.negotiationHistory.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'partner' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-xl p-4 ${
                      msg.sender === 'partner' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold">
                          {msg.sender === 'partner' ? 'You' : selectedTour.customerName}
                        </span>
                        {msg.type === 'offer' && <span className="text-xs bg-green-500 px-2 py-0.5 rounded">Offer</span>}
                        {msg.type === 'counteroffer' && <span className="text-xs bg-yellow-500 px-2 py-0.5 rounded">Counter</span>}
                        {msg.type === 'acceptance' && <span className="text-xs bg-green-500 px-2 py-0.5 rounded">Accepted</span>}
                      </div>
                      {msg.price && (
                        <p className="text-xl font-bold mb-2">{msg.price}</p>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-2 ${msg.sender === 'partner' ? 'text-blue-200' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {selectedTour.currentOffer && selectedTour.currentOffer.from === 'client' && (
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAcceptCurrentOffer}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Accept Offer ({selectedTour.currentOffer.price})
                </button>
              </div>
            )}

            {/* Counter Offer Input */}
            <div className="border-t pt-4">
              <div className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Enter counter offer price..."
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={handleSendCounterOffer}
                  disabled={!counterPrice.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send Counter
                </button>
              </div>

              {/* Message Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={negotiationMessage}
                  onChange={(e) => setNegotiationMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!negotiationMessage.trim()}
                  className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
