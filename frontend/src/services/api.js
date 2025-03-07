// import axios from "axios";

// const API_BASE_URL = "https://donation-platform-8n9f.onrender.com"; // Change this if needed

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,  // ✅ Ensures Flask-Session works
//   headers: { "Content-Type": "application/json" },
// });

// const getToken = () => sessionStorage.getItem("access_token");

// const api = {
//   get: async (endpoint) => {
//     try {
//       const token = getToken();
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};
//       const response = await apiClient.get(endpoint, { headers });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   post: async (endpoint, data) => {
//     try {
//       const token = getToken();
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};
//       const response = await apiClient.post(endpoint, data, { headers });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },
// };

// export default api;
