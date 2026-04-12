const ADMIN_API = '/api';

function adminFetch(endpoint, options = {}) {
  const token = localStorage.getItem('bb_admin_token');
  return fetch(ADMIN_API + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    ...options
  }).then(async r => {
    if (r.status === 401 || r.status === 403) {
      localStorage.removeItem('bb_admin_token');
      window.location.href = '../login.html';
    }
    const data = await r.json();
    return data;
  });
}

const AdminAPI = {
  // Dashboard
  dashboard: () => adminFetch('/admin/stats'),
  
  // Listings
  getListings: (p) => adminFetch('/admin/listings?' + new URLSearchParams(p||{})),
  approveListing: (id) => adminFetch(`/listings/${id}`, { method:'PUT', body: JSON.stringify({ isLive: true, status: 'Approved' }) }),
  rejectListing: (id, reason) => adminFetch(`/listings/${id}`, { method:'PUT', body: JSON.stringify({ isLive: false, status: 'Rejected', rejectReason: reason }) }),
  toggleFeatured: (id, val) => adminFetch(`/listings/${id}`, { method:'PUT', body: JSON.stringify({ featured: val }) }),
  togglePremium: (id, val) => adminFetch(`/listings/${id}`, { method:'PUT', body: JSON.stringify({ premium: val }) }),
  deleteListing: (id) => adminFetch(`/listings/${id}`, { method:'DELETE' }),
  
  // Blog
  getPosts: () => adminFetch('/blogs'),
  createPost: (data) => adminFetch('/blogs', { method:'POST', body: JSON.stringify(data) }),
  updatePost: (id, data) => adminFetch(`/blogs/${id}`, { method:'PUT', body: JSON.stringify(data) }),
  publishPost: (id) => adminFetch(`/blogs/${id}`, { method:'PUT', body: JSON.stringify({ status: 'Published' }) }),
  deletePost: (id) => adminFetch(`/blogs/${id}`, { method:'DELETE' }),
  
  // Analytics mock
  getOverview: (period) => adminFetch(`/analytics/overview?period=${period}`),
  getRealtime: () => adminFetch('/analytics/realtime'),
  getTopPages: () => adminFetch('/analytics/top-pages'),
  getSearchConsole: () => adminFetch('/analytics/search-console'),
  
  // SEO mock
  getSeoSettings: () => adminFetch('/seo/settings'),
  saveSeoSettings: (data) => adminFetch('/seo/settings', { method:'PUT', body: JSON.stringify(data) }),
  generateSitemap: () => adminFetch('/seo/generate-sitemap', { method:'POST' }),
  getRobots: () => adminFetch('/seo/robots'),
  saveRobots: (content) => adminFetch('/seo/robots', { method:'PUT', body: JSON.stringify({content}) }),
  
  // Settings
  getSettings: () => adminFetch('/admin/settings'),
  saveSettings: (data) => adminFetch('/admin/settings', { method:'PUT', body: JSON.stringify(data) }),
  
  // Users
  getUsers: () => adminFetch('/admin/users'),
  
  // Notifications
  getNotifications: () => adminFetch('/admin/notifications'),
  readNotifications: () => adminFetch('/admin/notifications/read', { method:'PUT' })
};

window.AdminAPI = AdminAPI;