// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createCharity,
//   fetchCharities,
//   fetchNonAnonymousDonors,
//   fetchAnonymousDonations,
//   fetchTotalDonations,
//   clearMessage,
// } from '../redux/charitySlice';

// const CharityDashboard = () => {
//   const dispatch = useDispatch();
//   const { charities, donorsByCharity, anonymousDonationsByCharity, totalDonationsByCharity, status, error, message } = useSelector(
//     (state) => state.charity
//   );
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//   });
//   const [selectedCharityId, setSelectedCharityId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCharities());
//   }, [dispatch]);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessage());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(createCharity(formData));
//     dispatch(fetchCharities());
//     setFormData({ name: '', description: '' });
//   };

//   const handleSelectCharity = (charityId) => {
//     setSelectedCharityId(charityId);
//     // Fetch donor and donation details for the selected charity
//     dispatch(fetchNonAnonymousDonors(charityId));
//     dispatch(fetchAnonymousDonations(charityId));
//     dispatch(fetchTotalDonations(charityId));
//   };

//   return (
//     <div>
//       <h2>Charity Dashboard</h2>
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <section>
//         <h3>Create a New Charity</h3>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Name:</label>
//             <input
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" disabled={status === 'loading'}>
//             Create Charity
//           </button>
//         </form>
//       </section>

//       <section>
//         <h3>All Charities</h3>
//         {status === 'loading' && <p>Loading charities...</p>}
//         {charities && charities.length > 0 ? (
//           <ul>
//             {charities.map((charity) => (
//               <li key={charity.id}>
//                 <strong>{charity.name}</strong> - {charity.description} ({charity.status})
//                 <button onClick={() => handleSelectCharity(charity.id)}>
//                   View Details
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No charities found.</p>
//         )}
//       </section>

//       {selectedCharityId && (
//         <section>
//           <h3>Charity Details (ID: {selectedCharityId})</h3>
//           <div>
//             <h4>Non-Anonymous Donors</h4>
//             {donorsByCharity[selectedCharityId] ? (
//               <ul>
//                 {donorsByCharity[selectedCharityId].map((entry, index) => (
//                   <li key={index}>
//                     Donor: {entry.donor.name} ({entry.donor.email}) - Donation: {entry.donation.amount}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No non-anonymous donors found.</p>
//             )}
//           </div>
//           <div>
//             <h4>Anonymous Donations</h4>
//             {anonymousDonationsByCharity[selectedCharityId] ? (
//               <ul>
//                 {anonymousDonationsByCharity[selectedCharityId].map((amount, index) => (
//                   <li key={index}>${amount}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No anonymous donations found.</p>
//             )}
//           </div>
//           <div>
//             <h4>Total Donations</h4>
//             <p>${totalDonationsByCharity[selectedCharityId] || 0}</p>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default CharityDashboard;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createCharity,
//   fetchCharities,
//   fetchNonAnonymousDonors,
//   fetchAnonymousDonations,
//   fetchTotalDonations,
//   clearMessage,
// } from '../redux/charitySlice';
// import '../styles/CharityDashboard.css';

// const CharityDashboard = () => {
//   const dispatch = useDispatch();
//   const {
//     charities,
//     donorsByCharity,
//     anonymousDonationsByCharity,
//     totalDonationsByCharity,
//     status,
//     error,
//     message,
//   } = useSelector((state) => state.charity);
//   const [formData, setFormData] = useState({ name: '', description: '' });
//   const [selectedCharityId, setSelectedCharityId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCharities());
//   }, [dispatch]);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => dispatch(clearMessage()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(createCharity(formData));
//     dispatch(fetchCharities());
//     setFormData({ name: '', description: '' });
//   };

//   const handleSelectCharity = (charityId) => {
//     setSelectedCharityId(charityId);
//     dispatch(fetchNonAnonymousDonors(charityId));
//     dispatch(fetchAnonymousDonations(charityId));
//     dispatch(fetchTotalDonations(charityId));
//   };

