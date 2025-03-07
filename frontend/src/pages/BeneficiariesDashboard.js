// src/pages/BeneficiariesDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBeneficiary,
  fetchBeneficiaries,
  updateBeneficiary,
  deleteBeneficiary,
  clearBeneficiaryMessage,
} from '../redux/beneficiarySlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/BeneficiariesDashboard.css';

const BeneficiariesDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Beneficiary slice state
  const { beneficiaries, status, error, message } = useSelector(
    (state) => state.beneficiaries
  );

  // Local state for beneficiary creation
  const [formData, setFormData] = useState({ name: '', story: '' });

  // Local state for editing a beneficiary
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', story: '' });

  // Fetch beneficiaries when the component mounts
  useEffect(() => {
    dispatch(fetchBeneficiaries());
  }, [dispatch]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearBeneficiaryMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  // Handlers for form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler for creating a beneficiary
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBeneficiary(formData));
    setFormData({ name: '', story: '' });
    // Optionally, re-fetch beneficiaries after creation
    dispatch(fetchBeneficiaries());
  };

  // Edit a beneficiary: set form data for editing
  const handleEdit = (beneficiary) => {
    setEditId(beneficiary.id);
    setEditData({ name: beneficiary.name, story: beneficiary.story });
  };

  // Submit handler for updating a beneficiary
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateBeneficiary({ beneficiaryId: editId, ...editData }));
    setEditId(null);
    // Optionally, re-fetch beneficiaries after update
    dispatch(fetchBeneficiaries());
  };

  // Delete a beneficiary
  const handleDelete = (id) => {
    dispatch(deleteBeneficiary(id));
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="beneficiaries-dashboard-page">
      <div className="beneficiaries-dashboard-container">
        <h2>Beneficiaries Dashboard</h2>
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        {/* Create Beneficiary Section */}
        <section className="create-beneficiary-section">
          <h3>Create a New Beneficiary</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Story:</label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={status === 'loading'}>
              Create Beneficiary
            </button>
          </form>
        </section>

        {/* Beneficiaries List Section */}
        <section className="beneficiaries-list-section">
          <h3>All Beneficiaries</h3>
          {status === 'loading' && <p>Loading beneficiaries...</p>}
          {beneficiaries && beneficiaries.length > 0 ? (
            <ul className="beneficiaries-list">
              {beneficiaries.map((beneficiary) => (
                <li key={beneficiary.id}>
                  {editId === beneficiary.id ? (
                    <form onSubmit={handleUpdate} className="edit-form">
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        required
                      />
                      <textarea
                        name="story"
                        value={editData.story}
                        onChange={handleEditChange}
                        required
                      />
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => setEditId(null)}>
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="beneficiary-item">
                      <span>
                        <strong>{beneficiary.name}</strong>: {beneficiary.story}
                      </span>
                      <div className="btn-group">
                        <button onClick={() => handleEdit(beneficiary)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(beneficiary.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No beneficiaries found.</p>
          )}
        </section>

        {/* Logout Button */}
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiariesDashboard;
