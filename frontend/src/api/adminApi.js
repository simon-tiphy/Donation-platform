
import axios from "axios";

const API_BASE_URL = "https://donation-platform-8n9f.onrender.com/api/admin";

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// ✅ Fetch all users (including charity users)
export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`, getAuthHeaders());
  return response.data;
};

// ✅ Fetch all pending charities
export const fetchPendingCharities = async () => {
  const response = await axios.get(`${API_BASE_URL}/charities/pending`, getAuthHeaders());
  return response.data;
};

// ✅ Approve/Reject a charity
export const updateCharityStatus = async (charityId, status) => {
  const response = await axios.put(
    `${API_BASE_URL}/approve_charity/${charityId}`,
    { status },
    getAuthHeaders()
  );
  return response.data;
};

// ✅ Approve/Reject a charity user
export const updateUserStatus = async (userId, status) => {
  const response = await axios.put(
    `${API_BASE_URL}/approve_user/${userId}`,
    { status },
    getAuthHeaders()
  );
  return response.data;
};

// ✅ Delete a user
export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_BASE_URL}/delete_user/${userId}`, getAuthHeaders());
  return response.data;
};

// ✅ Delete a charity
export const deleteCharity = async (charityId) => {
  const response = await axios.delete(`${API_BASE_URL}/delete_charity/${charityId}`, getAuthHeaders());
  return response.data;
};

// ✅ Fetch all donations
export const fetchDonations = async () => {
  const response = await axios.get(`${API_BASE_URL}/donations`, getAuthHeaders());
  return response.data;
};
