const BASE_URL = '/api';

/**
 * Universal fetch wrapper that attaches credentials and handles JSON responses
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('lw_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: 'Invalid response from server',
  }));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Auth
  auth: {
    signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    logout: () => request('/auth/logout', { method: 'POST' }),
    me: () => request('/auth/me'),
  },

  // Services
  services: {
    getAll: () => request('/services'),
    getById: (id) => request(`/services/${id}`),
  },

  // Bookings
  bookings: {
    create: (body) => request('/bookings', { method: 'POST', body: JSON.stringify(body) }),
    getMyBookings: () => request('/bookings/mine'),
    getById: (id) => request(`/bookings/${id}`),
    cancel: (id) => request(`/bookings/${id}/cancel`, { method: 'PATCH' }),
  },

  // Support
  support: {
    submit: (body) => request('/support', { method: 'POST', body: JSON.stringify(body) }),
  },

  // Admin
  admin: {
    getStats: () => request('/admin/stats'),
    getAllBookings: (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return request(`/admin/bookings${q ? `?${q}` : ''}`);
    },
    updateBookingStatus: (id, status) =>
      request(`/admin/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    getAllEnquiries: (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return request(`/admin/enquiries${q ? `?${q}` : ''}`);
    },
    updateEnquiryStatus: (id, status) =>
      request(`/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    createService: (body) =>
      request('/admin/services', { method: 'POST', body: JSON.stringify(body) }),
    updateService: (id, body) =>
      request(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    getAllUsers: () => request('/admin/users'),
  },
};
