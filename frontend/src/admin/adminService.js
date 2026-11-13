const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'spaciaz_admin_jwt_token';
const ADMIN_USER_KEY = 'spaciaz_admin_user';

export const adminService = {
  // Store authentication
  setAuth(token, admin) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
  },

  // Clear authentication
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  },

  // Check login status
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Get current admin user
  getCurrentAdmin() {
    try {
      const data = localStorage.getItem(ADMIN_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Auth Header helper
  getHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  },

  // Login API
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success && data.token) {
      this.setAuth(data.token, data.admin);
    }
    return data;
  },

  // Verify Me
  async verifyAuth() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  // Change Password
  async changePassword(newPassword) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ newPassword })
    });
    return await res.json();
  },

  // Site Content
  async getSiteContent() {
    const res = await fetch(`${API_BASE}/site`);
    return await res.json();
  },

  async updateSiteContent(content) {
    const res = await fetch(`${API_BASE}/site`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(content)
    });
    return await res.json();
  },

  // Projects CRUD
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    return await res.json();
  },

  async createProject(project) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(project)
    });
    return await res.json();
  },

  async updateProject(id, project) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(project)
    });
    return await res.json();
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return await res.json();
  },

  // Inquiries / Leads
  async getInquiries() {
    const res = await fetch(`${API_BASE}/inquiries`, {
      headers: this.getHeaders()
    });
    return await res.json();
  }
};