//   return (
//     <div className="charity-dashboard-page">
//       <div className="charity-dashboard-container">
//         <h2>Charity Dashboard</h2>
//         {message && <p className="message success">{message}</p>}
//         {error && <p className="message error">{error}</p>}
        
//         {/* Create Charity Section */}
//         <section className="create-charity-section">
//           <h3>Create a New Charity</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit" disabled={status === 'loading'}>
//               Create Charity
//             </button>
//           </form>
//         </section>

//         {/* List of Charities Section */}
//         <section className="charity-list-section">
//           <h3>All Charities</h3>
//           {status === 'loading' && <p>Loading charities...</p>}
//           {charities && charities.length > 0 ? (
//             <ul className="charity-list">
//               {charities.map((charity) => (
//                 <li key={charity.id}>
//                   <span>
//                     <strong>{charity.name}</strong> - {charity.description} (
//                     {charity.status})
//                   </span>
//                   <button onClick={() => handleSelectCharity(charity.id)}>
//                     View Details
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No charities found.</p>
//           )}
//         </section>

//         {/* Charity Details Section */}
//         {selectedCharityId && (
//           <section className="charity-details-section">
//             <h3>Charity Details (ID: {selectedCharityId})</h3>
//             <div className="details-grid">
//               <div className="detail-card">
//                 <h4>Non-Anonymous Donors</h4>
//                 {donorsByCharity[selectedCharityId] ? (
//                   <ul>
//                     {donorsByCharity[selectedCharityId].map((entry, index) => (
//                       <li key={index}>
//                         Donor: {entry.donor.name} ({entry.donor.email}) - Donation: ${entry.donation.amount}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No non-anonymous donors found.</p>
//                 )}
//               </div>
//               <div className="detail-card">
//                 <h4>Anonymous Donations</h4>
//                 {anonymousDonationsByCharity[selectedCharityId] ? (
//                   <ul>
//                     {anonymousDonationsByCharity[selectedCharityId].map((amount, index) => (
//                       <li key={index}>${amount}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No anonymous donations found.</p>
//                 )}
//               </div>
//               <div className="detail-card">
//                 <h4>Total Donations</h4>
//                 <p>${totalDonationsByCharity[selectedCharityId] || 0}</p>
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CharityDashboard;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createCharity,
//   fetchCharities,
//   fetchNonAnonymousDonors,
//   fetchAnonymousDonations,
//   fetchTotalDonations,
//   clearMessage,
// } from '../redux/charitySlice';
// import { logout } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import '../styles/CharityDashboard.css';

// const CharityDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     charities,
//     donorsByCharity,
//     anonymousDonationsByCharity,
//     totalDonationsByCharity,
//     status,
//     error,
//     message,
//   } = useSelector((state) => state.charity);
//   const [formData, setFormData] = useState({ name: '', description: '' });
//   const [selectedCharityId, setSelectedCharityId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCharities());
//   }, [dispatch]);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => dispatch(clearMessage()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(createCharity(formData));
//     dispatch(fetchCharities());
//     setFormData({ name: '', description: '' });
//   };

//   const handleSelectCharity = (charityId) => {
//     setSelectedCharityId(charityId);
//     dispatch(fetchNonAnonymousDonors(charityId));
//     dispatch(fetchAnonymousDonations(charityId));
//     dispatch(fetchTotalDonations(charityId));
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <div className="charity-dashboard-page">
//       <div className="charity-dashboard-container">
//         <h2>Charity Dashboard</h2>
//         {message && <p className="message success">{message}</p>}
//         {error && <p className="message error">{error}</p>}
        
//         {/* Create Charity Section */}
//         <section className="create-charity-section">
//           <h3>Create a New Charity</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit" disabled={status === 'loading'}>
//               Create Charity
//             </button>
//           </form>
//         </section>

//         {/* List of Charities Section */}
//         <section className="charity-list-section">
//           <h3>All Charities</h3>
//           {status === 'loading' && <p>Loading charities...</p>}
//           {charities && charities.length > 0 ? (
//             <ul className="charity-list">
//               {charities.map((charity) => (
//                 <li key={charity.id}>
//                   <span>
//                     <strong>{charity.name}</strong> - {charity.description} (
//                     {charity.status})
//                   </span>
//                   <button onClick={() => handleSelectCharity(charity.id)}>
//                     View Details
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No charities found.</p>
//           )}
//         </section>

