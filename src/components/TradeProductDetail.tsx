import { ArrowLeft, Star, Shield, MapPin, Package, Truck, FileText, Share2, Heart, MessageCircle, ChevronRight, Check, X, Edit, ThumbsUp, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { BottomNav } from './BottomNav';
import { mockProducts, Review } from '../data/mockData';
import { ReviewForm } from './ReviewForm';

interface TradeProductDetailProps {
  productId: string | null;
  onNavigate: (screen: Screen) => void;
}

export function TradeProductDetail({ productId, onNavigate }: TradeProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    destinationPort: '',
    quantity: '',
    priceRange: '',
    deliveryTime: '',
    additionalDetails: '',
    contactName: ''
  });

  const product = mockProducts.find((p) => p.id === productId);
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [productReviews, setProductReviews] = useState<Review[]>(product?.userReviews || []);
  const [productReviewCount, setProductReviewCount] = useState(product?.reviews || 0);
  const [productRating, setProductRating] = useState(product?.rating || 0);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());
  const [helpfulReplies, setHelpfulReplies] = useState<Set<string>>(new Set());

  if (!product) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const shareProduct = async () => {
    if (!product) return;

    try {
      // Generate deep link
      const deepLink = `${window.location.origin}${window.location.pathname}#/product/${product.id}`;
      
      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: deepLink,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(deepLink);
        showNotification('Share link copied to clipboard!');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share error:', error);
        showNotification('Failed to share product information', 'error');
      }
    }
  };

  const handleReviewSubmit = (reviewData: Omit<Review, 'id' | 'userId' | 'userName' | 'userAvatar' | 'date' | 'helpful' | 'isVerified'>) => {
    if (!product) return;

    // Create new review with generated data
    const newReview: Review = {
      id: `pr${Date.now()}`,
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
    const updatedReviews = [newReview, ...productReviews];
    setProductReviews(updatedReviews);
    setProductReviewCount(productReviewCount + 1);

    // Calculate new average rating
    const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
    const newAverageRating = totalRating / updatedReviews.length;
    setProductRating(parseFloat(newAverageRating.toFixed(1)));

    // Close the review form
    setShowReviewForm(false);
    showNotification('Review submitted successfully!');
  };

  const handleReplySubmit = (reviewId: string) => {
    if (!product || !replyContent.trim()) return;

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
    const updatedReviews = productReviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          replies: [...(review.replies || []), newReply]
        };
      }
      return review;
    });

    setProductReviews(updatedReviews);
    setReplyingTo(null);
    setReplyContent('');
    showNotification('Reply submitted successfully!');
  };

  const images = [product.image, product.image, product.image];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative">
        <img src={images[selectedImage]} alt={product.name} className="w-full h-80 object-cover" />
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('explore')}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button 
              onClick={shareProduct}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {product.verified && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
            <Shield className="w-4 h-4" />
            Verified Supplier
          </div>
        )}
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
        {/* Title & Supplier */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{product.supplierRating}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.supplier}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
        </div>

        {/* Price & MOQ */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Price Range</p>
              <p className="text-2xl font-bold text-blue-600">{product.priceRange}</p>
              <p className="text-sm text-gray-500">{product.unit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">MOQ</p>
              <p className="text-2xl font-bold text-gray-900">{product.moq}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Truck className="w-4 h-4" />
                <span>{product.shippingTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-3">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <div
                  key={cert}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <h3 className="font-bold text-lg mb-3">Product Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-bold text-lg mb-3">Specifications</h3>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600">{key}</span>
                <span className="font-semibold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {product.faqs && product.faqs.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {product.faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supplier Info */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <h3 className="font-bold text-gray-900 mb-3">Supplier Information</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {product.supplier.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">{product.supplier}</p>
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.supplierRating} rating</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('message', undefined, product.supplier, product.supplier)}
            className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Supplier
          </button>
        </div>

        {/* Shipping Info */}
        <div>
          <h3 className="font-bold text-lg mb-3" style={{ paddingTop: '11px', paddingBottom: '11px' }}>Shipping Options</h3>
          <div className="space-y-3" style={{ marginTop: '-24px', marginBottom: '-24px' }}>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Sea Freight</p>
                <p className="text-sm text-gray-600">30-45 days delivery</p>
                <p className="text-sm text-blue-600 font-semibold mt-1">Most economical option</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Air Freight</p>
                <p className="text-sm text-gray-600">7-10 days delivery</p>
                <p className="text-sm text-blue-600 font-semibold mt-1">Fastest option</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Reviews ({productReviewCount})</h3>
            <button
              onClick={() => setShowReviewForm(true)}
              className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors group"
            >
              <Edit className="w-4 h-4" />
              Write a Review
            </button>
          </div>
          
          {productReviewCount > 0 ? (
            <>
              {/* Rating Summary */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-amber-500">{productRating}</p>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= Math.floor(productRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{productReviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = productReviews.filter(r => r.rating === rating).length;
                      const percentage = productReviewCount > 0 ? (count / productReviewCount) * 100 : 0;
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
              
              {/* User Reviews */}
              <div className="space-y-4">
                {productReviews.slice(0, 3).map((review) => (
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
            </>
          ) : (
            <div className="rounded-2xl text-center" style={{ marginTop: '9px', marginBottom: '9px', paddingTop: '26px', paddingBottom: '26px', fontSize: '11px' }}>
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">No reviews yet</p>
              <p className="text-sm text-gray-400 mb-4">Be the first to review this product</p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Write a Review
              </button>
            </div>
          )}
        </div>

        {/* Spacer for fixed bottom bar */}
        <div className="h-36" />
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg max-w-md mx-auto" style={{ marginTop: '73px', marginBottom: '73px' }}>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button 
            onClick={() => onNavigate('negotiation-tool')}
            className="border-2 border-blue-600 text-blue-600 py-2 rounded-full font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Negotiate Price
          </button>
          <button 
            onClick={() => onNavigate('bulk-ordering')}
            className="border-2 border-blue-600 text-blue-600 py-2 rounded-full font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm"
          >
            <Package className="w-4 h-4" />
            Bulk Order
          </button>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              // Open AI assistant with product context
              window.dispatchEvent(new CustomEvent('openAIAssistant'));
            }}
            className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-full font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Touri ai
          </button>
          <button 
            onClick={() => {
              // Open quote request form
              setShowQuoteForm(true);
            }}
            className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
          >
            Request Quote
          </button>
        </div>
      </div>

      {/* Notification */}
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
            type="product"
          />
        )}
      </AnimatePresence>

      {/* Quote Request Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Request Quote</h2>
              <button
                onClick={() => setShowQuoteForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Port</label>
                <input
                  type="text"
                  value={quoteForm.destinationPort}
                  onChange={(e) => setQuoteForm({ ...quoteForm, destinationPort: e.target.value })}
                  placeholder="Enter destination port"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={quoteForm.quantity}
                  onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                  placeholder="Enter quantity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <input
                  type="text"
                  value={quoteForm.priceRange}
                  onChange={(e) => setQuoteForm({ ...quoteForm, priceRange: e.target.value })}
                  placeholder="Enter your price range"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                <input
                  type="text"
                  value={quoteForm.deliveryTime}
                  onChange={(e) => setQuoteForm({ ...quoteForm, deliveryTime: e.target.value })}
                  placeholder="Enter desired delivery time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                <textarea
                  value={quoteForm.additionalDetails}
                  onChange={(e) => setQuoteForm({ ...quoteForm, additionalDetails: e.target.value })}
                  placeholder="Enter any additional details"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={quoteForm.contactName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, contactName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Validate form
                    if (!quoteForm.destinationPort || !quoteForm.quantity || !quoteForm.contactName) {
                      showNotification('Please fill in all required fields', 'error');
                      return;
                    }
                    
                    // Submit quote request
                    showNotification('Quote request submitted! We will contact you shortly through the app.', 'success');
                    setShowQuoteForm(false);
                    
                    // Reset form
                    setQuoteForm({
                      destinationPort: '',
                      quantity: '',
                      priceRange: '',
                      deliveryTime: '',
                      additionalDetails: '',
                      contactName: ''
                    });
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav currentScreen="trade-product-detail" onNavigate={onNavigate} />
    </div>
  );
}
