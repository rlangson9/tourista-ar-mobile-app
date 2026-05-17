import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Heart, Star, MapPin, Clock, Users, Check, X, Sparkles, ChevronDown, ChevronUp, Download, Save, Wifi, ThumbsUp, Image as ImageIcon, MessageSquare, ChevronLeft, Camera, MessageCircle, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { BottomNav } from './BottomNav';
import { mockTours, Review, RatingBreakdown } from '../data/mockData';
import { AdDisplay } from './AdDisplay';
import { CulturalLocalization } from './CulturalLocalization';
import { ReviewForm } from './ReviewForm';

interface TourDetailsProps {
  tourId: string | null;
  onNavigate: (screen: Screen, tourId?: string) => void;
}

export function TourDetails({ tourId, onNavigate }: TourDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [downloadedItems, setDownloadedItems] = useState<{
    itinerary: boolean;
    map: boolean;
    arAssets: boolean;
  }>({
    itinerary: false,
    map: false,
    arAssets: false,
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [helpfulReplies, setHelpfulReplies] = useState<Set<string>>(new Set());

  const tour = mockTours.find((t) => t.id === tourId);
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [tourReviews, setTourReviews] = useState<Review[]>(tour?.userReviews || []);
  const [tourReviewCount, setTourReviewCount] = useState(tour?.reviews || 0);
  const [tourRating, setTourRating] = useState(tour?.rating || 0);

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if items are already downloaded (simulated for demo)
    const savedItems = localStorage.getItem(`downloaded_${tourId}`);
    if (savedItems) {
      setDownloadedItems(JSON.parse(savedItems));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [tourId]);

  const shareTour = async () => {
    if (!tour) return;

    try {
      setShareError(null);
      
      // Generate deep link
      const deepLink = `${window.location.origin}${window.location.pathname}#/tour/${tour.id}`;
      
      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: tour.title,
          text: tour.description,
          url: deepLink,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(deepLink);
        showNotification('Share link copied to clipboard!');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setShareError('Failed to share tour information');
        console.error('Share error:', error);
        showNotification('Failed to share tour information', 'error');
      }
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    console.log('Showing notification:', message, type);
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const downloadItinerary = () => {
    if (!tour) return;
    console.log('Downloading itinerary...');
    
    // Simulate downloading itinerary
    setTimeout(() => {
      console.log('Itinerary downloaded, showing notification');
      const updatedDownloads = { ...downloadedItems, itinerary: true };
      setDownloadedItems(updatedDownloads);
      localStorage.setItem(`downloaded_${tourId}`, JSON.stringify(updatedDownloads));
      showNotification('Itinerary downloaded successfully!');
    }, 1000);
  };

  const downloadMap = () => {
    if (!tour) return;
    console.log('Downloading map...');
    
    // Simulate downloading map
    setTimeout(() => {
      console.log('Map downloaded, showing notification');
      const updatedDownloads = { ...downloadedItems, map: true };
      setDownloadedItems(updatedDownloads);
      localStorage.setItem(`downloaded_${tourId}`, JSON.stringify(updatedDownloads));
      showNotification('Map downloaded successfully!');
    }, 1000);
  };

  const downloadARAssets = () => {
    if (!tour) return;
    console.log('Downloading AR assets...');
    
    // Simulate downloading AR assets
    setTimeout(() => {
      console.log('AR assets downloaded, showing notification');
      const updatedDownloads = { ...downloadedItems, arAssets: true };
      setDownloadedItems(updatedDownloads);
      localStorage.setItem(`downloaded_${tourId}`, JSON.stringify(updatedDownloads));
      showNotification('AR assets downloaded successfully!');
    }, 1500);
  };

  const handleReviewSubmit = (reviewData: Omit<Review, 'id' | 'userId' | 'userName' | 'userAvatar' | 'date' | 'helpful' | 'isVerified'>) => {
    if (!tour) return;

    // Create new review with generated data
    const newReview: Review = {
      id: `tr${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      rating: reviewData.rating,
      date: new Date().toISOString().split('T')[0],
      title: reviewData.title,
      content: reviewData.content,
      photos: reviewData.photos,
      videos: reviewData.videos || [],
      helpful: 0,
      tags: reviewData.tags,
      isVerified: true
    };

    // Update reviews state
    const updatedReviews = [newReview, ...tourReviews];
    setTourReviews(updatedReviews);
    setTourReviewCount(tourReviewCount + 1);

    // Calculate new average rating
    const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
    const newAverageRating = totalRating / updatedReviews.length;
    setTourRating(parseFloat(newAverageRating.toFixed(1)));

    // Close the review form
    setShowReviewForm(false);
    showNotification('Review submitted successfully!');
  };

  const handleReplySubmit = (reviewId: string) => {
    if (!tour || !replyContent.trim()) return;

    // Create new reply
    const newReply = {
      id: `rp${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      date: new Date().toISOString().split('T')[0],
      content: replyContent.trim(),
      helpful: 0,
      isVerified: true
    };

    // Update reviews state with the new reply
    const updatedReviews = tourReviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          replies: [...(review.replies || []), newReply]
        };
      }
      return review;
    });

    setTourReviews(updatedReviews);
    setReplyingTo(null);
    setReplyContent('');
    showNotification('Reply submitted successfully!');
  };

  if (!tour) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Tour not found</p>
          <button
            onClick={() => onNavigate('explore')}
            className="mt-4 text-blue-600 font-semibold"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const images = [
    tour.image,
    'https://images.unsplash.com/photo-1501785888041-af3ef281b399?w=800',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative">
        <img
          src={images[selectedImage]}
          alt={tour.title}
          className="w-full h-80 object-cover"
        />
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('explore')}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${isOnline ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              <Wifi className="w-3 h-3" />
              {isOnline ? 'Online' : 'Offline'}
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button 
              onClick={shareTour}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
              aria-label="Share tour"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AR & Virtual Tour Badges */}
        <div className="absolute bottom-3 right-3 flex gap-2" style={{ marginLeft: '37px', marginRight: '37px' }}>
          <button
            onClick={() => onNavigate('ar-experience', tour.id)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg"
            aria-label="View AR experience"
          >
            AR
          </button>
          <button
            onClick={() => onNavigate('virtual-tour-360', tour.id)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg"
            style={{ marginLeft: '-2px', marginRight: '-2px' }}
            aria-label="View 360° virtual tour"
          >
            360°
          </button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white pl-[2px] pr-[2px] py-1 rounded-full text-sm" style={{ left: '373px', marginLeft: '-5px', marginRight: '-5px' }}>
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
              selectedImage === idx ? 'border-blue-600' : 'border-transparent'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title & Rating */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 flex-1">{tour.title}</h1>
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{tour.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{tour.location}</span>
          </div>

        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Duration</p>
            <p className="font-bold text-sm">{tour.duration}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Group Size</p>
            <p className="font-bold text-sm">Max {tour.maxGroupSize}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Languages</p>
            <p className="font-bold text-sm">{tour.languages[0]}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-bold mb-3">About This Tour</h2>
          <p className="text-gray-600 leading-relaxed">{tour.description}</p>
        </div>

        {/* Native Ad */}
        <AdDisplay
          type="native"
          position="details"
          category="tourism"
          onNavigate={onNavigate}
          onAdClick={(adId) => console.log(`Details native ad clicked: ${adId}`)}
          onAdClose={(adId) => console.log(`Details native ad closed: ${adId}`)}
        />

        {/* Highlights */}
        <div>
          <h2 className="text-xl font-bold mb-3">Tour Highlights</h2>
          <div className="space-y-2">
            {tour.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Localization */}
        <CulturalLocalization country={tour.country} />

        {/* Itinerary */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Day by Day Itinerary</h2>
            <button
              onClick={() => setShowFullItinerary(!showFullItinerary)}
              className="text-blue-600 text-sm font-semibold flex items-center gap-1"
            >
              {showFullItinerary ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          <div className="space-y-4">
            {tour.itinerary.slice(0, showFullItinerary ? undefined : 3).map((day) => (
              <div key={day.day} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {day.day}
                  </div>
                  {day.day < tour.itinerary.length && (
                    <div className="w-0.5 h-full bg-blue-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="font-bold text-gray-900 mb-1">{day.title}</h3>
                  <p className="text-gray-600 text-sm">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Included/Excluded */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              What's Included
            </h3>
            <ul className="space-y-2">
              {tour.included.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <X className="w-5 h-5 text-red-600" />
              What's Not Included
            </h3>
            <ul className="space-y-2">
              {tour.excluded.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Reviews ({tourReviewCount})</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowReviewForm(true)}
                className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors group"
              >
                <Edit className="w-4 h-4" />
                Write a Review
              </button>
              <button 
                onClick={() => setShowReviewsModal(true)}
                className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:text-blue-800 transition-colors group"
              >
                View All
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
          
          {/* Rating Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-500">{tourRating}</p>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= Math.floor(tourRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">{tourReviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = tourReviews.filter(r => r.rating === rating).length;
                  const percentage = tourReviewCount > 0 ? (count / tourReviewCount) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-6">{rating}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Preview Reviews */}
          <div className="space-y-4">
            {tourReviews.slice(0, 2).map((review: Review) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.userAvatar} 
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{review.userName}</p>
                        {review.isVerified && (
                          <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{review.content}</p>
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {review.tags.map((tag, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-2 mb-2 overflow-x-auto">
                    {review.photos.slice(0, 3).map((photo, idx) => (
                      <img 
                        key={idx}
                        src={photo}
                        alt={`Review photo ${idx + 1}`}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    ))}
                    {review.photos.length > 3 && (
                      <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500 font-semibold">+{review.photos.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
                {review.videos && review.videos.length > 0 && (
                  <div className="flex gap-2 mb-2 overflow-x-auto">
                    {review.videos.map((video, idx) => (
                      <div key={`video-${idx}`} className="relative rounded-lg overflow-hidden w-20 h-20 bg-gray-900 flex-shrink-0">
                        <video src={video} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      const newHelpful = new Set(helpfulReviews);
                      newHelpful.has(review.id) ? newHelpful.delete(review.id) : newHelpful.add(review.id);
                      setHelpfulReviews(newHelpful);
                    }}
                    className={`flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full ${
                      helpfulReviews.has(review.id)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${helpfulReviews.has(review.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                    <span>{helpfulReviews.has(review.id) ? review.helpful + 1 : review.helpful} Helpful</span>
                  </button>
                  <button 
                    onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    className="flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full text-gray-500 hover:bg-gray-100"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </button>
                  <button 
                    onClick={() => showNotification('Review reported. Our team will investigate.', 'success')}
                    className="flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full text-gray-500 hover:bg-gray-100"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Report</span>
                  </button>
                </div>
                
                {/* Reply Form */}
                {replyingTo === review.id && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(review.id)}
                        disabled={!replyContent.trim()}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full transition ${
                          replyContent.trim()
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500'
                        }`}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Replies */}
                {review.replies && review.replies.length > 0 && (
                  <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-100">
                    {review.replies.map((reply) => (
                      <div key={reply.id} className="bg-white p-3 rounded-lg border border-gray-100">
                        <div className="flex items-start gap-2 mb-1">
                          <img 
                            src={reply.userAvatar} 
                            alt={reply.userName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-xs">{reply.userName}</p>
                              {reply.isVerified && (
                                <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-xs font-semibold">
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{reply.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{reply.content}</p>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              const newHelpful = new Set(helpfulReplies);
                              newHelpful.has(reply.id) ? newHelpful.delete(reply.id) : newHelpful.add(reply.id);
                              setHelpfulReplies(newHelpful);
                            }}
                            className={`flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full ${
                              helpfulReplies.has(reply.id)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            <ThumbsUp className={`w-3 h-3 ${helpfulReplies.has(reply.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                            <span>{helpfulReplies.has(reply.id) ? reply.helpful + 1 : reply.helpful} Helpful</span>
                          </button>
                          <button 
                            onClick={() => showNotification('Reply reported. Our team will investigate.', 'success')}
                            className="flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full text-gray-500 hover:bg-gray-100"
                          >
                            <X className="w-3 h-3" />
                            <span>Report</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partner Info */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-2">Tour Operator</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-600">
              {tour.partnerName.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{tour.partnerName}</p>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{tour.rating} rating</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('message', undefined, 'p1', tour.partnerName)}
              className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div>
          <h2 className="text-xl font-bold mb-3">Cancellation Policy</h2>
          <p className="text-gray-600 text-sm">{tour.cancellationPolicy}</p>
        </div>

        {/* Download Section for Offline Use */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Save className="w-5 h-5 text-blue-600" />
            Offline Access
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Download these items to access them offline during your trip
          </p>
          <div className="space-y-3">
            <button
              onClick={downloadItinerary}
              disabled={downloadedItems.itinerary}
              className={`w-full p-4 rounded-xl border-2 transition flex items-center justify-between ${downloadedItems.itinerary ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${downloadedItems.itinerary ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {downloadedItems.itinerary ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold">Tour Itinerary</h3>
                  <p className="text-xs text-gray-600">Download day-by-day schedule</p>
                </div>
              </div>
              {downloadedItems.itinerary && (
                <span className="text-xs font-semibold text-green-600">Downloaded</span>
              )}
            </button>
            <button
              onClick={downloadMap}
              disabled={downloadedItems.map}
              className={`w-full p-4 rounded-xl border-2 transition flex items-center justify-between ${downloadedItems.map ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${downloadedItems.map ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {downloadedItems.map ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold">Tour Map</h3>
                  <p className="text-xs text-gray-600">Download detailed map</p>
                </div>
              </div>
              {downloadedItems.map && (
                <span className="text-xs font-semibold text-green-600">Downloaded</span>
              )}
            </button>
            <button
              onClick={downloadARAssets}
              disabled={downloadedItems.arAssets}
              className={`w-full p-4 rounded-xl border-2 transition flex items-center justify-between ${downloadedItems.arAssets ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${downloadedItems.arAssets ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {downloadedItems.arAssets ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold">AR Assets</h3>
                  <p className="text-xs text-gray-600">Download AR experience assets</p>
                </div>
              </div>
              {downloadedItems.arAssets && (
                <span className="text-xs font-semibold text-green-600">Downloaded</span>
              )}
            </button>
          </div>
        </div>

        {/* Spacer for fixed bottom bar */}
        <div className="h-24" />
      </div>

      {/* Fixed Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="text-2xl font-bold text-gray-900">
              ${tour.price}
              <span className="text-sm text-gray-500 font-normal"> / person</span>
            </p>
            {tour.soldOut && (
              <p className="text-xs text-amber-600 font-semibold mt-1">
                Currently sold out - Join waitlist
              </p>
            )}
          </div>
          <button
            onClick={() => onNavigate(tour.soldOut ? 'booking' : 'bookings', tour.id)}
            className={`flex-1 py-4 rounded-full font-bold transition ${tour.soldOut ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {tour.soldOut ? 'Join Waitlist' : 'Book Now'}
          </button>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              // Open AI assistant with tour context
              window.dispatchEvent(new CustomEvent('openAIAssistant'));
            }}
            className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-full font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with AI
          </button>
        </div>
      </div>

      {/* iPhone-style Notification */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 p-4 flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        style={{ 
          display: notification.show ? 'flex' : 'none',
          transform: notification.show ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease'
        }}
      >
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          {notification.type === 'success' ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
        </div>
        <p className="text-sm font-medium">{notification.message}</p>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <ReviewForm
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
            type="tour"
          />
        )}
      </AnimatePresence>

      {/* Test Notification Button */}
      <button 
        onClick={() => showNotification('Test notification!', 'success')}
        className="fixed top-10 left-10 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Test Notification
      </button>

      {/* Dianping-style Reviews Modal */}
      <AnimatePresence>
        {showReviewsModal && tour.userReviews && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewsModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setShowReviewsModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h2 className="text-xl font-bold">Reviews ({tour.reviews})</h2>
                  <div className="w-10" />
                </div>
                
                {/* Filter Bar */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { key: 'all', label: 'All' },
                    { key: '5', label: '5★' },
                    { key: '4', label: '4★' },
                    { key: '3', label: '3★' },
                    { key: '2', label: '2★' },
                    { key: '1', label: '1★' }
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setSelectedFilter(filter.key as any)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap transform hover:scale-105 ${
                        selectedFilter === filter.key 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Rating Summary in Modal */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-amber-500">{tourRating}</p>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= Math.floor(tourRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{tourReviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = tourReviews.filter(r => r.rating === rating).length;
                      const percentage = tourReviewCount > 0 ? (count / tourReviewCount) * 100 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 w-6">{rating}</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Reviews List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(() => {
                  const filteredReviews = selectedFilter === 'all'
                    ? tourReviews
                    : tourReviews.filter(r => r.rating === parseInt(selectedFilter));
                  
                  if (filteredReviews.length === 0) {
                    return (
                      <div className="text-center py-12">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No reviews for this rating</p>
                      </div>
                    );
                  }
                  
                  return filteredReviews.map((review: Review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img 
                            src={review.userAvatar} 
                            alt={review.userName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{review.userName}</p>
                              {review.isVerified && (
                                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold">
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{review.content}</p>
                      {review.tags && review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {review.tags.map((tag, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mb-2 overflow-x-auto">
                          {review.photos.map((photo, idx) => (
                            <img 
                              key={idx}
                              src={photo}
                              alt={`Review photo ${idx + 1}`}
                              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => {
                            const newHelpful = new Set(helpfulReviews);
                            newHelpful.has(review.id) ? newHelpful.delete(review.id) : newHelpful.add(review.id);
                            setHelpfulReviews(newHelpful);
                          }}
                          className={`flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full ${
                            helpfulReviews.has(review.id)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${helpfulReviews.has(review.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                          <span>{helpfulReviews.has(review.id) ? review.helpful + 1 : review.helpful} Helpful</span>
                        </button>
                        <button 
                          onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                          className="flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full text-gray-500 hover:bg-gray-100"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                        <button 
                          onClick={() => showNotification('Review reported. Our team will investigate.', 'success')}
                          className="flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full text-gray-500 hover:bg-gray-100"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Report</span>
                        </button>
                      </div>
                      
                      {/* Reply Form */}
                      {replyingTo === review.id && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent('');
                              }}
                              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReplySubmit(review.id)}
                              disabled={!replyContent.trim()}
                              className={`px-3 py-1.5 text-sm font-medium rounded-full transition ${
                                replyContent.trim()
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-300 text-gray-500'
                              }`}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Replies */}
                      {review.replies && review.replies.length > 0 && (
                        <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-100">
                          {review.replies.map((reply) => (
                            <div key={reply.id} className="bg-white p-3 rounded-lg border border-gray-100">
                              <div className="flex items-start gap-2 mb-1">
                                <img 
                                  src={reply.userAvatar} 
                                  alt={reply.userName}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-xs">{reply.userName}</p>
                                    {reply.isVerified && (
                                      <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-xs font-semibold">
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500">{reply.date}</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{reply.content}</p>
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => {
                                    const newHelpful = new Set(helpfulReplies);
                                    newHelpful.has(reply.id) ? newHelpful.delete(reply.id) : newHelpful.add(reply.id);
                                    setHelpfulReplies(newHelpful);
                                  }}
                                  className={`flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full ${
                                    helpfulReplies.has(reply.id)
                                      ? 'bg-blue-50 text-blue-600'
                                      : 'text-gray-500 hover:bg-gray-100'
                                  }`}
                                >
                                  <ThumbsUp className={`w-3 h-3 ${helpfulReplies.has(reply.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                                  <span>{helpfulReplies.has(reply.id) ? reply.helpful + 1 : reply.helpful} Helpful</span>
                                </button>
                                <button 
                                  onClick={() => showNotification('Reply reported. Our team will investigate.', 'success')}
                                  className="flex items-center gap-1 text-xs transition transform hover:scale-105 py-1 px-2 rounded-full text-gray-500 hover:bg-gray-100"
                                >
                                  <X className="w-3 h-3" />
                                  <span>Report</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="tour-details" onNavigate={onNavigate} />
    </div>
  );
}
