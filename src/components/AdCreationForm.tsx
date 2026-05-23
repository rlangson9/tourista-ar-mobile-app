import { useState } from 'react';
import { X, Calendar, DollarSign, Target, TrendingUp, Eye, CheckCircle } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { ImageUpload } from './ImageUpload';

interface AdCreationFormProps {
  onClose: () => void;
  onSubmit: (adData: AdFormData) => void;
  userType: 'partner' | 'supplier';
}

export interface AdFormData {
  title: string;
  description: string;
  targetAudience: string;
  budget: number;
  duration: number;
  images: string[];
  startDate: string;
  endDate: string;
  ctaText: string;
  destinationUrl: string;
}

const PRICING_PER_DAY = 7.99; // $7.99 per day

export function AdCreationForm({ onClose, onSubmit, userType }: AdCreationFormProps) {
  const [formData, setFormData] = useState<AdFormData>({
    title: '',
    description: '',
    targetAudience: '',
    budget: PRICING_PER_DAY,
    duration: 1,
    images: [],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    ctaText: '',
    destinationUrl: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AdFormData, string>>>({});
  const { success } = useToast();

  const handleImagesChange = (newImages: string[]) => {
    setFormData(prev => ({ ...prev, images: newImages }));
    if (newImages.length > 0) {
      success('Image uploaded successfully');
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AdFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = 'Ad title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.targetAudience.trim()) newErrors.targetAudience = 'Target audience is required';
    if (formData.budget < PRICING_PER_DAY) newErrors.budget = `Minimum budget is $${PRICING_PER_DAY}`;
    if (formData.duration < 1) newErrors.duration = 'Duration must be at least 1 day';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.ctaText.trim()) newErrors.ctaText = 'Call-to-action text is required';
    if (!formData.destinationUrl.trim()) newErrors.destinationUrl = 'Destination URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateFormData = (field: keyof AdFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate budget when duration changes
    if (field === 'duration') {
      const calculatedBudget = (value as number) * PRICING_PER_DAY;
      setFormData(prev => ({ ...prev, budget: calculatedBudget, duration: value as number }));
    }
  };

  const totalCost = formData.duration * PRICING_PER_DAY;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create New Advertisement</h2>
              <p className="text-gray-500 mt-1">
                {userType === 'partner' ? 'Promote your tours to more travelers' : 'Showcase your products to partners'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter a catchy title for your ad"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe what makes your offering special"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience *
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => updateFormData('targetAudience', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.targetAudience ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., International tourists, Business travelers, Families"
              />
              {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
            </div>
          </div>

          {/* Ad Creative */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">Ad Creative</h3>
            
            <ImageUpload
              images={formData.images}
              onImagesChange={handleImagesChange}
              label="Ad Image"
              aspectRatio="16:9 (Wide)"
              maxImages={1}
              hint="PNG, JPG up to 10MB"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call-to-Action Text *
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => updateFormData('ctaText', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.ctaText ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Book Now, Learn More, Get Started"
              />
              {errors.ctaText && <p className="text-red-500 text-sm mt-1">{errors.ctaText}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination URL *
              </label>
              <input
                type="url"
                value={formData.destinationUrl}
                onChange={(e) => updateFormData('destinationUrl', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.destinationUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://your-website.com/landing-page"
              />
              {errors.destinationUrl && <p className="text-red-500 text-sm mt-1">{errors.destinationUrl}</p>}
            </div>
          </div>

          {/* Campaign Schedule */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">Campaign Schedule</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateFormData('endDate', e.target.value)}
                  min={formData.startDate}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Duration (days) *
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => updateFormData('duration', parseInt(e.target.value) || 1)}
                min="1"
                max="90"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Campaign Pricing</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Price per day</span>
                </div>
                <span className="font-semibold">${PRICING_PER_DAY}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Campaign duration</span>
                </div>
                <span className="font-semibold">{formData.duration} days</span>
              </div>
              
              <div className="border-t border-gray-300 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Total Cost</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">${totalCost}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expected Performance */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Expected Performance</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{(formData.duration * 1000).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Est. Impressions</p>
              </div>
              <div className="text-center">
                <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{(formData.duration * 8).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Est. Clicks</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{(formData.duration * 5).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Est. Conversions</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit for Review - ${totalCost}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