//         {/* Charity Details Section */}
//         {selectedCharityId && (
//           <section className="charity-details-section">
//             <h3>Charity Details (ID: {selectedCharityId})</h3>
//             <div className="details-grid">
//               <div className="detail-card">
//                 <h4>Non-Anonymous Donors</h4>
//                 {donorsByCharity[selectedCharityId] ? (
//                   <ul>
//                     {donorsByCharity[selectedCharityId].map((entry, index) => (
//                       <li key={index}>
//                         Donor: {entry.donor.name} ({entry.donor.email}) - Donation: ${entry.donation.amount}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No non-anonymous donors found.</p>
//                 )}
//               </div>
//               <div className="detail-card">
//                 <h4>Anonymous Donations</h4>
//                 {anonymousDonationsByCharity[selectedCharityId] ? (
//                   <ul>
//                     {anonymousDonationsByCharity[selectedCharityId].map((amount, index) => (
//                       <li key={index}>${amount}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No anonymous donations found.</p>
//                 )}
//               </div>
//               <div className="detail-card">
//                 <h4>Total Donations</h4>
//                 <p>${totalDonationsByCharity[selectedCharityId] || 0}</p>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Logout Button */}
//         <div className="logout-container">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CharityDashboard;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createCharity,
//   fetchCharities,
//   fetchNonAnonymousDonors,
//   fetchAnonymousDonations,
//   fetchTotalDonations,
//   clearMessage as clearCharityMessage,
// } from '../redux/charitySlice';
// import {
//   createBeneficiary,
//   fetchBeneficiaries,
//   clearBeneficiaryMessage,
// } from '../redux/beneficiarySlice';
// import { logout } from '../redux/authSlice';
// import { useNavigate, Link } from 'react-router-dom';
// import '../styles/CharityDashboard.css';

// const CharityDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Charity slice state
//   const {
//     charities,
//     donorsByCharity,
//     anonymousDonationsByCharity,
//     totalDonationsByCharity,
//     status,
//     error,
//     message,
//   } = useSelector((state) => state.charity);

//   // Beneficiaries slice state
//   const {
//     beneficiaries,
//     status: beneficiaryStatus,
//     error: beneficiaryError,
//     message: beneficiaryMessage,
//   } = useSelector((state) => state.beneficiaries);

//   const [charityFormData, setCharityFormData] = useState({ name: '', description: '' });
//   const [selectedCharityId, setSelectedCharityId] = useState(null);

//   // Beneficiary form state
//   const [beneficiaryFormData, setBeneficiaryFormData] = useState({ name: '', story: '' });

//   // Fetch charities when the component mounts
//   useEffect(() => {
//     dispatch(fetchCharities());
//   }, [dispatch]);

//   // Fetch beneficiaries (for the logged-in charity) when the dashboard loads
//   useEffect(() => {
//     dispatch(fetchBeneficiaries());
//   }, [dispatch]);

