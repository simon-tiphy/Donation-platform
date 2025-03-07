import axios from 'axios';

const API_URL = 'https://donation-platform-8n9f.onrender.com/api/auth';

// Register a new user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login a user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', response.data.token); // Store token in local storage
    }
  }
  return response.data;
};

// Logout a user
export const logout = () => {
  // Check if localStorage is available
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('token'); // Remove token from local storage
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;