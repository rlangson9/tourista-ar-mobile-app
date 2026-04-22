import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, MousePointer, DollarSign, Users, Target, Calendar, Filter, Download, BarChart3, PieChart, Activity } from 'lucide-react';

interface AdAnalyticsData {
  id: string;
  title: string;
  advertiser: string;
  category: 'tourism' | 'trade';
  status: 'active' | 'paused' | 'expired';
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  revenue: number;
  roi: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  performance: {
    daily: { date: string; impressions: number; clicks: number }[];
    demographics: { age: string; gender: string; location: string }[];
    devices: { mobile: number; desktop: number; tablet: number };
  };
}

interface AdAnalyticsProps {
  adId?: string;
  dateRange: '7d' | '30d' | '90d' | 'custom';
  onExport?: () => void;
}

const mockAnalyticsData: AdAnalyticsData[] = [
  {
    id: 'AD001',
    title: 'Luxury Beijing Experience',
    advertiser: 'Premium Tours Ltd',
    category: 'tourism',
    status: 'active',
    impressions: 15420,
    clicks: 892,
    ctr: 5.78,
    spend: 239.70,
    revenue: 7128.08,
    roi: 2872.3,
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    targetAudience: 'Luxury travelers, Business professionals',
    performance: {
      daily: [
        { date: '2024-03-01', impressions: 520, clicks: 28 },
        { date: '2024-03-02', impressions: 480, clicks: 32 },
        { date: '2024-03-03', impressions: 510, clicks: 29 },
        { date: '2024-03-04', impressions: 490, clicks: 31 },
        { date: '2024-03-05', impressions: 530, clicks: 35 },
        { date: '2024-03-06', impressions: 510, clicks: 30 },
        { date: '2024-03-07', impressions: 520, clicks: 28 },
      ],
      demographics: [
        { age: '25-34', gender: 'Male', location: 'Beijing' },
        { age: '35-44', gender: 'Female', location: 'Shanghai' },
        { age: '25-34', gender: 'Male', location: 'Guangzhou' },
      ],
      devices: { mobile: 65, desktop: 25, tablet: 10 }
    }
  },
  {
    id: 'AD002',
    title: 'African Safari Adventure',
    advertiser: 'Safari Adventures',
    category: 'tourism',
    status: 'active',
    impressions: 8920,
    clicks: 445,
    ctr: 4.98,
    spend: 159.84,
    revenue: 3552.20,
    roi: 2120.8,
    startDate: '2024-03-15',
    endDate: '2024-05-15',
    targetAudience: 'Adventure seekers, Nature enthusiasts',
    performance: {
      daily: [
        { date: '2024-03-15', impressions: 320, clicks: 18 },
        { date: '2024-03-16', impressions: 340, clicks: 16 },
        { date: '2024-03-17', impressions: 310, clicks: 15 },
        { date: '2024-03-18', impressions: 330, clicks: 17 },
        { date: '2024-03-19', impressions: 350, clicks: 19 },
        { date: '2024-03-20', impressions: 340, clicks: 18 },
        { date: '2024-03-21', impressions: 320, clicks: 16 },
      ],
      demographics: [
        { age: '18-24', gender: 'Male', location: 'Nairobi' },
        { age: '25-34', gender: 'Female', location: 'Cape Town' },
        { age: '35-44', gender: 'Male', location: 'Johannesburg' },
      ],
      devices: { mobile: 70, desktop: 20, tablet: 10 }
    }
  },
  {
    id: 'AD003',
    title: 'Premium Electronics Supplier',
    advertiser: 'TechSource Global',
    category: 'trade',
    status: 'active',
    impressions: 12100,
    clicks: 723,
    ctr: 5.97,
    spend: 319.68,
    revenue: 5776.77,
    roi: 1706.7,
    startDate: '2024-03-10',
    endDate: '2024-06-10',
    targetAudience: 'Business owners, Procurement managers',
    performance: {
      daily: [
        { date: '2024-03-10', impressions: 420, clicks: 25 },
        { date: '2024-03-11', impressions: 440, clicks: 26 },
        { date: '2024-03-12', impressions: 430, clicks: 27 },
        { date: '2024-03-13', impressions: 450, clicks: 28 },
        { date: '2024-03-14', impressions: 460, clicks: 29 },
        { date: '2024-03-15', impressions: 440, clicks: 27 },
        { date: '2024-03-16', impressions: 420, clicks: 25 },
      ],
      demographics: [
        { age: '35-44', gender: 'Male', location: 'Shenzhen' },
        { age: '45-54', gender: 'Male', location: 'Guangzhou' },
        { age: '35-44', gender: 'Female', location: 'Shanghai' },
      ],
      devices: { mobile: 55, desktop: 35, tablet: 10 }
    }
  }
];

