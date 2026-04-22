import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, TrendingUp } from 'lucide-react';
import type { Screen } from '../App';

interface AdPopupData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  advertiser: string;
  ctaText: string;
  targetUrl: string;
  delay: number; // seconds before showing
  trigger: 'timer' | 'scroll' | 'exit' | 'manual';
  frequency: 'once' | 'daily' | 'always';
}

interface AdPopupProps {
  ad: AdPopupData;
  onNavigate?: (screen: Screen, itemId?: string) => void;
  onClose?: () => void;
  onAdClick?: (adId: string) => void;
}

const mockPopupAds: AdPopupData[] = [
  {
    id: 'POPUP001',
    title: 'Special Offer - Beijing Tours',
    description: 'Get 20% off on all Beijing tours this week. Limited time offer!',
    imageUrl: '/api/placeholder/400/300',
    advertiser: 'Beijing Travel Co',
    ctaText: 'View Tours',
    targetUrl: '/explore?region=china',
    delay: 5,
    trigger: 'timer',
    frequency: 'once'
  },
  {
    id: 'POPUP002',
    title: 'Premium Supplier Membership',
    description: 'Join our premium supplier program and get exclusive benefits',
    imageUrl: '/api/placeholder/400/300',
    advertiser: 'Tourista B2B',
    ctaText: 'Learn More',
    targetUrl: '/partner-dashboard',
    delay: 0,
    trigger: 'manual',
    frequency: 'daily'
  }
];

export function AdPopup({ ad, onNavigate, onClose, onAdClick }: AdPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // Check if ad should be shown based on frequency
  const shouldShowAd = () => {
    const storageKey = `popup_ad_${ad.id}_${new Date().toDateString()}`;
    const lastShown = localStorage.getItem(storageKey);
    
    if (ad.frequency === 'once' && lastShown) return false;
    if (ad.frequency === 'daily' && lastShown === new Date().toDateString()) return false;
    
    return true;
  };

  // Mark ad as shown
  const markAdAsShown = () => {
    const storageKey = `popup_ad_${ad.id}_${new Date().toDateString()}`;
    localStorage.setItem(storageKey, new Date().toDateString());
    setHasBeenShown(true);
  };

  // Trigger popup based on trigger type
  useEffect(() => {
    if (!shouldShowAd() || hasBeenShown) return;

    let timeout: NodeJS.Timeout;

    switch (ad.trigger) {
      case 'timer':
        timeout = setTimeout(() => {
          setIsVisible(true);
          markAdAsShown();
        }, ad.delay * 1000);
        break;
      
      case 'scroll':
        const handleScroll = () => {
          if (window.scrollY > window.innerHeight * 0.5) {
            setIsVisible(true);
            markAdAsShown();
            window.removeEventListener('scroll', handleScroll);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      
      case 'exit':
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            setIsVisible(true);
            markAdAsShown();
            window.removeEventListener('mouseleave', handleMouseLeave);
          }
        };
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => window.removeEventListener('mouseleave', handleMouseLeave);
      
      case 'manual':
        // Will be triggered manually
        break;
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [ad.trigger, ad.delay, hasBeenShown]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleAdClick = () => {
    onAdClick?.(ad.id);
    
    // Navigate if target URL is provided
    if (ad.targetUrl && onNavigate) {
      // Handle navigation based on target URL
      if (ad.targetUrl.includes('explore')) {
        onNavigate('explore');
      } else if (ad.targetUrl.includes('partner-dashboard')) {
        onNavigate('partner-dashboard');
      }
    }
    
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-48">
              <img 
                src={ad.imageUrl} 
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Sponsored Badge */}
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">SPONSORED</span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{ad.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{ad.description}</p>
              
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAdClick}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {ad.ctaText}
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
                >
                  Maybe Later
                </button>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                by {ad.advertiser}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Popup Manager for handling multiple popups
export function AdPopupManager({ 
  onNavigate, 
  onAdClick, 
  onClose 
}: { 
  onNavigate?: (screen: Screen, itemId?: string) => void;
  onAdClick?: (adId: string) => void;
  onClose?: () => void;
}) {
  const [activePopup, setActivePopup] = useState<AdPopupData | null>(null);

  // Show a specific popup manually
  const showPopup = (popupId: string) => {
    const popup = mockPopupAds.find(ad => ad.id === popupId && ad.trigger === 'manual');
    if (popup) {
      setActivePopup(popup);
    }
  };

  // Expose method to show popup globally
  useEffect(() => {
    (window as any).showAdPopup = showPopup;
    return () => {
      delete (window as any).showAdPopup;
    };
  }, []);

  if (!activePopup) return null;

  return (
    <AdPopup
      ad={activePopup}
      onNavigate={onNavigate}
      onAdClick={onAdClick}
      onClose={() => {
        setActivePopup(null);
        onClose?.();
      }}
    />
  );
}

// Hook for manual popup triggering
export function useAdPopup() {
  const showPopup = (popupId: string) => {
    if ((window as any).showAdPopup) {
      (window as any).showAdPopup(popupId);
    }
  };

  return { showPopup };
}
