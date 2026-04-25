import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, TrendingUp, Star, MapPin, Clock, Eye, Heart, Share2, Sparkles } from 'lucide-react';
import type { Screen } from '../App';

// Ad data interface
interface AdData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  advertiser: string;
  category: 'tourism' | 'trade';
  type: 'banner' | 'card' | 'native' | 'popup';
  targetUrl: string;
  ctaText: string;
  budget: number;
  status: 'active' | 'paused' | 'expired';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  ctr: number;
  priority: number; // 1-10, higher = more prominent
  targeting: {
    regions?: string[];
    categories?: string[];
    userTypes?: string[];
  };
}

interface AdDisplayProps {
  type: 'banner' | 'card' | 'native' | 'popup' | 'sidebar';
  position: 'home' | 'explore' | 'details' | 'search' | 'profile';
  category?: 'tourism' | 'trade' | 'both';
  maxAds?: number;
  onNavigate?: (screen: Screen, itemId?: string) => void;
  onAdClick?: (adId: string) => void;
  onAdClose?: (adId: string) => void;
  className?: string;
}

// Mock ads data - in real app, this would come from API
const mockAds: AdData[] = [
  {
    id: 'AD001',
    title: 'Luxury Beijing Experience',
    description: '5-star tours with private guides and exclusive access',
    imageUrl: '/api/placeholder/400/300',
    advertiser: 'Premium Tours Ltd',
    category: 'tourism',
    type: 'banner',
    targetUrl: '/tour-details/1',
    ctaText: 'Book Now',
    budget: 5000,
    status: 'active',
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    impressions: 15420,
    clicks: 892,
    ctr: 5.78,
    priority: 9,
    targeting: {
      regions: ['china'],
      categories: ['luxury', 'business'],
      userTypes: ['premium']
    }
  },
  {
    id: 'AD002',
    title: 'African Safari Adventure',
    description: 'Wildlife tours with experienced guides',
    imageUrl: '/api/placeholder/400/300',
    advertiser: 'Safari Adventures',
    category: 'tourism',
    type: 'card',
    targetUrl: '/tour-details/safari-adventure',
    ctaText: 'Explore',
    budget: 3000,
    status: 'active',
    startDate: '2026-03-15',
    endDate: '2026-06-15',
    impressions: 8920,
    clicks: 445,
    ctr: 4.98,
    priority: 7,
    targeting: {
      regions: ['africa'],
      categories: ['adventure', 'wildlife']
    }
  },
  {
    id: 'AD003',
    title: 'Premium Electronics Supplier',
    description: 'Wholesale electronics with fast shipping',
    imageUrl: '/api/placeholder/400/300',
    advertiser: 'TechSource Global',
    category: 'trade',
    type: 'native',
    targetUrl: '/supplier/techsource',
    ctaText: 'View Products',
    budget: 4000,
    status: 'active',
    startDate: '2026-03-10',
    endDate: '2026-06-10',
    impressions: 12100,
    clicks: 723,
    ctr: 5.97,
    priority: 8,
    targeting: {
      categories: ['electronics', 'wholesale'],
      userTypes: ['business']
    }
  },
  {
    id: 'AD004',
    title: 'Shanghai Modern Experience',
    description: 'Explore the modern side of Shanghai with luxury accommodations',
    imageUrl: '/api/placeholder/400/300',
    advertiser: 'Urban Tours Co.',
    category: 'tourism',
    type: 'card',
    targetUrl: '/tour-details/shanghai-modern',
    ctaText: 'Book Now',
    budget: 3500,
    status: 'active',
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    impressions: 9850,
    clicks: 523,
    ctr: 5.31,
    priority: 8,
    targeting: {
      regions: ['china'],
      categories: ['modern', 'luxury']
    }
  }
];