export function AdAnalytics({ adId, dateRange = '30d', onExport }: AdAnalyticsProps) {
  const [selectedAd, setSelectedAd] = useState<AdAnalyticsData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AdAnalyticsData[]>(mockAnalyticsData);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'audience' | 'devices'>('overview');

  useEffect(() => {
    if (adId) {
      const ad = analyticsData.find(a => a.id === adId);
      if (ad) setSelectedAd(ad);
    } else {
      setSelectedAd(analyticsData[0]);
    }
  }, [adId, analyticsData]);

  const currentAd = selectedAd || analyticsData[0];

  // Calculate totals for overview
  const totalStats = analyticsData.reduce((acc, ad) => ({
    impressions: acc.impressions + ad.impressions,
    clicks: acc.clicks + ad.clicks,
    spend: acc.spend + ad.spend,
    revenue: acc.revenue + ad.revenue,
  }), { impressions: 0, clicks: 0, spend: 0, revenue: 0 });

  const averageCTR = analyticsData.reduce((acc, ad) => acc + ad.ctr, 0) / analyticsData.length;
  const averageROI = analyticsData.reduce((acc, ad) => acc + ad.roi, 0) / analyticsData.length;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ad Analytics</h1>
          <p className="text-gray-500">Track performance and optimize campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="custom">Custom range</option>
          </select>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-green-600 font-semibold">+12.5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalStats.impressions)}</div>
          <div className="text-sm text-gray-500">Total Impressions</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <MousePointer className="w-5 h-5 text-green-600" />
            <span className="text-xs text-green-600 font-semibold">+8.3%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalStats.clicks)}</div>
          <div className="text-sm text-gray-500">Total Clicks</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-green-600 font-semibold">+2.1%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageCTR.toFixed(2)}%</div>
          <div className="text-sm text-gray-500">Average CTR</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-amber-600" />
            <span className="text-xs text-red-600 font-semibold">-5.2%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalStats.spend)}</div>
          <div className="text-sm text-gray-500">Total Spend</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-xs text-green-600 font-semibold">+15.7%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageROI.toFixed(0)}%</div>
          <div className="text-sm text-gray-500">Average ROI</div>
        </motion.div>
      </div>

      {/* Ad Selector and Tabs */}
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Ad Selector */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Select Ad:</label>
            <select
              value={currentAd?.id}
              onChange={(e) => {
                const ad = analyticsData.find(a => a.id === e.target.value);
                if (ad) setSelectedAd(ad);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {analyticsData.map((ad) => (
                <option key={ad.id} value={ad.id}>
                  {ad.title} - {ad.advertiser}
                </option>
              ))}
            </select>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentAd?.status === 'active' ? 'bg-green-100 text-green-700' :
              currentAd?.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {currentAd?.status}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'performance', label: 'Performance', icon: Activity },
            { id: 'audience', label: 'Audience', icon: Users },
            { id: 'devices', label: 'Devices', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Advertiser:</span>
                      <span className="font-medium">{currentAd?.advertiser}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{currentAd?.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{currentAd?.startDate} - {currentAd?.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Audience:</span>
                      <span className="font-medium">{currentAd?.targetAudience}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impressions:</span>
                      <span className="font-medium">{formatNumber(currentAd?.impressions || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clicks:</span>
                      <span className="font-medium">{formatNumber(currentAd?.clicks || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CTR:</span>
                      <span className="font-medium">{currentAd?.ctr.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-medium text-green-600">{currentAd?.roi.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Daily Performance</h3>
              <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Performance chart would be rendered here</p>
                  <p className="text-sm">Showing daily impressions and clicks</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audience' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Audience Demographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Age Distribution</h4>
                  <div className="space-y-2">
                    {['18-24', '25-34', '35-44', '45-54'].map((age) => (
                      <div key={age} className="flex justify-between text-sm">
                        <span>{age}</span>
                        <span className="font-medium">{Math.floor(Math.random() * 40 + 10)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Gender Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Male</span>
                      <span className="font-medium">58%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Female</span>
                      <span className="font-medium">42%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Top Locations</h4>
                  <div className="space-y-2">
                    {['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'].map((location) => (
                      <div key={location} className="flex justify-between text-sm">
                        <span>{location}</span>
                        <span className="font-medium">{Math.floor(Math.random() * 30 + 5)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'devices' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Device Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl font-bold">📱</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{currentAd?.performance.devices.mobile}%</div>
                  <div className="text-gray-600">Mobile</div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl font-bold">💻</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{currentAd?.performance.devices.desktop}%</div>
                  <div className="text-gray-600">Desktop</div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl font-bold">📱</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{currentAd?.performance.devices.tablet}%</div>
                  <div className="text-gray-600">Tablet</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
