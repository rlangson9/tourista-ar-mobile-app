import { useState } from 'react';
import { Star, Camera, X, Check, Image as ImageIcon, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Review } from '../data/mockData';

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'userAvatar' | 'date' | 'helpful' | 'isVerified'>) => void;
  onCancel: () => void;
  type: 'product' | 'tour';
}

export function ReviewForm({ onSubmit, onCancel, type }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos = Array.from(files).map(file => URL.createObjectURL(file));
      setVideos([...videos, ...newVideos]);
    }
  };

  const handleRemoveMedia = (index: number, type: 'photo' | 'video') => {
    if (type === 'photo') {
      setPhotos(photos.filter((_, i) => i !== index));
    } else {
      setVideos(videos.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !title.trim() || !content.trim()) {
      alert('Please provide a rating, title, and review content');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        rating,
        title,
        content,
        tags,
        photos,
        videos
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold">Write a Review</h2>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0 || !title.trim() || !content.trim()}
            className={`px-4 py-2 rounded-full font-semibold transition ${isSubmitting 
              ? 'bg-gray-300 text-gray-500' 
              : rating === 0 || !title.trim() || !content.trim() 
                ? 'bg-gray-300 text-gray-500' 
                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Rating */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Overall Rating</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition transform hover:scale-110"
                >
                  <Star 
                    className={`w-10 h-10 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title for your review"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map((tag, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Add
              </button>
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add Photos/Videos (optional)</h3>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {/* Photo Upload */}
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition cursor-pointer">
                <Camera className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {/* Video Upload */}
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition cursor-pointer">
                <Video className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Add Video</span>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>

              {/* Uploaded Photos */}
              {photos.map((photo, index) => (
                <div key={`photo-${index}`} className="relative rounded-lg overflow-hidden h-24">
                  <img src={photo} alt={`Uploaded photo ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveMedia(index, 'photo')}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Uploaded Videos */}
              {videos.map((video, index) => (
                <div key={`video-${index}`} className="relative rounded-lg overflow-hidden h-24 bg-gray-900">
                  <video src={video} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <button
                    onClick={() => handleRemoveMedia(index, 'video')}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
            <p className="mb-2">Helpful reviews include specific details about your experience, what you liked or disliked, and any tips for other users.</p>
            <p className="text-red-500 font-medium">Important: Do not include advertisements, contact details, or inappropriate content. All reviews are monitored to reduce harassment and scams.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