//   // Clear messages after a timeout
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => dispatch(clearCharityMessage()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   useEffect(() => {
//     if (beneficiaryMessage) {
//       const timer = setTimeout(() => dispatch(clearBeneficiaryMessage()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [beneficiaryMessage, dispatch]);

//   // Charity form handling
//   const handleCharityChange = (e) => {
//     const { name, value } = e.target;
//     setCharityFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCharitySubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(createCharity(charityFormData));
//     dispatch(fetchCharities());
//     setCharityFormData({ name: '', description: '' });
//   };

//   const handleSelectCharity = (charityId) => {
//     setSelectedCharityId(charityId);
//     dispatch(fetchNonAnonymousDonors(charityId));
//     dispatch(fetchAnonymousDonations(charityId));
//     dispatch(fetchTotalDonations(charityId));
//   };

//   // Beneficiary form handling
//   const handleBeneficiaryChange = (e) => {
//     const { name, value } = e.target;
//     setBeneficiaryFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBeneficiarySubmit = (e) => {
//     e.preventDefault();
//     dispatch(createBeneficiary(beneficiaryFormData));
//     setBeneficiaryFormData({ name: '', story: '' });
//     // Optionally, refresh the list of beneficiaries
//     dispatch(fetchBeneficiaries());
//   };

//   // Logout handler
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <div className="charity-dashboard-page">
//       <div className="charity-dashboard-container">
//         <h2>Charity Dashboard</h2>
//         <div className="dashboard-nav">
//           {/* Navigation link for beneficiaries (if you want to switch pages) */}
//           <Link to="/charity-dashboard/beneficiaries">
//             <button className="nav-btn">Go To Beneficiaries Page</button>
//           </Link>
//         </div>
//         {message && <p className="message success">{message}</p>}
//         {error && <p className="message error">{error}</p>}

//         {/* Create Charity Section */}
//         <section className="create-charity-section">
//           <h3>Create a New Charity</h3>
//           <form onSubmit={handleCharitySubmit}>
//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={charityFormData.name}
//                 onChange={handleCharityChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={charityFormData.description}
//                 onChange={handleCharityChange}
//                 required
//               />
//             </div>
//             <button type="submit" disabled={status === 'loading'}>
//               Create Charity
//             </button>
//           </form>
//         </section>

//         {/* List of Charities Section */}
//         <section className="charity-list-section">
//           <h3>All Charities</h3>
//           {status === 'loading' && <p>Loading charities...</p>}
//           {charities && charities.length > 0 ? (
//             <ul className="charity-list">
//               {charities.map((charity) => (
//                 <li key={charity.id}>
//                   <span>
//                     <strong>{charity.name}</strong> - {charity.description} (
//                     {charity.status})
//                   </span>
//                   <button onClick={() => handleSelectCharity(charity.id)}>
//                     View Details
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No charities found.</p>
//           )}
//         </section>

//         {/* Charity Details Section */}
//         {selectedCharityId && (
//           <section className="charity-details-section">
//             <h3>Charity Details (ID: {selectedCharityId})</h3>
//             <div className="details-grid">
//               <div className="detail-card">
//                 <h4>Non-Anonymous Donors</h4>
//                 {donorsByCharity[selectedCharityId] ? (
//                   <ul>
//                     {donorsByCharity[selectedCharityId].map((entry, index) => (
//                       <li key={index}>
//                         Donor: {entry.donor.name} ({entry.donor.email}) - Donation: ${entry.donation.amount}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No non-anonymous donors found.</p>
//                 )}
//               </div>
//               <div className="detail-card">
//                 <h4>Anonymous Donations</h4>
//                 {anonymousDonationsByCharity[selectedCharityId] ? (
//                   <ul>
//                     {anonymousDonationsByCharity[selectedCharityId].map((amount, index) => (
//                       <li key={index}>${amount}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No anonymous donations found.</p>
//                 )}
//               </div>
//               <div className="detail-card">
//                 <h4>Total Donations</h4>
//                 <p>${totalDonationsByCharity[selectedCharityId] || 0}</p>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Beneficiaries Section */}
//         <section className="beneficiaries-section">
//           <h3>Beneficiaries</h3>
//           {beneficiaryMessage && <p className="message success">{beneficiaryMessage}</p>}
//           {beneficiaryError && <p className="message error">{beneficiaryError}</p>}
//           <div className="create-beneficiary-section">
//             <h4>Create Beneficiary</h4>
//             <form onSubmit={handleBeneficiarySubmit}>
//               <div className="form-group">
//                 <label>Name:</label>
//                 <input
//                   name="name"
//                   type="text"
//                   value={beneficiaryFormData.name}
//                   onChange={handleBeneficiaryChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Story:</label>
//                 <textarea
//                   name="story"
//                   value={beneficiaryFormData.story}
//                   onChange={handleBeneficiaryChange}
//                   required
//                 />
//               </div>
//               <button type="submit" disabled={beneficiaryStatus === 'loading'}>
//                 Create Beneficiary
//               </button>
//             </form>
//           </div>
//           <div className="beneficiaries-list-section">
//             <h4>All Beneficiaries</h4>
//             {beneficiaryStatus === 'loading' && <p>Loading beneficiaries...</p>}
//             {beneficiaries && beneficiaries.length > 0 ? (
//               <ul className="beneficiaries-list">
//                 {beneficiaries.map((beneficiary) => (
//                   <li key={beneficiary.id}>
//                     <span>
//                       <strong>{beneficiary.name}</strong>: {beneficiary.story}
//                     </span>
//                     {/* Here you can add Edit/Delete functionality */}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No beneficiaries found.</p>
//             )}
//           </div>
//         </section>

//         {/* Logout Button */}
//         <div className="logout-container">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CharityDashboard;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createCharity,
//   fetchCharities,
//   fetchNonAnonymousDonors,
//   fetchAnonymousDonations,
//   fetchTotalDonations,
//   clearMessage as clearCharityMessage,
// } from '../redux/charitySlice';
// import {
//   createBeneficiary,
//   fetchBeneficiaries,
//   clearBeneficiaryMessage,
// } from '../redux/beneficiarySlice';
// import { logout } from '../redux/authSlice';
// import { useNavigate, Link } from 'react-router-dom';
// import '../styles/CharityDashboard.css';

// const CharityDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Charity slice state
//   const {
//     charities,
//     donorsByCharity,
//     anonymousDonationsByCharity,
//     totalDonationsByCharity,
//     status,
//     error,
//     message,
//   } = useSelector((state) => state.charity);

//   // Beneficiaries slice state
//   const {
//     beneficiaries,
//     status: beneficiaryStatus,
//     error: beneficiaryError,
//     message: beneficiaryMessage,
//   } = useSelector((state) => state.beneficiaries);

//   const [charityFormData, setCharityFormData] = useState({ name: '', description: '' });
//   const [selectedCharityId, setSelectedCharityId] = useState(null);
//   const [beneficiaryFormData, setBeneficiaryFormData] = useState({ name: '', story: '' });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch charities and beneficiaries on mount
//   useEffect(() => {
//     dispatch(fetchCharities());
//     dispatch(fetchBeneficiaries());
//   }, [dispatch]);

//   // Clear messages after a short timeout
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => dispatch(clearCharityMessage()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   useEffect(() => {
//     if (beneficiaryMessage) {
//       const timer = setTimeout(() => dispatch(clearBeneficiaryMessage()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [beneficiaryMessage, dispatch]);

//   // Handlers for Charity Form
//   const handleCharityChange = (e) => {
//     const { name, value } = e.target;
//     setCharityFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCharitySubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(createCharity(charityFormData));
//     dispatch(fetchCharities());
//     setCharityFormData({ name: '', description: '' });
//   };

//   const handleSelectCharity = (charityId) => {
//     setSelectedCharityId(charityId);
//     dispatch(fetchNonAnonymousDonors(charityId));
//     dispatch(fetchAnonymousDonations(charityId));
//     dispatch(fetchTotalDonations(charityId));
//     setIsModalOpen(true);
//   };

//   // Handlers for Beneficiary Form
//   const handleBeneficiaryChange = (e) => {
//     const { name, value } = e.target;
//     setBeneficiaryFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBeneficiarySubmit = (e) => {
//     e.preventDefault();
//     dispatch(createBeneficiary(beneficiaryFormData));
//     setBeneficiaryFormData({ name: '', story: '' });
//     dispatch(fetchBeneficiaries());
//   };

//   // Logout handler
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   // Modal close handler
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCharityId(null);
//   };

//   return (
//     <div className="charity-dashboard-page">
//       <aside className="sidebar">
//         <h2>Dashboard</h2>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/charity-dashboard">Home</Link>
//             </li>
//             <li>
//               <Link to="/charity-dashboard/beneficiaries">Beneficiaries</Link>
//             </li>
//             <li>
//               <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </li>
//           </ul>
//         </nav>
//       </aside>
//       <main className="dashboard-main">
//         <header className="dashboard-header">
//           <h2>Charity Dashboard</h2>
//           {message && <p className="message success">{message}</p>}
//           {error && <p className="message error">{error}</p>}
//         </header>

//         {/* Create Charity Section */}
//         <section className="create-section">
//           <h3>Create New Charity</h3>
//           <form onSubmit={handleCharitySubmit}>
//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={charityFormData.name}
//                 onChange={handleCharityChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={charityFormData.description}
//                 onChange={handleCharityChange}
//                 required
//               />
//             </div>
//             <button type="submit" disabled={status === 'loading'}>
//               Create Charity
//             </button>
//           </form>
//         </section>

//         {/* List of Charities Section */}
//         <section className="list-section">
//           <h3>All Charities</h3>
//           {status === 'loading' && <p>Loading charities...</p>}
//           {charities && charities.length > 0 ? (
//             <ul className="list">
//               {charities.map((charity) => (
//                 <li key={charity.id}>
//                   <div className="list-item">
//                     <span>
//                       <strong>{charity.name}</strong> – {charity.description} ({charity.status})
//                     </span>
//                     <button onClick={() => handleSelectCharity(charity.id)}>
//                       View Details
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No charities found.</p>
//           )}
//         </section>

//         {/* Charity Details Modal */}
//         {isModalOpen && selectedCharityId && (
//           <div className="modal-overlay" onClick={closeModal}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <button className="modal-close" onClick={closeModal}>&times;</button>
//               <h3>Charity Details (ID: {selectedCharityId})</h3>
//               <div className="details-grid">
//                 <div className="detail-card">
//                   <h4>Non-Anonymous Donors</h4>
//                   {donorsByCharity[selectedCharityId] ? (
//                     <ul>
//                       {donorsByCharity[selectedCharityId].map((entry, index) => (
//                         <li key={index}>
//                           {entry.donor.name} ({entry.donor.email}) – ${entry.donation.amount}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>No non-anonymous donors found.</p>
//                   )}
//                 </div>
//                 <div className="detail-card">
//                   <h4>Anonymous Donations</h4>
//                   {anonymousDonationsByCharity[selectedCharityId] ? (
//                     <ul>
//                       {anonymousDonationsByCharity[selectedCharityId].map((amount, index) => (
//                         <li key={index}>${amount}</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>No anonymous donations found.</p>
//                   )}
//                 </div>
//                 <div className="detail-card">
//                   <h4>Total Donations</h4>
//                   <p>${totalDonationsByCharity[selectedCharityId] || 0}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Beneficiaries Section */}
//         <section className="beneficiaries-section">
//           <h3>Beneficiaries</h3>
//           {beneficiaryMessage && <p className="message success">{beneficiaryMessage}</p>}
//           {beneficiaryError && <p className="message error">{beneficiaryError}</p>}
//           <div className="create-section">
//             <h4>Create Beneficiary</h4>
//             <form onSubmit={handleBeneficiarySubmit}>
//               <div className="form-group">
//                 <label>Name:</label>
//                 <input
//                   name="name"
//                   type="text"
//                   value={beneficiaryFormData.name}
//                   onChange={handleBeneficiaryChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Story:</label>
//                 <textarea
//                   name="story"
//                   value={beneficiaryFormData.story}
//                   onChange={handleBeneficiaryChange}
//                   required
//                 />
//               </div>
//               <button type="submit" disabled={beneficiaryStatus === 'loading'}>
//                 Create Beneficiary
//               </button>
//             </form>
//           </div>
//           <div className="list-section">
//             <h4>All Beneficiaries</h4>
//             {beneficiaryStatus === 'loading' && <p>Loading beneficiaries...</p>}
//             {beneficiaries && beneficiaries.length > 0 ? (
//               <ul className="list">
//                 {beneficiaries.map((beneficiary) => (
//                   <li key={beneficiary.id}>
//                     <span>
//                       <strong>{beneficiary.name}</strong>: {beneficiary.story}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No beneficiaries found.</p>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default CharityDashboard;


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
