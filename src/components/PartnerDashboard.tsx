import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Eye,
  Users,
  DollarSign,
  CreditCard,
  Settings,
  MessageSquare,
  Bell,
  Plus,
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  FileText,
  Building2,
  Shield,
  Clock,
  Smartphone,
  Download,
  BarChart2,
  Target,
  Award,
  Activity,
  Zap,
  AlertTriangle,
  Save,
  X,
  Scale,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Screen } from '../App';

import { AdCreationForm, AdFormData } from './AdCreationForm';
import { WithdrawalManager } from './WithdrawalManager';
import { PartnerTourMatching } from './PartnerTourMatching';
import partnerService from '../services/partnerService';

interface PartnerDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function PartnerDashboard({ onNavigate }: PartnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tours' | 'bookings' | 'revenue' | 'payments' | 'advertisements' | 'analytics' | 'automation' | 'tour-matching' | 'settings'>('overview');
  const [isVerified, setIsVerified] = useState(true);
  const [loading, setLoading] = useState(false);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [toursData, setToursData] = useState<any[]>([]);
  const [bookingsData, setBookingsData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  // Fetch overview data
  const fetchOverview = async () => {
    setLoading(true);
    try {
      const response = await partnerService.getOverview();
      if (response.success) {
        setOverviewData(response.data);
      }
    } catch (error) {
      console.error('Error fetching overview:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tours data
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await partnerService.getTours();
      if (response.success) {
        setToursData(response.data.tours);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings data
  const fetchBookings = async (status?: string) => {
    setLoading(true);
    try {
      const response = await partnerService.getBookings(status);
      if (response.success) {
        setBookingsData(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch revenue data
  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const response = await partnerService.getRevenue();
      if (response.success) {
        setRevenueData(response.data);
      }
    } catch (error) {
      console.error('Error fetching revenue:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await partnerService.getAnalytics();
      if (response.success) {
        setAnalyticsData(response.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    switch (activeTab) {
      case 'overview':
        if (!overviewData) fetchOverview();
        break;
      case 'tours':
        if (toursData.length === 0) fetchTours();
        break;
      case 'bookings':
        if (bookingsData.length === 0) fetchBookings();
        break;
      case 'revenue':
        if (!revenueData) fetchRevenue();
        break;
      case 'analytics':
        if (!analyticsData) fetchAnalytics();
        break;
      default:
        break;
    }
  }, [activeTab]);

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
              <p className="text-xs text-gray-500">Partner Portal</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Partner</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900">China Elite Tours</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                isVerified 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  isVerified ? 'bg-green-600' : 'bg-orange-600'
                }`}></div>
                {isVerified ? 'Verified' : 'Not Verified'}
              </span>
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
            label="My Tours"
            isActive={activeTab === 'tours'}
            onClick={() => setActiveTab('tours')}
          />
          <NavItem
            icon={Calendar}
            label="Bookings"
            isActive={activeTab === 'bookings'}
            onClick={() => setActiveTab('bookings')}
            badge="12"
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
            label="Automation"
            isActive={activeTab === 'automation'}
            onClick={() => setActiveTab('automation')}
          />
          <NavItem
            icon={Scale}
            label="Tour Matching"
            isActive={activeTab === 'tour-matching'}
            onClick={() => setActiveTab('tour-matching')}
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
        {activeTab === 'overview' && <OverviewTab onNavigate={setActiveTab} data={overviewData} loading={loading} />}
        {activeTab === 'tours' && <ToursTab tours={toursData} loading={loading} onRefresh={fetchTours} />}
        {activeTab === 'bookings' && <BookingsTab bookings={bookingsData} loading={loading} onRefresh={fetchBookings} />}
        {activeTab === 'revenue' && <RevenueTab data={revenueData} loading={loading} />}
        {activeTab === 'payments' && <PaymentsTab />}
        {activeTab === 'advertisements' && <AdvertisementsTab />}
        {activeTab === 'analytics' && <AnalyticsTab data={analyticsData} loading={loading} />}
        {activeTab === 'automation' && <AutomationTab />}
        {activeTab === 'tour-matching' && <PartnerTourMatching />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
  badge,
}: {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left font-medium">{label}</span>
      {badge && (
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
          isActive ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function OverviewTab({ onNavigate, data, loading }: { onNavigate: (tab: string) => void; data?: any; loading?: boolean }) {
  // Default to mock data if real data isn't available
  const metrics = data?.metrics || {
    totalRevenue: 145680,
    totalBookings: 486,
    activeTours: 24,
    avgRating: 4.8
  };

  const topTours = data?.topTours || [
    { id: '1', name: 'Beijing Business & Culture', bookings: 142, revenue: 35580 },
    { id: '2', name: 'Shanghai Modern Experience', bookings: 98, revenue: 18602 },
    { id: '3', name: 'Guangzhou Canton Fair', bookings: 76, revenue: 12144 }
  ];

  const recentBookings = data?.recentBookings || [
    { _id: 'BK-1234', tourId: { title: 'Beijing Tour' }, userId: { name: 'John Doe', email: 'john@test.com' }, createdAt: '2026-03-15', totalPrice: 2499, status: 'Confirmed' },
    { _id: 'BK-1235', tourId: { title: 'Shanghai Tour' }, userId: { name: 'Jane Smith', email: 'jane@test.com' }, createdAt: '2026-03-20', totalPrice: 1899, status: 'Pending' },
    { _id: 'BK-1236', tourId: { title: 'Beijing Tour' }, userId: { name: 'Mike Chen', email: 'mike@test.com' }, createdAt: '2026-04-05', totalPrice: 2499, status: 'Confirmed' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your tours.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          change="+12.5%"
          isPositive
          icon={DollarSign}
        />
        <KPICard
          title="Total Bookings"
          value={metrics.totalBookings.toString()}
          change="+8.2%"
          isPositive
          icon={Calendar}
        />
        <KPICard
          title="Active Tours"
          value={metrics.activeTours.toString()}
          change="+2"
          isPositive
          icon={Package}
        />
        <KPICard
          title="Avg. Rating"
          value={metrics.avgRating.toFixed(1)}
          change="+0.2"
          isPositive
          icon={TrendingUp}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Booking Trends</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 45, 75, 55, 85, 70, 90].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                />
                <span className="text-xs text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Top Performing Tours</h3>
          <div className="space-y-3">
            {topTours.map((tour: any) => (
              <TourPerformanceItem
                key={tour.id}
                name={tour.name}
                bookings={tour.bookings}
                revenue={`$${tour.revenue.toLocaleString()}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Recent Bookings</h3>
          <button 
            onClick={() => onNavigate('bookings')}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            View All
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">Booking ID</th>
              <th className="pb-3">Tour</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentBookings.map((booking: any) => (
              <tr key={booking._id || booking.id} className="border-b last:border-0">
                <td className="py-3 font-mono text-xs">{booking._id?.substring(0, 8) || booking.id}</td>
                <td className="py-3">{booking.tourId?.title || booking.tour}</td>
                <td className="py-3">{booking.userId?.name || booking.customer}</td>
                <td className="py-3">{new Date(booking.createdAt || booking.date).toLocaleDateString()}</td>
                <td className="py-3 font-semibold">${booking.totalPrice?.toLocaleString() || booking.amount}</td>
                <td className="py-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'Confirmed' || booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ToursTab({ tours: propTours, loading, onRefresh }: { tours?: any[]; loading?: boolean; onRefresh?: () => void }) {
  // Default to mock data if real data isn't available
  const [tours, setTours] = useState<any[]>(propTours && propTours.length > 0 ? propTours : [
    {
      _id: '1',
      title: 'Beijing Business & Culture Tour',
      category: 'Business',
      price: 2499,
      bookings: 142,
      rating: 4.8,
      isActive: true,
      images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200']
    },
    {
      _id: '2',
      title: 'Shanghai Modern China Experience',
      category: 'Cultural',
      price: 1899,
      bookings: 98,
      rating: 4.7,
      isActive: true,
      images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200']
    },
    {
      _id: '3',
      title: 'Guangzhou Canton Fair Business Trip',
      category: 'Business',
      price: 1599,
      bookings: 76,
      rating: 4.6,
      isActive: false,
      images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200']
    }
  ]);
  
  const [editingTour, setEditingTour] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Update tours when prop changes
  useEffect(() => {
    if (propTours && propTours.length > 0) {
      setTours(propTours);
    }
  }, [propTours]);

  const handleEdit = async (tour: any) => {
    setEditingTour(tour);
    // In a real app, this would open a modal with an edit form
    alert(`Editing tour: ${tour.title}`);
    // For demo purposes, we'll just toggle the status
    try {
      await partnerService.updateTour(tour._id || tour.id, {
        isActive: !tour.isActive
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error updating tour:', error);
    }
  };

  const handleDelete = (tourId: string) => {
    setShowDeleteConfirm(tourId);
  };

  const confirmDelete = async (tourId: string) => {
    try {
      await partnerService.deleteTour(tourId);
      setTours(prev => prev.filter(t => (t._id || t.id) !== tourId));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
    setShowDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tours</h1>
          <p className="text-gray-500">Manage your tour listings</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Tour
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tours..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Tours List */}
      <div className="space-y-4">
        {tours.map((tour) => {
          const tourId = tour._id || tour.id;
          const status = tour.isActive !== undefined ? (tour.isActive ? 'active' : 'inactive') : tour.status;
          const image = tour.images?.[0] || tour.image;
          
          return (
          <div key={tourId} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-6">
              <img
                src={image}
                alt={tour.title}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{tour.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-semibold">
                        {tour.category}
                      </span>
                      <span>{tour.bookings} bookings</span>
                      <span>⭐ {tour.rating}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-2xl font-bold text-blue-600">
                    ${typeof tour.price === 'number' ? tour.price.toLocaleString() : tour.price}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      onClick={() => handleEdit(tour)}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                      onClick={() => handleDelete(tourId)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this tour? This action cannot be undone.</p>
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

function BookingsTab({ bookings: propBookings, loading, onRefresh }: { bookings?: any[]; loading?: boolean; onRefresh?: (status?: string) => void }) {
  const [bookingFilter, setBookingFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);

  // Default to mock data if real data isn't available
  const mockBookings = Array.from({ length: 5 }).map((_, i) => ({
    _id: `BK-${1234 + i}`,
    tourId: { title: 'Beijing Tour', duration: 7 },
    userId: { name: 'John Doe', email: 'john@email.com', phone: '+1 555-123-4567' },
    tourDate: `Mar ${15 + i}, 2026`,
    numberOfParticipants: 2,
    totalPrice: 4998,
    status: 'confirmed',
    specialRequests: 'Vegetarian meals, early check-in requested',
    paymentMethod: 'Credit Card',
    createdAt: 'Feb 20, 2026',
  }));

  // Update bookings when prop changes
  useEffect(() => {
    if (propBookings && propBookings.length > 0) {
      setBookings(propBookings);
    } else {
      setBookings(mockBookings);
    }
  }, [propBookings]);

  const handleFilterChange = (filter: 'all' | 'confirmed' | 'pending' | 'cancelled') => {
    setBookingFilter(filter);
    if (onRefresh) {
      onRefresh(filter === 'all' ? undefined : filter);
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      await partnerService.updateBookingStatus(bookingId, newStatus);
      setBookings(prev => prev.map(b => 
        (b._id || b.id) === bookingId ? { ...b, status: newStatus } : b
      ));
      if (onRefresh) onRefresh();
      alert(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const filteredBookings = bookingFilter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === bookingFilter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings Management</h1>
        <p className="text-gray-500">View and manage all tour bookings</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex gap-3">
          <button 
            className={bookingFilter === 'all' ? 'px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold' : 'px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold transition'}
            onClick={() => handleFilterChange('all')}
          >
            All ({bookings.length})
          </button>
          <button 
            className={bookingFilter === 'confirmed' ? 'px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold' : 'px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold transition'}
            onClick={() => handleFilterChange('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button 
            className={bookingFilter === 'pending' ? 'px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold' : 'px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold transition'}
            onClick={() => handleFilterChange('pending')}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button 
            className={bookingFilter === 'cancelled' ? 'px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold' : 'px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold transition'}
            onClick={() => handleFilterChange('cancelled')}
          >
            Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 bg-gray-50">
              <th className="p-4">Booking ID</th>
              <th className="p-4">Tour</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Travelers</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => {
              const bookingId = booking._id || booking.id;
              const tourTitle = booking.tourId?.title || booking.tour;
              const tourDuration = booking.tourId?.duration ? `${booking.tourId.duration} days` : booking.duration;
              const customerName = booking.userId?.name || booking.customer;
              const customerEmail = booking.userId?.email || booking.email;
              const bookingDate = booking.tourDate || booking.date;
              const travelers = booking.numberOfParticipants || booking.travelers;
              const amount = typeof booking.totalPrice === 'number' ? `$${booking.totalPrice.toLocaleString()}` : booking.amount;
              const status = booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending';
              
              return (
              <tr key={bookingId} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{bookingId.substring(0, 10)}</td>
                <td className="p-4">
                  <div className="font-semibold">{tourTitle}</div>
                  <div className="text-xs text-gray-500">{tourDuration}</div>
                </td>
                <td className="p-4">
                  <div className="font-semibold">{customerName}</div>
                  <div className="text-xs text-gray-500">{customerEmail}</div>
                </td>
                <td className="p-4">{new Date(bookingDate).toLocaleDateString()}</td>
                <td className="p-4">{travelers}</td>
                <td className="p-4 font-bold">{amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button 
                      className="text-blue-600 hover:underline text-sm font-semibold"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowBookingModal(true);
                      }}
                    >
                      View Details
                    </button>
                    {booking.status === 'pending' && (
                      <button 
                        className="text-green-600 hover:underline text-sm font-semibold"
                        onClick={() => handleStatusUpdate(bookingId, 'confirmed')}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {showBookingModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Booking Details</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Booking Status Badge */}
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="text-lg font-bold">{(selectedBooking._id || selectedBooking.id).substring(0, 15)}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedBooking.status?.charAt(0).toUpperCase() + selectedBooking.status?.slice(1) || 'Pending'}
                </span>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-semibold">{selectedBooking.userId?.name || selectedBooking.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold">{selectedBooking.userId?.email || selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-semibold">{selectedBooking.userId?.phone || selectedBooking.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-semibold">{selectedBooking.address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Tour Information */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3">Tour Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Tour Name</p>
                    <p className="font-semibold">{selectedBooking.tourId?.title || selectedBooking.tour}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold">{selectedBooking.tourId?.duration ? `${selectedBooking.tourId.duration} days` : selectedBooking.duration || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Travel Date</p>
                    <p className="font-semibold">{new Date(selectedBooking.tourDate || selectedBooking.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Travelers</p>
                    <p className="font-semibold">{selectedBooking.numberOfParticipants || selectedBooking.travelers} {(selectedBooking.numberOfParticipants || selectedBooking.travelers) === 1 ? 'person' : 'people'}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-xl font-bold text-blue-600">
                      ${typeof selectedBooking.totalPrice === 'number' ? selectedBooking.totalPrice.toLocaleString() : selectedBooking.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <p className="font-semibold">{selectedBooking.paymentMethod || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Booking Date</p>
                    <p className="font-semibold">{new Date(selectedBooking.createdAt || selectedBooking.bookingDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">Special Requests</h4>
                  <p className="text-sm text-gray-600">{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Booking details sent to customer email');
                  setShowBookingModal(false);
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Send Confirmation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RevenueTab({ data, loading }: { data?: any; loading?: boolean }) {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
  
  const mockData = {
    totalRevenue: 145680,
    commission: 21852,
    netEarnings: 123828,
    monthlyRevenue: [
      { month: 'Jan', value: 12500 },
      { month: 'Feb', value: 18200 },
      { month: 'Mar', value: 15800 },
      { month: 'Apr', value: 22400 },
      { month: 'May', value: 19800 },
      { month: 'Jun', value: 28500 },
      { month: 'Jul', value: 24600 },
      { month: 'Aug', value: 35200 },
      { month: 'Sep', value: 29800 },
      { month: 'Oct', value: 38400 },
      { month: 'Nov', value: 31500 },
      { month: 'Dec', value: 42100 },
    ],
    paymentHistory: [
      { date: 'Feb 1, 2026', desc: 'Monthly Settlement', amount: 12450, commission: 1868, net: 10582, status: 'Paid' },
      { date: 'Jan 1, 2026', desc: 'Monthly Settlement', amount: 10230, commission: 1535, net: 8695, status: 'Paid' },
    ]
  };

  const revenueData = data?.monthlyRevenue || mockData.monthlyRevenue;
  const maxRevenue = Math.max(...revenueData.map((d: any) => d.value));
  const totalRevenue = data?.totalRevenue || mockData.totalRevenue;
  const commission = data?.commission || mockData.commission;
  const netEarnings = data?.netEarnings || mockData.netEarnings;
  const paymentHistory = data?.paymentHistory || mockData.paymentHistory;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
        <p className="text-gray-500">Track your earnings and commissions</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-600">+12.5% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Commission (10%)</h3>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2">${commission.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Platform fee</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Net Earnings</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">${netEarnings.toLocaleString()}</p>
          <p className="text-sm text-purple-600">Available for payout</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Monthly Revenue</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setChartType('bar')}
                className={chartType === 'bar' ? 'px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium transition' : 'px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md text-sm font-medium transition'}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType('line')}
                className={chartType === 'line' ? 'px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium transition' : 'px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md text-sm font-medium transition'}
              >
                Line
              </button>
              <button
                onClick={() => setChartType('area')}
                className={chartType === 'area' ? 'px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium transition' : 'px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md text-sm font-medium transition'}
              >
                Area
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-around gap-3">
          {revenueData.map((data: any, i: number) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-semibold text-gray-600 w-full text-center truncate" title={`$${data.value.toLocaleString()}`}>
                ${data.value >= 1000 ? `${(data.value / 1000).toFixed(0)}K` : data.value}
              </div>
              {chartType === 'bar' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / maxRevenue) * 100}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                />
              )}
              {chartType === 'line' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / maxRevenue) * 100}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full bg-blue-600 rounded-t-lg"
                  style={{ clipPath: i % 2 === 0 ? 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)' }}
                />
              )}
              {chartType === 'area' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / maxRevenue) * 100}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full bg-gradient-to-t from-blue-600/50 to-blue-400/30 rounded-t-lg"
                />
              )}
              <span className="text-xs text-gray-500">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Payment History</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">Date</th>
              <th className="pb-3">Description</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Commission</th>
              <th className="pb-3">Net</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment: any, i: number) => (
              <tr key={i} className="border-b">
                <td className="py-4">{payment.date}</td>
                <td className="py-4">{payment.desc}</td>
                <td className="py-4 font-semibold">${payment.amount.toLocaleString()}</td>
                <td className="py-4 text-red-600">-${payment.commission.toLocaleString()}</td>
                <td className="py-4 font-bold text-green-600">{payment.net}</td>
                <td className="py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <div className="bg-white rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Tourism Bookings</h4>
              <p className="text-sm text-gray-600 mb-2">10% commission per confirmed booking</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Commission deducted before payout</li>
                <li>• Refund policy follows partner agreement</li>
                <li>• Monthly settlement on the 1st of each month</li>
              </ul>
            </div>
            <p className="text-xs text-blue-700 bg-blue-50 p-3 rounded-lg">
              💡 All bookings are subject to the standard 10% commission. Upgrade to a subscription plan for enhanced visibility and increased booking volume.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm">Available Balance</h3>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">$12,450</p>
              <p className="text-sm text-gray-500">Ready for withdrawal</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm">Pending Balance</h3>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">$3,200</p>
              <p className="text-sm text-gray-500">Processing transactions</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm">Total Earnings</h3>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-2">$45,680</p>
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
                    <span className="text-gray-700">Standard tour listing</span>
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
                  <p className="text-4xl font-bold text-blue-600">$299</p>
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
                  <p className="text-4xl font-bold text-gray-900">$999</p>
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
          availableBalance={12450}
          pendingBalance={3200}
          userType="partner"
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
                    <p className="font-bold">Bank of China</p>
                    <p className="text-sm text-gray-500">****1234</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Account Name</p>
                  <p className="font-semibold">China Elite Tours</p>
                </div>
                <div>
                  <p className="text-gray-500">SWIFT Code</p>
                  <p className="font-semibold">PCBCCNBJ</p>
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
                    <p className="text-sm text-gray-500">138****5678</p>
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

function KPICard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <Icon className={`w-5 h-5 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </p>
    </div>
  );
}

function TourPerformanceItem({
  name,
  bookings,
  revenue,
}: {
  name: string;
  bookings: number | string;
  revenue: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-gray-500">{bookings} bookings</p>
      </div>
      <p className="font-bold text-blue-600">{revenue}</p>
    </div>
  );
}

function AdvertisementsTab() {
  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'Beijing Adventure Package',
      status: 'approved',
      submittedDate: '2024-01-15',
      approvedDate: '2024-01-17',
      impressions: 15420,
      clicks: 892,
      conversions: 47,
      cost: 2800,
      revenue: 4700,
      roi: 67.9
    },
    {
      id: '2',
      title: 'Shanghai Cultural Tour',
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
      title: 'Guangzhou Food Experience',
      status: 'rejected',
      submittedDate: '2024-01-10',
      approvedDate: null,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: 0,
      revenue: 0,
      roi: 0,
      rejectionReason: 'Ad content does not meet platform guidelines'
    },
    {
      id: '4',
      title: 'Silk Road Historical Journey',
      status: 'approved',
      submittedDate: '2024-01-05',
      approvedDate: '2024-01-07',
      impressions: 28930,
      clicks: 1456,
      conversions: 89,
      cost: 4200,
      revenue: 8900,
      roi: 111.9
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
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Campaign Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Clients</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900 text-xs">{ad.title}</p>
                      <p className="text-xs text-gray-500">ID: {ad.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ad.status)}`}>
                      {getStatusText(ad.status)}
                    </span>
                    {ad.rejectionReason && (
                      <p className="text-xs text-red-600 mt-1">{ad.rejectionReason}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {new Date(ad.submittedDate).toLocaleDateString()}
                    {ad.approvedDate && (
                      <p className="text-xs text-green-600 mt-1">
                        Approved: {new Date(ad.approvedDate).toLocaleDateString()}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 text-right">{ad.impressions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-gray-900 text-right">{ad.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-gray-900 text-right">{ad.conversions}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-900 text-right">${ad.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-right">
                    <span className={`font-semibold ${ad.roi > 0 ? 'text-green-600' : 'text-gray-400'}`}>
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
          userType="partner"
        />
      )}
    </div>
  );
}

function SettingsTab() {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    companyName: 'China Elite Tours',
    contactPerson: 'Zhang Wei',
    email: 'contact@chinaelitetours.com',
    phone: '+86 10 8888 8888',
    website: 'www.chinaelitetours.com',
    description: 'Premium tour operator specializing in business and cultural tours in China',
    address: '123 Beijing Road, Beijing, China',
    taxId: '1234567890'
  });
  const [notifications, setNotifications] = useState({
    bookingAlerts: true,
    paymentNotifications: true,
    reviewNotifications: true,
    promotionalEmails: false,
    systemUpdates: true
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    changePassword: false
  });
  const [tourSettings, setTourSettings] = useState({
    autoAcceptBookings: false,
    requireDeposit: true,
    sendReminders: true,
    allowReviews: true
  });

  const sections = [
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'tour-settings', label: 'Tour Settings', icon: Package }
  ];

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: string, value: boolean) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  const handleTourSettingsChange = (key: string, value: boolean) => {
    setTourSettings(prev => ({ ...prev, [key]: value }));
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
                <div className="grid grid-cols-2 gap-6">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Description</label>
                  <textarea
                    value={profile.description}
                    onChange={(e) => handleProfileChange('description', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
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
                    <label className="font-medium text-gray-900">Booking Alerts</label>
                    <p className="text-sm text-gray-500">Receive notifications for new bookings</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.bookingAlerts}
                      onChange={(e) => handleNotificationChange('bookingAlerts', e.target.checked)}
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
                    <label className="font-medium text-gray-900">Review Notifications</label>
                    <p className="text-sm text-gray-500">Receive notifications for new reviews</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.reviewNotifications}
                      onChange={(e) => handleNotificationChange('reviewNotifications', e.target.checked)}
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

          {activeSection === 'tour-settings' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Tour Management Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Auto-Accept Bookings</label>
                    <p className="text-sm text-gray-500">Automatically accept new bookings without manual approval</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tourSettings.autoAcceptBookings}
                      onChange={(e) => handleTourSettingsChange('autoAcceptBookings', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Require Deposit</label>
                    <p className="text-sm text-gray-500">Require a deposit for all bookings</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tourSettings.requireDeposit}
                      onChange={(e) => handleTourSettingsChange('requireDeposit', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Send Reminders</label>
                    <p className="text-sm text-gray-500">Automatically send booking reminders to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tourSettings.sendReminders}
                      onChange={(e) => handleTourSettingsChange('sendReminders', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Allow Reviews</label>
                    <p className="text-sm text-gray-500">Allow customers to leave reviews for your tours</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tourSettings.allowReviews}
                      onChange={(e) => handleTourSettingsChange('allowReviews', e.target.checked)}
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
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab({ data, loading }: { data?: any; loading?: boolean }) {
  const [analyticsTab, setAnalyticsTab] = useState<'demand' | 'customer' | 'competitor' | 'revenue'>('demand');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
        <p className="text-gray-500">Unlock powerful insights for your business</p>
      </div>

      {/* Core metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Total Views</h3>
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2">{(data?.totalViews || 15682).toLocaleString()}</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Confirmed Bookings</h3>
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">{data?.confirmedBookings || 486}</p>
          <p className="text-sm text-green-600">+8% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Conversion Rate</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">{(data?.conversionRate || 3.1).toFixed(1)}%</p>
          <p className="text-sm text-green-600">+0.5% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Avg. Rating</h3>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">{(data?.avgRating || 4.8).toFixed(1)}</p>
          <p className="text-sm text-green-600">+0.2 from last month</p>
        </div>
      </div>

      {/* Tour performance list */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="font-bold text-lg mb-6">Tour Performance</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">Tour</th>
              <th className="pb-3">Views</th>
              <th className="pb-3">Bookings</th>
              <th className="pb-3">Rating</th>
              <th className="pb-3">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {(data?.tourPerformance || [
              { id: '1', title: 'Beijing Business & Culture', views: 4523, bookings: 142, rating: 4.8, revenue: 35580 },
              { id: '2', title: 'Shanghai Modern Experience', views: 3289, bookings: 98, rating: 4.7, revenue: 18602 },
              { id: '3', title: 'Guangzhou Canton Fair', views: 2145, bookings: 76, rating: 4.6, revenue: 12144 },
            ]).map((tour: any, i: number) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-4 font-medium">{tour.title}</td>
                <td className="py-4">{tour.views.toLocaleString()}</td>
                <td className="py-4">{tour.bookings}</td>
                <td className="py-4">⭐ {tour.rating}</td>
                <td className="py-4 font-semibold text-blue-600">${tour.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
                ? 'text-blue-600 border-blue-600'
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
  const tours = [
    { name: 'Beijing Business & Culture', current: 142, predicted: 178, trend: 'up' },
    { name: 'Shanghai Modern Experience', current: 98, predicted: 115, trend: 'up' },
    { name: 'Guangzhou Canton Fair', current: 76, predicted: 68, trend: 'down' },
    { name: 'Silk Road Journey', current: 64, predicted: 82, trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Overall Demand Forecast</h3>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2">+24.5%</p>
          <p className="text-sm text-green-600">Next 30 days</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Peak Demand Period</h3>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">May-Jun</p>
          <p className="text-sm text-gray-500">Based on historical data</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Low Demand Period</h3>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">Dec-Jan</p>
          <p className="text-sm text-gray-500">Consider promotions</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Tour Demand Forecast</h3>
        <div className="space-y-4">
          {tours.map((tour, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{tour.name}</span>
                <span className={`text-sm font-semibold ${tour.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {tour.trend === 'up' ? '↑' : '↓'} {Math.round(Math.abs((tour.predicted - tour.current) / tour.current * 100))}%
                </span>
              </div>
              <div className="flex gap-2 h-8">
                <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${(tour.current / 200) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-green-600 transition-all"
                    style={{ width: `${(tour.predicted / 200) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Current: {tour.current}</span>
                <span>Predicted: {tour.predicted}</span>
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
            <h3 className="text-gray-600 text-sm">Avg. Session Duration</h3>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2">4m 32s</p>
          <p className="text-sm text-green-600">+18% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Returning Customers</h3>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">38%</p>
          <p className="text-sm text-green-600">+5% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Bounce Rate</h3>
            <Activity className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">42%</p>
          <p className="text-sm text-green-600">-8% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Conversion Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">8.5%</p>
          <p className="text-sm text-green-600">+2.1% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Popular Booking Times</h3>
          <div className="space-y-3">
            {[
              { time: '9:00 AM - 12:00 PM', percentage: 35 },
              { time: '2:00 PM - 5:00 PM', percentage: 28 },
              { time: '7:00 PM - 10:00 PM', percentage: 22 },
              { time: 'Other times', percentage: 15 },
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
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Customer Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Cultural Tours', value: 68 },
              { label: 'Business Tours', value: 52 },
              { label: 'Adventure Tours', value: 45 },
              { label: 'Luxury Tours', value: 38 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-blue-600">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full bg-blue-600"
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
    { name: 'Beijing Tours Co.', price: 2499, rating: 4.5, bookings: 128, reviews: 245 },
    { name: 'China Adventure', price: 2199, rating: 4.3, bookings: 95, reviews: 189 },
    { name: 'Premium Tours China', price: 2899, rating: 4.9, bookings: 156, reviews: 312 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Your Ranking</h3>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">#2</p>
          <p className="text-sm text-gray-500">In your category</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Price Position</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">Mid-Range</p>
          <p className="text-sm text-green-600">Competitive pricing</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Market Share</h3>
            <BarChart2 className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">22%</p>
          <p className="text-sm text-green-600">+3% this quarter</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Competitor Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Competitor</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Bookings</th>
                <th className="pb-3">Reviews</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b bg-blue-50">
                <td className="py-4 font-semibold">Your Business (China Elite Tours)</td>
                <td className="py-4 font-bold text-blue-600">$2,499</td>
                <td className="py-4">⭐ 4.8</td>
                <td className="py-4 font-semibold">142</td>
                <td className="py-4">287</td>
                <td className="py-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">You</span>
                </td>
              </tr>
              {competitors.map((comp, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4 font-medium">{comp.name}</td>
                  <td className="py-4">${comp.price.toLocaleString()}</td>
                  <td className="py-4">⭐ {comp.rating}</td>
                  <td className="py-4">{comp.bookings}</td>
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
            <h4 className="font-semibold text-green-800 mb-2">✓ Higher Rating</h4>
            <p className="text-sm text-green-700">Your 4.8 rating is above average</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">✓ More Bookings</h4>
            <p className="text-sm text-green-700">Leading in monthly bookings</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <h4 className="font-semibold text-amber-800 mb-2">⚠ Price Opportunity</h4>
            <p className="text-sm text-amber-700">Consider premium positioning</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">ℹ Growth Potential</h4>
            <p className="text-sm text-blue-700">Expand review collection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueTrendReports() {
  const monthlyData = [
    { month: 'Jan', revenue: 12500, bookings: 42 },
    { month: 'Feb', revenue: 14200, bookings: 48 },
    { month: 'Mar', revenue: 13800, bookings: 45 },
    { month: 'Apr', revenue: 16500, bookings: 55 },
    { month: 'May', revenue: 18200, bookings: 62 },
    { month: 'Jun', revenue: 19500, bookings: 68 },
    { month: 'Jul', revenue: 17800, bookings: 59 },
    { month: 'Aug', revenue: 21500, bookings: 72 },
    { month: 'Sep', revenue: 19800, bookings: 65 },
    { month: 'Oct', revenue: 22500, bookings: 78 },
    { month: 'Nov', revenue: 20800, bookings: 71 },
    { month: 'Dec', revenue: 18500, bookings: 63 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">YTD Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$215,600</p>
          <p className="text-sm text-green-600">+22.5% YoY</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Avg. Monthly</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$17,967</p>
          <p className="text-sm text-green-600">+15.3% vs last year</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Best Month</h3>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$22,500</p>
          <p className="text-sm text-gray-500">October 2025</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Projected Year</h3>
            <Target className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2">$245,000</p>
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
                animate={{ height: `${(data.revenue / 25000) * 100}%` }}
                transition={{ delay: i * 0.05 }}
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
              />
              <div className="text-xs text-gray-500">{data.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Revenue by Tour Category</h3>
          <div className="space-y-4">
            {[
              { category: 'Business Tours', percentage: 45, color: 'from-blue-600 to-blue-400' },
              { category: 'Cultural Tours', percentage: 35, color: 'from-purple-600 to-purple-400' },
              { category: 'Adventure Tours', percentage: 15, color: 'from-green-600 to-green-400' },
              { category: 'Other', percentage: 5, color: 'from-gray-600 to-gray-400' },
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
              { quarter: 'Q1 2025', revenue: 40500, growth: '+12%' },
              { quarter: 'Q2 2025', revenue: 54200, growth: '+18%' },
              { quarter: 'Q3 2025', revenue: 59100, growth: '+15%' },
              { quarter: 'Q4 2025 (Projected)', revenue: 61800, growth: '+22%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold">{item.quarter}</p>
                  <p className="text-2xl font-bold text-blue-600">${(item.revenue / 1000).toFixed(1)}K</p>
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

function AutomationTab() {
  const [automationSection, setAutomationSection] = useState<'pricing' | 'expiration'>('pricing');
  
  const [peakSeasonRules, setPeakSeasonRules] = useState([
    { id: 1, name: 'Summer Peak', startDate: '2026-06-01', endDate: '2026-08-31', surcharge: 15, tours: ['Beijing Tour', 'Shanghai Tour'], active: true },
    { id: 2, name: 'Holiday Season', startDate: '2026-12-15', endDate: '2027-01-05', surcharge: 20, tours: ['All Tours'], active: true },
  ]);
  
  const [expirationAlerts, setExpirationAlerts] = useState([
    { id: 1, tourName: 'Silk Road Journey', daysRemaining: 7, status: 'warning' },
    { id: 2, tourName: 'Tibet Cultural Tour', daysRemaining: 2, status: 'critical' },
    { id: 3, tourName: 'Yangtze River Cruise', daysRemaining: 30, status: 'info' },
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Listing Automation</h1>
        <p className="text-gray-500">Automate your tour listing management</p>
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
                ? 'text-blue-600 border-blue-600'
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
    tours: ['All Tours'],
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
        tours: ['All Tours'],
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., Summer Peak"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Surcharge (%)</label>
              <input
                type="number"
                value={newRule.surcharge}
                onChange={(e) => setNewRule({ ...newRule, surcharge: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={newRule.endDate}
                onChange={(e) => setNewRule({ ...newRule, endDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
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
              <span>Applied to: {rule.tours.join(', ')}</span>
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
      alert.id === id ? { ...alert, daysRemaining: 90, status: 'info' } : alert
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
                <th className="pb-3">Tour Name</th>
                <th className="pb-3">Days Remaining</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {alerts.map((alert) => (
                <tr key={alert.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 font-medium">{alert.tourName}</td>
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