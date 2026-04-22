import { useState, useEffect } from 'react';
import { ArrowLeft, X, Maximize2, Info, Sparkles, Camera, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { BottomNav } from './BottomNav';
import { mockTours } from '../data/mockData';

interface ARExperienceProps {
  tourId: string | null;
  onNavigate: (screen: Screen, tourId?: string) => void;
}

export function ARExperience({ tourId, onNavigate }: ARExperienceProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  const tour = mockTours.find((t) => t.id === tourId);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!tour) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-black flex items-center justify-center">
        <button onClick={() => onNavigate('explore')} className="text-white">
          Back to Explore
        </button>
      </div>
    );
  }

  // AR hotspots for different destinations
  const getHotspotsForTour = (tourId: string) => {
    const hotspotsMap: Record<string, any[]> = {
      '1': [ // Beijing Business & Culture Tour
        {
          id: 1,
          title: 'Forbidden City',
          description: 'Explore the imperial palace with AR guides',
          x: 30,
          y: 40,
        },
        {
          id: 2,
          title: 'Great Wall',
          description: 'Walk along the ancient wall with AR history lessons',
          x: 60,
          y: 50,
        },
        {
          id: 3,
          title: 'Beijing CBD',
          description: 'Discover modern Beijing with AR business insights',
          x: 45,
          y: 70,
        },
      ],
      '2': [ // Safari Adventure in Tanzania
        {
          id: 1,
          title: 'Serengeti Plains',
          description: 'Spot wildlife with AR identification',
          x: 30,
          y: 40,
        },
        {
          id: 2,
          title: 'Ngorongoro Crater',
          description: 'Explore the crater with AR geological information',
          x: 60,
          y: 50,
        },
        {
          id: 3,
          title: 'Maasai Village',
          description: 'Learn about Maasai culture with AR storytelling',
          x: 45,
          y: 70,
        },
      ],
      '3': [ // Shanghai Modern China Experience
        {
          id: 1,
          title: 'The Bund',
          description: 'Discover historical buildings with AR guides',
          x: 30,
          y: 40,
        },
        {
          id: 2,
          title: 'Yu Garden',
          description: 'Explore traditional Chinese gardens with AR insights',
          x: 60,
          y: 50,
        },
        {
          id: 3,
          title: 'Shanghai Tower',
          description: 'Experience the skyscraper with AR architecture details',
          x: 45,
          y: 70,
        },
      ],
    };

    return hotspotsMap[tourId] || [
      {
        id: 1,
        title: tour.highlights[0] || 'Main Attraction',
        description: 'Experience the iconic landmark in immersive AR',
        x: 30,
        y: 40,
      },
      {
        id: 2,
        title: tour.highlights[1] || 'Cultural Site',
        description: 'Learn about local culture and traditions',
        x: 60,
        y: 50,
      },
      {
        id: 3,
        title: tour.highlights[2] || 'Popular Spot',
        description: 'Discover hidden gems and local favorites',
        x: 45,
        y: 70,
      },
    ];
  };

  const hotspots = getHotspotsForTour(tour.id);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black relative overflow-hidden">
      {/* AR Camera View (Simulated) */}
      <div className="absolute inset-0">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover opacity-80"
        />
        {/* AR Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        
        {/* Scanning Effect */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'linear' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-lg"
              style={{ filter: 'blur(2px)' }}
            />
          )}
        </AnimatePresence>

        {/* AR Grid Overlay */}
        {!isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* AR Hotspots */}
        {!isScanning && hotspots.map((hotspot) => (
          <motion.button
            key={hotspot.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: hotspot.id * 0.2 }}
            onClick={() => setSelectedHotspot(hotspot.id)}
            className="absolute"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            {/* Pulsing Ring */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 -m-8 w-16 h-16 border-2 border-blue-400 rounded-full"
            />
            {/* Icon */}
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border-2 border-white relative z-10">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('explore')}
            className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <p className="text-white font-semibold text-sm">AR Preview Mode</p>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scanning Status */}
      {isScanning && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white font-semibold text-lg">Scanning Environment...</p>
          <p className="text-blue-200 text-sm mt-2">Point your camera at a surface</p>
        </div>
      )}

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="bg-gradient-to-t from-black/80 to-transparent pt-20 pb-4 -mx-4 px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <h2 className="text-white font-bold text-xl mb-2">{tour.title}</h2>
            <p className="text-blue-200 text-sm mb-4">{tour.location}</p>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('tour-details', tour.id)}
                className="flex-1 bg-white text-gray-900 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                View Details
              </button>
              <button
                onClick={() => onNavigate('booking', tour.id)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AR Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 space-y-3">
        <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition">
          <Camera className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Hotspot Detail Modal */}
      <AnimatePresence>
        {selectedHotspot !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHotspot(null)}
              className="absolute inset-0 bg-black/70 z-30"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-40"
            >
              <button
                onClick={() => setSelectedHotspot(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
              {hotspots.find((h) => h.id === selectedHotspot) && (
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {hotspots.find((h) => h.id === selectedHotspot)?.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {hotspots.find((h) => h.id === selectedHotspot)?.description}
                  </p>
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Cultural Tip:</strong> This location is best visited during early morning or late afternoon for optimal lighting and fewer crowds.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedHotspot(null);
                      onNavigate('booking', tour.id);
                    }}
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
                  >
                    Book This Experience
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl z-40 p-6"
          >
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-white mt-16">
              <h2 className="text-2xl font-bold mb-6">How to Use AR Preview</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Point Your Camera</h3>
                    <p className="text-sm text-gray-300">
                      Aim your device at a flat surface to place the AR preview
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Tap Hotspots</h3>
                    <p className="text-sm text-gray-300">
                      Click on glowing points to learn more about each location
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Explore & Book</h3>
                    <p className="text-sm text-gray-300">
                      Experience the destination virtually, then book your real trip
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="ar-experience" onNavigate={onNavigate} />
    </div>
  );
}
