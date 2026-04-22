import { useState, useEffect } from 'react';
import { Clock, Eye, X, Check, AlertCircle, Search, Filter, Calendar, DollarSign, User, MessageSquare } from 'lucide-react';

interface AdSubmission {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  budget: number;
  duration: number;
  startDate: string;
  endDate: string;
  ctaText: string;
  destinationUrl: string;
  submittedBy: string;
  userType: 'partner' | 'supplier';
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedDate?: string;
  imageUrl?: string;
}

const MOCK_SUBMISSIONS: AdSubmission[] = [
  {
    id: 'AD-001',
    title: 'Beijing Adventure Package',
    description: 'Experience the best of Beijing with our comprehensive tour package including Great Wall, Forbidden City, and local cuisine experiences.',
    targetAudience: 'International tourists, Adventure seekers',
    budget: 350,
    duration: 7,
    startDate: '2024-03-15',
    endDate: '2024-03-21',
    ctaText: 'Book Now',
    destinationUrl: 'https://example.com/beijing-tour',
    submittedBy: 'China Elite Tours',
    userType: 'partner',
    submittedDate: '2024-03-10T10:30:00Z',
    status: 'pending'
  },
  {
    id: 'AD-002',
    title: 'Premium Hotel Supplies',
    description: 'High-quality hotel supplies including bedding, amenities, and operational equipment for luxury hotels.',
    targetAudience: 'Hotel managers, Procurement officers',
    budget: 200,
    duration: 14,
    startDate: '2024-03-12',
    endDate: '2024-03-25',
    ctaText: 'Get Quote',
    destinationUrl: 'https://example.com/hotel-supplies',
    submittedBy: 'Hospitality Supplies Co.',
    userType: 'supplier',
    submittedDate: '2024-03-09T14:15:00Z',
    status: 'pending'
  },
  {
    id: 'AD-003',
    title: 'Shanghai Cultural Experience',
    description: 'Immerse yourself in Shanghai\'s rich culture with guided tours, traditional performances, and authentic dining.',
    targetAudience: 'Cultural tourists, History enthusiasts',
    budget: 400,
    duration: 10,
    startDate: '2024-03-20',
    endDate: '2024-03-29',
    ctaText: 'Learn More',
    destinationUrl: 'https://example.com/shanghai-cultural',
    submittedBy: 'Shanghai Tours Ltd.',
    userType: 'partner',
    submittedDate: '2024-03-08T09:45:00Z',
    status: 'rejected',
    rejectionReason: 'Ad content does not meet platform guidelines - unclear pricing information',
    reviewedBy: 'Admin User',
    reviewedDate: '2024-03-09T11:20:00Z'
  }
];

const REVIEW_DEADLINE_HOURS = 42;

export function AdminAdReview() {
  const [submissions, setSubmissions] = useState<AdSubmission[]>(MOCK_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState<AdSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const getTimeUntilDeadline = (submittedDate: string): { hours: number; isUrgent: boolean } => {
    const submitted = new Date(submittedDate);
    const deadline = new Date(submitted.getTime() + REVIEW_DEADLINE_HOURS * 60 * 60 * 1000);
    const now = new Date();
    const diffHours = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    return {
      hours: diffHours,
      isUrgent: diffHours <= 12 && diffHours > 0
    };
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || submission.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: 'approved' as const, reviewedBy: 'Admin User', reviewedDate: new Date().toISOString() }
        : sub
    ));
    setSelectedSubmission(null);
  };

  const handleReject = (submissionId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { 
            ...sub, 
            status: 'rejected' as const, 
            rejectionReason,
            reviewedBy: 'Admin User', 
            reviewedDate: new Date().toISOString() 
          }
        : sub
    ));
    setShowRejectionModal(false);
    setRejectionReason('');
    setSelectedSubmission(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return Check;
      case 'rejected': return X;
      case 'pending': return Clock;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ad Review Dashboard</h1>
            <p className="text-gray-500 mt-1">Review and approve advertisement submissions</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{REVIEW_DEADLINE_HOURS}h review deadline</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending Review</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Check className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.status === 'approved').length}
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <X className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.status === 'rejected').length}
                </p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => {
                    const timeLeft = getTimeUntilDeadline(s.submittedDate);
                    return s.status === 'pending' && timeLeft.isUrgent;
                  }).length}
                </p>
                <p className="text-sm text-gray-600">Urgent (≤12h)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="flex">
        {/* Submissions List */}
        <div className="w-1/2 p-6 border-r border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Submissions</h2>
          <div className="space-y-3">
            {filteredSubmissions.map(submission => {
              const timeLeft = getTimeUntilDeadline(submission.submittedDate);
              const StatusIcon = getStatusIcon(submission.status);
              
              return (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-4 rounded-lg border cursor-pointer transition ${
                    selectedSubmission?.id === submission.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{submission.title}</h3>
                      <p className="text-sm text-gray-600">{submission.submittedBy}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(submission.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      {submission.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{submission.userType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${submission.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{submission.duration}d</span>
                    </div>
                  </div>

                  {submission.status === 'pending' && (
                    <div className={`mt-2 text-sm ${
                      timeLeft.isUrgent ? 'text-red-600 font-semibold' : 'text-amber-600'
                    }`}>
                      {timeLeft.hours > 0 
                        ? `${timeLeft.hours}h remaining` 
                        : 'Overdue'
                      }
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submission Details */}
        <div className="w-1/2 p-6">
          {selectedSubmission ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Ad Details</h2>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedSubmission.status)}`}>
                  {(() => {
                    const StatusIcon = getStatusIcon(selectedSubmission.status);
                    return StatusIcon ? <StatusIcon className="w-4 h-4" /> : null;
                  })()}
                  {selectedSubmission.status}
                </span>
              </div>

              {/* Ad Preview */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedSubmission.title}</h3>
                <p className="text-gray-600 mb-4">{selectedSubmission.description}</p>
                
                <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Ad Image Preview</p>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  {selectedSubmission.ctaText}
                </button>
              </div>

              {/* Campaign Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Campaign Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submitted by:</span>
                    <span className="font-medium">{selectedSubmission.submittedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User type:</span>
                    <span className="font-medium capitalize">{selectedSubmission.userType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target audience:</span>
                    <span className="font-medium">{selectedSubmission.targetAudience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">${selectedSubmission.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{selectedSubmission.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start date:</span>
                    <span className="font-medium">{new Date(selectedSubmission.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End date:</span>
                    <span className="font-medium">{new Date(selectedSubmission.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination URL:</span>
                    <span className="font-medium text-blue-600 truncate ml-2">{selectedSubmission.destinationUrl}</span>
                  </div>
                </div>
              </div>

              {/* Rejection Reason */}
              {selectedSubmission.status === 'rejected' && selectedSubmission.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-red-800 mb-2">Rejection Reason</h4>
                  <p className="text-red-700">{selectedSubmission.rejectionReason}</p>
                  <p className="text-sm text-red-600 mt-2">
                    Reviewed by {selectedSubmission.reviewedBy} on {new Date(selectedSubmission.reviewedDate!).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Actions */}
              {selectedSubmission.status === 'pending' && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(selectedSubmission.id)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Approve Ad
                  </button>
                  <button
                    onClick={() => setShowRejectionModal(true)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Reject Ad
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reject Advertisement</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this ad. This will be sent to the advertiser.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter rejection reason..."
            />
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedSubmission!.id)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Reject Ad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
