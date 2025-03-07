// import axios from 'axios';

// const API_URL = 'https://donation-platform-8n9f.onrender.com/auth'; // Update if needed

// const register = async (userData) => {
//   const response = await axios.post(`${API_URL}/register`, userData);
//   return response.data;
// };

// const login = async (credentials) => {
//   const response = await axios.post(`${API_URL}/login`, credentials);
//   return response.data;
// };

// export default { register, login };


import axios from 'axios';

const API_URL = 'https://donation-platform-8n9f.onrender.com/api/auth'; // Updated backend URL

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  register: async (name, email, password, role) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
    return response.data;
  }
};

export default authService;