export function AdDisplay({ 
  type, 
  position, 
  category = 'both', 
  maxAds = 1, 
  onNavigate, 
  onAdClick, 
  onAdClose,
  className = '' 
}: AdDisplayProps) {
  const [ads, setAds] = useState<AdData[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [impressionTracked, setImpressionTracked] = useState<Set<string>>(new Set());

  // Filter and load relevant ads
  useEffect(() => {
    let filteredAds = mockAds.filter(ad => {
      // Filter by category
      if (category !== 'both' && ad.category !== category) return false;
      
      // Filter by status
      if (ad.status !== 'active') return false;
      
      // Filter by date
      const now = new Date();
      const startDate = new Date(ad.startDate);
      const endDate = new Date(ad.endDate);
      if (now < startDate || now > endDate) return false;
      
      // Filter by type
      if (ad.type !== type) return false;
      
      return true;
    });
    
    // Sort by priority and performance
    filteredAds.sort((a, b) => {
      // Higher priority first
      if (a.priority !== b.priority) return b.priority - a.priority;
      // Higher CTR next
      return b.ctr - a.ctr;
    });
    
    setAds(filteredAds.slice(0, maxAds));
  }, [type, category, maxAds]);

  // Auto-rotate ads for banner type
  useEffect(() => {
    if (type === 'banner' && ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [type, ads.length]);

  // Track impressions
  useEffect(() => {
    if (isVisible && ads.length > 0) {
      const currentAd = ads[currentAdIndex];
      if (currentAd && !impressionTracked.has(currentAd.id)) {
        // Track impression (in real app, this would call an API)
        setImpressionTracked(prev => new Set([...prev, currentAd.id]));
        console.log(`Ad impression tracked: ${currentAd.id}`);
      }
    }
  }, [isVisible, currentAdIndex, ads, impressionTracked]);

  const handleAdClick = (ad: AdData) => {
    // Track click (in real app, this would call an API)
    console.log(`Ad clicked: ${ad.id}`);
    
    // Update click stats
    ad.clicks++;
    ad.ctr = (ad.clicks / ad.impressions) * 100;
    
    // Notify parent
    onAdClick?.(ad.id);
    
    // Navigate if target URL is provided
    if (ad.targetUrl && onNavigate) {
      // Handle navigation based on target URL
      if (ad.targetUrl.startsWith('/tour-details/')) {
        const tourId = ad.targetUrl.split('/').pop();
        onNavigate('tour-details', tourId);
      } else if (ad.targetUrl.startsWith('/supplier/')) {
        const supplierId = ad.targetUrl.split('/').pop();
        onNavigate('trade-product-detail', supplierId);
      }
    }
  };

  const handleAdClose = (adId: string) => {
    setIsVisible(false);
    onAdClose?.(adId);
  };

  if (!isVisible || ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];

  // Banner Ad Component
  if (type === 'banner') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${className}`}
          onClick={() => handleAdClick(currentAd)}
        >
          {/* Banner Image */}
          <div className="relative h-48 md:h-56">
            <img 
              src={currentAd.imageUrl} 
              alt={currentAd.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">Sponsored</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdClose(currentAd.id);
                  }}
                  className="p-1 hover:bg-white/20 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{currentAd.title}</h3>
              <p className="text-sm text-white mb-3 line-clamp-2">{currentAd.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-white">
                  by {currentAd.advertiser}
                </div>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                  {currentAd.ctaText}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Card Ad Component
  if (type === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden ${className}`}
        onClick={() => handleAdClick(currentAd)}
      >
        {/* Image */}
        <div className="relative h-32">
          <img 
            src={currentAd.imageUrl} 
            alt={currentAd.title}
            className="w-full h-full object-cover"
          />
          
          {/* Sponsored Badge */}
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            Promoted
          </div>
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdClose(currentAd.id);
            }}
            className="absolute top-2 right-2 p-1 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{currentAd.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{currentAd.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {currentAd.advertiser}
            </div>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              {currentAd.ctaText}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Native Ad Component (blends with content)
  if (type === 'native') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4 ${className}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Sponsored</span>
          </div>
          <button
            onClick={() => handleAdClose(currentAd.id)}
            className="p-1 hover:bg-blue-100 rounded-full transition"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden">
            <img 
              src={currentAd.imageUrl} 
              alt={currentAd.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">{currentAd.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{currentAd.description}</p>
            <button 
              onClick={() => handleAdClick(currentAd)}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              {currentAd.ctaText}
            </button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          by {currentAd.advertiser}
        </div>
      </motion.div>
    );
  }

  // Popup Ad Component
  if (type === 'popup') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
          >
            {/* Header */}
            <div className="relative h-48">
              <img 
                src={currentAd.imageUrl} 
                alt={currentAd.title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <button
                onClick={() => handleAdClose(currentAd.id)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">SPONSORED</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{currentAd.title}</h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-4">{currentAd.description}</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleAdClick(currentAd)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  {currentAd.ctaText}
                </button>
                <button
                  onClick={() => handleAdClose(currentAd.id)}
                  className="px-6 py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
                >
                  Maybe Later
                </button>
              </div>
              
              <div className="text-xs text-gray-500 mt-4 text-center">
                by {currentAd.advertiser}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Sidebar Ad Component
  if (type === 'sidebar') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white rounded-2xl shadow-md p-4 ${className}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-amber-600">Sponsored</span>
          </div>
          <button
            onClick={() => handleAdClose(currentAd.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-3">
          <img 
            src={currentAd.imageUrl} 
            alt={currentAd.title}
            className="w-full h-32 object-cover rounded-xl"
          />
          
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">{currentAd.title}</h3>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{currentAd.description}</p>
            <button 
              onClick={() => handleAdClick(currentAd)}
              className="text-blue-600 text-xs font-semibold hover:underline"
            >
              {currentAd.ctaText}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}

// Ad Manager Component for managing multiple ad placements
export function AdManager({ onNavigate }: { onNavigate: (screen: Screen, itemId?: string) => void }) {
  const [adStats, setAdStats] = useState({
    totalImpressions: 0,
    totalClicks: 0,
    averageCTR: 0,
    revenueGenerated: 0
  });

  const handleAdClick = (adId: string) => {
    console.log(`Ad clicked: ${adId}`);
    // Update stats
    setAdStats(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      revenueGenerated: prev.revenueGenerated + 7.99 // $7.99 per click
    }));
  };

  const handleAdClose = (adId: string) => {
    console.log(`Ad closed: ${adId}`);
  };

  return (
    <div className="space-y-6">
      {/* Banner Ad */}
      <AdDisplay
        type="banner"
        position="home"
        category="tourism"
        onNavigate={onNavigate}
        onAdClick={handleAdClick}
        onAdClose={handleAdClose}
      />
      
      {/* Native Ad */}
      <AdDisplay
        type="native"
        position="home"
        category="both"
        onNavigate={onNavigate}
        onAdClick={handleAdClick}
        onAdClose={handleAdClose}
      />
      
      {/* Card Ads Grid */}
      <div className="grid grid-cols-2 gap-4">
        <AdDisplay
          type="card"
          position="home"
          category="tourism"
          onNavigate={onNavigate}
          onAdClick={handleAdClick}
          onAdClose={handleAdClose}
        />
        <AdDisplay
          type="card"
          position="home"
          category="trade"
          onNavigate={onNavigate}
          onAdClick={handleAdClick}
          onAdClose={handleAdClose}
        />
      </div>
    </div>
  );
}
