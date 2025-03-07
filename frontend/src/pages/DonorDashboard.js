// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createDonation, fetchDonations } from '../redux/donationSlice';
// import { fetchCharities } from '../redux/charitySlice';
// import { logout } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import '../styles/DonorDashboard.css';

// const DonorDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { donations, status, error } = useSelector((state) => state.donation);
//   const { charities } = useSelector((state) => state.charity);
//   const { userInfo } = useSelector((state) => state.auth);
  
//   const [formData, setFormData] = useState({
//     amount: '',
//     charity_id: '', // Will be set via the dropdown selection
//     is_recurring: false,
//     is_anonymous: false,
//   });
//   const [message, setMessage] = useState('');

//   // Fetch donations and charities on mount
//   useEffect(() => {
//     dispatch(fetchDonations());
//     dispatch(fetchCharities());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Check that a charity has been selected
//     if (!formData.charity_id) {
//       setMessage('Please select a charity.');
//       return;
//     }
//     const resultAction = await dispatch(createDonation(formData));
//     if (createDonation.fulfilled.match(resultAction)) {
//       setMessage('Donation created successfully!');
//       setFormData({
//         amount: '',
//         charity_id: '',
//         is_recurring: false,
//         is_anonymous: false,
//       });
//       dispatch(fetchDonations());
//     } else {
//       setMessage('Error creating donation');
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   // Filter only approved charities for the dropdown and list
//   const approvedCharities = charities.filter(
//     (charity) => charity.status === 'approved'
//   );

//   // Helper function: given a donation's charity_id, return the charity's name.
//   const getCharityName = (charityId) => {
//     const charity = charities.find((charity) => charity.id === charityId);
//     return charity ? charity.name : charityId;
//   };

//   return (
//     <div className="donor-dashboard-page">
//       {/* Banner Section */}
//       <header className="donor-banner">
//         <img 
//           src="" 
//           alt="Donate with us" 
//         />
//         <div className="banner-overlay">
//           <h1>DONATE IT</h1>
//           <p>Your contribution brings hope and change.</p>
//         </div>
//       </header>

//       <div className="donor-dashboard-container">
//         <h2>Donor Dashboard</h2>
//         {message && (
//           <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
//             {message}
//           </p>
//         )}

//         {/* Approved Charities Section */}
//         <section className="approved-charities-section">
//           <h3>Approved Charities</h3>
//           {approvedCharities && approvedCharities.length > 0 ? (
//             <ul className="charity-list">
//               {approvedCharities.map((charity) => (
//                 <li key={charity.id}>
//                   <span>
//                     <strong>Name:</strong> {charity.name} | <strong>Description:</strong> {charity.description}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No approved charities available.</p>
//           )}
//         </section>

//         {/* Donation Form Section */}
//         <section className="donation-form-section">
//           <h3>Create a Donation</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Amount:</label>
//               <input
//                 name="amount"
//                 type="number"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Select Charity:</label>
//               <select
//                 name="charity_id"
//                 value={formData.charity_id}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Charity --</option>
//                 {approvedCharities.map((charity) => (
//                   <option key={charity.id} value={charity.id}>
//                     {charity.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="checkbox-group">
//               <input
//                 name="is_recurring"
//                 type="checkbox"
//                 checked={formData.is_recurring}
//                 onChange={handleChange}
//               />
//               <label>Recurring Donation</label>
//             </div>
//             <div className="checkbox-group">
//               <input
//                 name="is_anonymous"
//                 type="checkbox"
//                 checked={formData.is_anonymous}
//                 onChange={handleChange}
//               />
//               <label>Donate Anonymously</label>
//             </div>
//             <button type="submit" disabled={status === 'loading'}>
//               Submit Donation
//             </button>
//           </form>
//         </section>

//         {/* Donation List Section */}
//         <section className="donation-list-section">
//           <h3>Your Donations</h3>
//           {status === 'loading' && <p>Loading donations...</p>}
//           {error && <p className="message error">{error}</p>}
//           {donations && donations.length > 0 ? (
//             <ul className="donation-list">
//               {donations.map((donation) => (
//                 <li key={donation.id}>
//                   <span>
//                     <strong>ID:</strong> {donation.id} | <strong>Amount:</strong> {donation.amount} | <strong>Charity:</strong> {getCharityName(donation.charity_id)}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No donations found.</p>
//           )}
//         </section>

