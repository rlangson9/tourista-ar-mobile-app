const API_BASE = 'http://localhost:5002/api/partners';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Helper function to make authenticated requests
const authFetch = async (url: string, options: RequestInit = {}) => {
  // In a real app, you'd get the token from localStorage or auth context
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

export const partnerService = {
  // Overview
  getOverview: async () => {
    return await authFetch('/overview');
  },

  // Profile
  getProfile: async () => {
    return await authFetch('/profile');
  },

  updateProfile: async (profileData: any) => {
    return await authFetch('/profile', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
  },

  // Tours
  getTours: async () => {
    return await authFetch('/tours');
  },

  createTour: async (tourData: any) => {
    return await authFetch('/tours', {
      method: 'POST',
      body: JSON.stringify(tourData)
    });
  },

  updateTour: async (tourId: string, tourData: any) => {
    return await authFetch(`/tours/${tourId}`, {
      method: 'PUT',
      body: JSON.stringify(tourData)
    });
  },

  deleteTour: async (tourId: string) => {
    return await authFetch(`/tours/${tourId}`, {
      method: 'DELETE'
    });
  },

  // Bookings
  getBookings: async (status?: string) => {
    const queryString = status ? `?status=${status}` : '';
    return await authFetch(`/bookings${queryString}`);
  },

  updateBookingStatus: async (bookingId: string, status: string) => {
    return await authFetch(`/bookings/${bookingId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // Revenue
  getRevenue: async () => {
    return await authFetch('/revenue');
  },

  // Analytics
  getAnalytics: async () => {
    return await authFetch('/analytics');
  }
};

export default partnerService;
