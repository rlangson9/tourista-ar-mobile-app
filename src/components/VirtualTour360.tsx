import { useState, useRef } from 'react';
import { ArrowLeft, X, Maximize2, Info, Map, Compass, RotateCcw, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { mockTours } from '../data/mockData';

interface VirtualTour360Props {
  tourId: string | null;
  onNavigate: (screen: Screen, tourId?: string) => void;
}

export function VirtualTour360({ tourId, onNavigate }: VirtualTour360Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPanorama, setCurrentPanorama] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tour = mockTours.find((t) => t.id === tourId);

  if (!tour) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-black flex items-center justify-center">
        <button onClick={() => onNavigate('explore')} className="text-white">
          Back to Explore
        </button>
      </div>
    );
  }

  // 360° panorama images for different destinations
  const getPanoramasForTour = (tourId: string) => {
    const panoramasMap: Record<string, any[]> = {
      '1': [ // Beijing Business & Culture Tour
        {
          id: 1,
          title: 'Forbidden City Entrance',
          description: 'The grand entrance to the Forbidden City',
          image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
          video: 'https://example.com/360-video-1.mp4',
          pois: [
            { id: 1, title: 'Ticket Office', x: 20, y: 60, description: 'Purchase tickets here' },
            { id: 2, title: 'Information Desk', x: 80, y: 50, description: 'Get maps and guides' },
          ],
        },
        {
          id: 2,
          title: 'Great Wall View',
          description: 'Panoramic view from the Great Wall',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
          video: 'https://example.com/360-video-2.mp4',
          pois: [
            { id: 3, title: 'Watchtower', x: 40, y: 40, description: 'Historic watchtower' },
            { id: 4, title: 'Scenic Point', x: 60, y: 70, description: 'Best photo spot' },
          ],
        },
        {
          id: 3,
          title: 'Beijing Skyline',
          description: 'Modern Beijing skyline view',
          image: 'https://images.unsplash.com/photo-1537987333684-0b35edc29c42?w=800',
          video: 'https://example.com/360-video-3.mp4',
          pois: [
            { id: 5, title: 'CCTV Tower', x: 50, y: 30, description: 'Iconic skyscraper' },
            { id: 6, title: 'CBD Area', x: 30, y: 60, description: 'Central Business District' },
          ],
        },
      ],
      '2': [ // Safari Adventure in Tanzania
        {
          id: 1,
          title: 'Serengeti Plains',
          description: 'Endless plains of the Serengeti',
          image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
          video: 'https://example.com/360-video-1.mp4',
          pois: [
            { id: 1, title: 'Wildebeest Migration', x: 20, y: 60, description: 'View the Great Migration' },
            { id: 2, title: 'Lion Pride', x: 80, y: 50, description: 'Spot lions in their natural habitat' },
          ],
        },
        {
          id: 2,
          title: 'Ngorongoro Crater',
          description: 'The world\'s largest volcanic crater',
          image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
          video: 'https://example.com/360-video-2.mp4',
          pois: [
            { id: 3, title: 'Crater Floor', x: 40, y: 40, description: 'View wildlife from above' },
            { id: 4, title: 'Observation Point', x: 60, y: 70, description: 'Best viewing spot' },
          ],
        },
        {
          id: 3,
          title: 'Maasai Village',
          description: 'Traditional Maasai village',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          video: 'https://example.com/360-video-3.mp4',
          pois: [
            { id: 5, title: 'Maasai Hut', x: 50, y: 30, description: 'Traditional dwelling' },
            { id: 6, title: 'Cultural Center', x: 30, y: 60, description: 'Learn about Maasai culture' },
          ],
        },
      ],
      '3': [ // Shanghai Modern China Experience
        {
          id: 1,
          title: 'The Bund',
          description: 'Iconic waterfront promenade',
          image: 'https://images.unsplash.com/photo-1537987333684-0b35edc29c42?w=800',
          video: 'https://example.com/360-video-1.mp4',
          pois: [
            { id: 1, title: 'Historical Buildings', x: 20, y: 60, description: 'Colonial-era architecture' },
            { id: 2, title: 'Pudong Skyline', x: 80, y: 50, description: 'Modern skyscrapers' },
          ],
        },
        {
          id: 2,
          title: 'Yu Garden',
          description: 'Traditional Chinese garden',
          image: 'https://images.unsplash.com/photo-1560185149-3f393a4a83d9?w=800',
          video: 'https://example.com/360-video-2.mp4',
          pois: [
            { id: 3, title: 'Pavilion', x: 40, y: 40, description: 'Traditional Chinese pavilion' },
            { id: 4, title: 'Lotus Pond', x: 60, y: 70, description: 'Beautiful pond with lotus flowers' },
          ],
        },
        {
          id: 3,
          title: 'Shanghai Tower',
          description: 'Observation deck of Shanghai Tower',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
          video: 'https://example.com/360-video-3.mp4',
          pois: [
            { id: 5, title: 'Skywalk', x: 50, y: 30, description: 'Glass floor observation' },
            { id: 6, title: 'City View', x: 30, y: 60, description: '360° view of Shanghai' },
          ],
        },
      ],
    };

    return panoramasMap[tourId] || [
      {
        id: 1,
        title: 'Main Entrance',
        description: 'The grand entrance to the landmark',
        image: tour.image,
        video: 'https://example.com/360-video-1.mp4',
        pois: [
          { id: 1, title: 'Ticket Office', x: 20, y: 60, description: 'Purchase tickets here' },
          { id: 2, title: 'Information Desk', x: 80, y: 50, description: 'Get maps and guides' },
        ],
      },
      {
        id: 2,
        title: 'Main Hall',
        description: 'The central hall with historical artifacts',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        video: 'https://example.com/360-video-2.mp4',
        pois: [
          { id: 3, title: 'Exhibition Area', x: 40, y: 40, description: 'View historical exhibits' },
          { id: 4, title: 'Gift Shop', x: 60, y: 70, description: 'Buy souvenirs' },
        ],
      },
      {
        id: 3,
        title: 'Garden View',
        description: 'Beautiful gardens surrounding the landmark',
        image: 'https://images.unsplash.com/photo-1560185149-3f393a4a83d9?w=800',
        video: 'https://example.com/360-video-3.mp4',
        pois: [
          { id: 5, title: 'Fountain', x: 50, y: 30, description: 'Central fountain' },
          { id: 6, title: 'Tea House', x: 30, y: 60, description: 'Relax and enjoy tea' },
        ],
      },
    ];
  };

  const panoramas = getPanoramasForTour(tour.id);

  const currentPanoramaData = panoramas[currentPanorama];

  const handleNextPanorama = () => {
    setCurrentPanorama((prev) => (prev + 1) % panoramas.length);
  };

  const handlePrevPanorama = () => {
    setCurrentPanorama((prev) => (prev - 1 + panoramas.length) % panoramas.length);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black relative overflow-hidden">
      {/* 360° Panorama View */}
      <div className="absolute inset-0">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Panorama Image */}
            <img
              src={currentPanoramaData.image}
              alt={currentPanoramaData.title}
              className="w-full h-full object-cover"
            />
            
            {/* 360° Indicator */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">360° View</span>
            </div>

            {/* POIs (Points of Interest) */}
            {currentPanoramaData.pois.map((poi) => (
              <motion.button
                key={poi.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setSelectedPOI(poi.id)}
                className="absolute"
                style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0.5, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                >
                  <Info className="w-5 h-5 text-white" />
                </motion.div>
              </motion.button>
            ))}
          </div>
        )}
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
            <p className="text-white font-semibold text-sm">360° Virtual Tour</p>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="bg-gradient-to-t from-black/80 to-transparent pt-20 pb-4 -mx-4 px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <h2 className="text-white font-bold text-xl mb-1">{currentPanoramaData.title}</h2>
            <p className="text-blue-200 text-sm mb-4">{currentPanoramaData.description}</p>
            
            <div className="flex gap-3 mb-4">
              <button
                onClick={handlePrevPanorama}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex-1 relative">
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentPanorama + 1) / panoramas.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <div className="flex justify-between mt-1">
                  {panoramas.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentPanorama ? 'bg-blue-500' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={handleNextPanorama}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
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

      {/* Side Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 space-y-3">
        <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition">
          <Map className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* POI Detail Modal */}
      <AnimatePresence>
        {selectedPOI !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPOI(null)}
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
                onClick={() => setSelectedPOI(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
              {currentPanoramaData.pois.find((p) => p.id === selectedPOI) && (
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {currentPanoramaData.pois.find((p) => p.id === selectedPOI)?.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {currentPanoramaData.pois.find((p) => p.id === selectedPOI)?.description}
                  </p>
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Did you know?</strong> This location has a rich history dating back to the 15th century.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPOI(null);
                      onNavigate('booking', tour.id);
                    }}
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
                  >
                    Add to Itinerary
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
              <h2 className="text-2xl font-bold mb-6">How to Use 360° Tour</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Explore Panoramas</h3>
                    <p className="text-sm text-gray-300">
                      Swipe left or right to navigate between different locations
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Tap POIs</h3>
                    <p className="text-sm text-gray-300">
                      Click on info icons to learn more about points of interest
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Book Your Trip</h3>
                    <p className="text-sm text-gray-300">
                      Experience the destination virtually, then book your real visit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
