import { ArrowLeft, Search, Filter, Calendar, Gift, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ReferralHistoryProps {
  onBack: () => void;
}

interface Referral {
  id: string;
  name: string;
  action: string;
  points: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  time: string;
  referralCode: string;
}

const MOCK_REFERRALS: Referral[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    action: 'Booked a safari tour',
    points: 300,
    status: 'completed',
    date: '2026-03-27',
    time: '14:30',
    referralCode: 'TOUR8765'
  },
  {
    id: '2',
    name: 'Michael Chen',
    action: 'Signed up for partner account',
    points: 100,
    status: 'completed',
    date: '2026-03-25',
    time: '09:15',
    referralCode: 'PART4321'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    action: 'Made a trade purchase',
    points: 200,
    status: 'completed',
    date: '2026-03-22',
    time: '16:45',
    referralCode: 'TRADE9876'
  },
  {
    id: '4',
    name: 'David Kim',
    action: 'Booked a cultural tour',
    points: 150,
    status: 'pending',
    date: '2026-03-20',
    time: '11:20',
    referralCode: 'TOUR5432'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    action: 'Signed up for user account',
    points: 50,
    status: 'completed',
    date: '2026-03-18',
    time: '10:00',
    referralCode: 'USER6789'
  },
  {
    id: '6',
    name: 'James Wilson',
    action: 'Booked a beach vacation',
    points: 250,
    status: 'completed',
    date: '2026-03-15',
    time: '15:40',
    referralCode: 'TOUR1234'
  }
];

export function ReferralHistory({ onBack }: ReferralHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredReferrals = MOCK_REFERRALS.filter(referral => {
    const matchesSearch = referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || referral.status === filterStatus;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'points') {
      return b.points - a.points;
    }
    return 0;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const totalPoints = filteredReferrals.reduce((sum, referral) => sum + referral.points, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Referral History</h1>
            <p className="text-blue-100 text-sm">Total earned: {totalPoints} points</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search referrals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'completed', label: 'Completed' },
            { key: 'pending', label: 'Pending' },
            { key: 'failed', label: 'Failed' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${filterStatus === filter.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Referrals List */}
      <div className="flex-1">
        {filteredReferrals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <Gift className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No referrals found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredReferrals.map((referral) => (
              <div key={referral.id} className="p-4 bg-white">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">{referral.name}</h4>
                      <span className="text-sm font-bold text-green-600">+{referral.points} points</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{referral.action}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{referral.date} · {referral.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(referral.status)}
                        <span>{getStatusText(referral.status)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