//         {/* About Us Section */}
//         <section className="about-us-section">
//           <h3>About Us</h3>
//           <div className="about-us-content">
//             <img 
//               src="https://stjohn.org.sg/web/wp-content/uploads/elementor/thumbs/Mask-group-47-qaxncp3eiuwsw1izwaxpmg3qr78i9wgs39695nkihs.png" 
//               alt="About Us" 
//             />
//             <div className="about-text">
//               <p>
//                 We are a dedicated non-profit organization focused on making a positive impact in our communities.
//                 Our mission is to support meaningful causes that improve lives and bring hope to those in need.
//               </p>
//               <p>
//                 Your donations fuel our projects, provide essential resources, and create lasting change.
//                 Join us on our journey to make the world a better place—every donation counts.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Logout Section */}
//         <div className="logout-container">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDonation, fetchDonations } from '../redux/donationSlice';
import { fetchCharities } from '../redux/charitySlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/DonorDashboard.css';

const DonorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { donations, status, error } = useSelector((state) => state.donation);
  const { charities } = useSelector((state) => state.charity);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    amount: '',
    charity_id: '',
    is_recurring: false,
    is_anonymous: false,
  });
  const [message, setMessage] = useState('');

  // Fetch donations and charities on mount
  useEffect(() => {
    dispatch(fetchDonations());
    dispatch(fetchCharities());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.charity_id) {
      setMessage('Please select a charity.');
      return;
    }
    const resultAction = await dispatch(createDonation(formData));
    if (createDonation.fulfilled.match(resultAction)) {
      setMessage('Donation created successfully!');
      setFormData({
        amount: '',
        charity_id: '',
        is_recurring: false,
        is_anonymous: false,
      });
      dispatch(fetchDonations());
    } else {
      setMessage('Error creating donation');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Filter only approved charities for the dropdown and list
  const approvedCharities = charities.filter(
    (charity) => charity.status === 'approved'
  );

  // Helper function: given a donation's charity_id, return the charity's name.
  const getCharityName = (charityId) => {
    const charity = charities.find((charity) => charity.id === charityId);
    return charity ? charity.name : charityId;
  };

  return (
    <div className="donor-dashboard-page">
      {/* Banner Section */}
      <header className="donor-banner">
        <div className="banner-overlay">
          <h1>Donate It</h1>
          <p>Your contribution brings hope and transforms lives.</p>
        </div>
      </header>

      <div className="donor-dashboard-container">
        <h2>Welcome, {userInfo?.name || 'Donor'}!</h2>
        {message && (
          <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}

        {/* Approved Charities Section */}
        <section className="approved-charities-section">
          <h3>Our Approved Charities</h3>
          {approvedCharities && approvedCharities.length > 0 ? (
            <ul className="charity-list">
              {approvedCharities.map((charity) => (
                <li key={charity.id}>
                  <span>
                    <strong>{charity.name}</strong>
                  </span>
                  <p>{charity.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No approved charities available at the moment.</p>
          )}
        </section>

        {/* Donation Form Section */}
        <section className="donation-form-section">
          <h3>Make a Donation</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Donation Amount ($):</label>
              <input
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount..."
                required
              />
            </div>
            <div className="form-group">
              <label>Select Charity:</label>
              <select
                name="charity_id"
                value={formData.charity_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose a Charity --</option>
                {approvedCharities.map((charity) => (
                  <option key={charity.id} value={charity.id}>
                    {charity.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkbox-group">
              <input
                name="is_recurring"
                type="checkbox"
                checked={formData.is_recurring}
                onChange={handleChange}
              />
              <label>Recurring Donation</label>
            </div>
            <div className="checkbox-group">
              <input
                name="is_anonymous"
                type="checkbox"
                checked={formData.is_anonymous}
                onChange={handleChange}
              />
              <label>Donate Anonymously</label>
            </div>
            <button type="submit" disabled={status === 'loading'}>
              Submit Donation
            </button>
          </form>
        </section>

        {/* Donation List Section */}
        <section className="donation-list-section">
          <h3>Your Donation History</h3>
          {status === 'loading' && <p>Loading donations...</p>}
          {error && <p className="message error">{error}</p>}
          {donations && donations.length > 0 ? (
            <ul className="donation-list">
              {donations.map((donation) => (
                <li key={donation.id}>
                  <span>
                    <strong>ID:</strong> {donation.id} | <strong>Amount:</strong> ${donation.amount} | <strong>Charity:</strong> {getCharityName(donation.charity_id)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven’t made any donations yet.</p>
          )}
        </section>

        {/* About Us Section */}
        <section className="about-us-section">
          <h3>About Our Cause</h3>
          <div className="about-us-content">
            <img 
              src="https://stjohn.org.sg/web/wp-content/uploads/elementor/thumbs/Mask-group-47-qaxncp3eiuwsw1izwaxpmg3qr78i9wgs39695nkihs.png" 
              alt="About Us" 
            />
            <div className="about-text">
              <p>
                We are a passionate non-profit organization dedicated to creating a brighter future.
                Every donation helps us provide essential services, improve lives, and uplift communities.
              </p>
              <p>
                Join us in our mission to make a lasting difference—your generosity matters!
              </p>
            </div>
          </div>
        </section>

        {/* Logout Section */}
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
