import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCharity,
  fetchCharities,
  fetchNonAnonymousDonors,
  fetchAnonymousDonations,
  fetchTotalDonations,
  clearMessage as clearCharityMessage,
} from '../redux/charitySlice';
import {
  createBeneficiary,
  fetchBeneficiaries,
  clearBeneficiaryMessage,
} from '../redux/beneficiarySlice';
import { logout } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/CharityDashboard.css';

const CharityDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get state from Redux
  const { userInfo } = useSelector((state) => state.auth);
  const {
    charities,
    donorsByCharity,
    anonymousDonationsByCharity,
    totalDonationsByCharity,
    status,
    error,
    message,
  } = useSelector((state) => state.charity);
  const {
    beneficiaries,
    status: beneficiaryStatus,
    error: beneficiaryError,
    message: beneficiaryMessage,
  } = useSelector((state) => state.beneficiaries);

  const [charityFormData, setCharityFormData] = useState({ name: '', description: '' });
  const [selectedCharityId, setSelectedCharityId] = useState(null);
  const [beneficiaryFormData, setBeneficiaryFormData] = useState({ name: '', story: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch charities and beneficiaries on mount
  useEffect(() => {
    dispatch(fetchCharities());
    dispatch(fetchBeneficiaries());
  }, [dispatch]);

  // Clear messages after a short timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(clearCharityMessage()), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (beneficiaryMessage) {
      const timer = setTimeout(() => dispatch(clearBeneficiaryMessage()), 3000);
      return () => clearTimeout(timer);
    }
  }, [beneficiaryMessage, dispatch]);

  // Handlers for Charity Form
  const handleCharityChange = (e) => {
    const { name, value } = e.target;
    setCharityFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCharitySubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCharity(charityFormData));
    dispatch(fetchCharities());
    setCharityFormData({ name: '', description: '' });
  };

  const handleSelectCharity = (charityId) => {
    setSelectedCharityId(charityId);
    dispatch(fetchNonAnonymousDonors(charityId));
    dispatch(fetchAnonymousDonations(charityId));
    dispatch(fetchTotalDonations(charityId));
    setIsModalOpen(true);
  };

  // Handlers for Beneficiary Form
  const handleBeneficiaryChange = (e) => {
    const { name, value } = e.target;
    setBeneficiaryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBeneficiarySubmit = (e) => {
    e.preventDefault();
    dispatch(createBeneficiary(beneficiaryFormData));
    setBeneficiaryFormData({ name: '', story: '' });
    dispatch(fetchBeneficiaries());
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Modal close handler
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharityId(null);
  };

  return (
    <div className="charity-dashboard-page">
      <aside className="sidebar">
        <h2>Welcome,</h2>
        <nav>
          <ul>
            <li>
              <Link to="/charity-dashboard">Home</Link>
            </li>
            <li>
              <Link to="/charity-dashboard/beneficiaries">Beneficiaries</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Charity Dashboard</h2>
          {message && <p className="message success">{message}</p>}
          {error && <p className="message error">{error}</p>}
        </header>

        {/* Create Charity Section */}
        <section className="create-section">
          <h3>Create New Charity</h3>
          <form onSubmit={handleCharitySubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                name="name"
                type="text"
                value={charityFormData.name}
                onChange={handleCharityChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={charityFormData.description}
                onChange={handleCharityChange}
                required
              />
            </div>
            <button type="submit" disabled={status === 'loading'}>
              Create Charity
            </button>
          </form>
        </section>

        {/* List of Charities Section */}
        <section className="list-section">
          <h3>All Charities</h3>
          {status === 'loading' && <p>Loading charities...</p>}
          {charities && charities.length > 0 ? (
            <ul className="list">
              {charities.map((charity) => (
                <li key={charity.id}>
                  <div className="list-item">
                    <span>
                      <strong>{charity.name}</strong> – {charity.description} ({charity.status})
                    </span>
                    <button onClick={() => handleSelectCharity(charity.id)}>
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No charities found.</p>
          )}
        </section>

        {/* Charity Details Modal */}
        {isModalOpen && selectedCharityId && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>&times;</button>
              <h3>Charity Details (ID: {selectedCharityId})</h3>
              <div className="details-grid">
                <div className="detail-card">
                  <h4>Non-Anonymous Donors</h4>
                  {donorsByCharity[selectedCharityId] ? (
                    <ul>
                      {donorsByCharity[selectedCharityId].map((entry, index) => (
                        <li key={index}>
                          {entry.donor.name} ({entry.donor.email}) – ${entry.donation.amount}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No non-anonymous donors found.</p>
                  )}
                </div>
                <div className="detail-card">
                  <h4>Anonymous Donations</h4>
                  {anonymousDonationsByCharity[selectedCharityId] ? (
                    <ul>
                      {anonymousDonationsByCharity[selectedCharityId].map((amount, index) => (
                        <li key={index}>${amount}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No anonymous donations found.</p>
                  )}
                </div>
                <div className="detail-card">
                  <h4>Total Donations</h4>
                  <p>${totalDonationsByCharity[selectedCharityId] || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Beneficiaries Section */}
        <section className="beneficiaries-section">
          <h3>Beneficiaries</h3>
          {beneficiaryMessage && <p className="message success">{beneficiaryMessage}</p>}
          {beneficiaryError && <p className="message error">{beneficiaryError}</p>}
          <div className="create-section">
            <h4>Create Beneficiary</h4>
            <form onSubmit={handleBeneficiarySubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  name="name"
                  type="text"
                  value={beneficiaryFormData.name}
                  onChange={handleBeneficiaryChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Story:</label>
                <textarea
                  name="story"
                  value={beneficiaryFormData.story}
                  onChange={handleBeneficiaryChange}
                  required
                />
              </div>
              <button type="submit" disabled={beneficiaryStatus === 'loading'}>
                Create Beneficiary
              </button>
            </form>
          </div>
          <div className="list-section">
            <h4>All Beneficiaries</h4>
            {beneficiaryStatus === 'loading' && <p>Loading beneficiaries...</p>}
            {beneficiaries && beneficiaries.length > 0 ? (
              <ul className="list">
                {beneficiaries.map((beneficiary) => (
                  <li key={beneficiary.id}>
                    <span>
                      <strong>{beneficiary.name}</strong>: {beneficiary.story}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No beneficiaries found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CharityDashboard;


