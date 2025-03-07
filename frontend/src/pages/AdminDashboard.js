// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchPendingCharities,
//   fetchApprovedCharities,
//   fetchRejectedCharities,
//   fetchUsers,
//   fetchDonations,
//   updateCharityStatus,
//   deleteUser,
//   deleteCharity,
//   clearMessage,
// } from '../redux/adminSlice';

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const { token, userInfo } = useSelector((state) => state.auth);
//   const {
//     pendingCharities,
//     approvedCharities,
//     rejectedCharities,
//     users,
//     donations,
//     message,
//     status,
//     error,
//   } = useSelector((state) => state.admin);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchPendingCharities());
//       dispatch(fetchApprovedCharities());
//       dispatch(fetchRejectedCharities());
//       dispatch(fetchUsers());
//       dispatch(fetchDonations());
//     }
//   }, [dispatch, token]);

//   // Clear success message after display
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessage());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   const handleUpdateStatus = (charityId, status) => {
//     dispatch(updateCharityStatus({ charityId, status }));
//   };

//   const handleDeleteUser = (userId) => {
//     dispatch(deleteUser(userId));
//   };

//   const handleDeleteCharity = (charityId) => {
//     dispatch(deleteCharity(charityId));
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       {userInfo && <p>Welcome, Admin {userInfo.id}</p>}
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {status === 'loading' && <p>Loading data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {/* Pending Charities Section */}
//       <section>
//         <h3>Pending Charities</h3>
//         {pendingCharities.length ? (
//           <ul>
//             {pendingCharities.map((charity) => (
//               <li key={charity.id}>
//                 <strong>{charity.name}</strong> - {charity.status}
//                 <button onClick={() => handleUpdateStatus(charity.id, 'approved')}>
//                   Approve
//                 </button>
//                 <button onClick={() => handleUpdateStatus(charity.id, 'rejected')}>
//                   Reject
//                 </button>
//                 <button onClick={() => handleDeleteCharity(charity.id)}>
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No pending charities found.</p>
//         )}
//       </section>

//       {/* Approved Charities Section */}
//       <section>
//         <h3>Approved Charities</h3>
//         {approvedCharities.length ? (
//           <ul>
//             {approvedCharities.map((charity) => (
//               <li key={charity.id}>
//                 {charity.name} - {charity.status}
//                 <button onClick={() => handleDeleteCharity(charity.id)}>
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No approved charities found.</p>
//         )}
//       </section>

//       {/* Rejected Charities Section */}
//       <section>
//         <h3>Rejected Charities</h3>
//         {rejectedCharities.length ? (
//           <ul>
//             {rejectedCharities.map((charity) => (
//               <li key={charity.id}>
//                 {charity.name} - {charity.status}
//                 <button onClick={() => handleDeleteCharity(charity.id)}>
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No rejected charities found.</p>
//         )}
//       </section>

//       {/* Users Section */}
//       <section>
//         <h3>All Users</h3>
//         {users.length ? (
//           <ul>
//             {users.map((user) => (
//               <li key={user.id}>
//                 {user.name} - {user.email} - {user.role}
//                 <button onClick={() => handleDeleteUser(user.id)}>
//                   Delete User
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users found.</p>
//         )}
//       </section>

//       {/* Donations Section */}
//       <section>
//         <h3>Donations</h3>
//         {donations.length ? (
//           <ul>
//             {donations.map((donation) => (
//               <li key={donation.id}>
//                 Donation ID: {donation.id} - Amount: {donation.amount} - Donor: {donation.donor_id}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No donations found.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchPendingCharities,
//   fetchApprovedCharities,
//   fetchRejectedCharities,
//   fetchUsers,
//   fetchDonations,
//   updateCharityStatus,
//   deleteUser,
//   deleteCharity,
//   clearMessage,
// } from '../redux/adminSlice';
// import '../styles/AdminDashboard.css';

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const { token, userInfo } = useSelector((state) => state.auth);
//   const {
//     pendingCharities,
//     approvedCharities,
//     rejectedCharities,
//     users,
//     donations,
//     message,
//     status,
//     error,
//   } = useSelector((state) => state.admin);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchPendingCharities());
//       dispatch(fetchApprovedCharities());
//       dispatch(fetchRejectedCharities());
//       dispatch(fetchUsers());
//       dispatch(fetchDonations());
//     }
//   }, [dispatch, token]);

//   // Clear success message after display
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessage());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   const handleUpdateStatus = (charityId, newStatus) => {
//     dispatch(updateCharityStatus({ charityId, status: newStatus }));
//   };

//   const handleDeleteUser = (userId) => {
//     dispatch(deleteUser(userId));
//   };

//   const handleDeleteCharity = (charityId) => {
//     dispatch(deleteCharity(charityId));
//   };

//   return (
//     <div className="admin-dashboard-page">
//       <div className="admin-dashboard-container">
//         <h2>Admin Dashboard</h2>
//         {userInfo && <p className="welcome">Welcome, Admin {userInfo.id}</p>}
//         {message && <p className="admin-message admin-success">{message}</p>}
//         {status === 'loading' && <p>Loading data...</p>}
//         {error && <p className="admin-message admin-error">{error}</p>}

//         {/* Pending Charities Section */}
//         <section className="admin-section">
//           <h3>Pending Charities</h3>
//           {pendingCharities.length ? (
//             <ul>
//               {pendingCharities.map((charity) => (
//                 <li key={charity.id}>
//                   <span>
//                     <strong>{charity.name}</strong> - {charity.status}
//                   </span>
//                   <div className="admin-btn-group">
//                     <button onClick={() => handleUpdateStatus(charity.id, 'approved')}>
//                       Approve
//                     </button>
//                     <button onClick={() => handleUpdateStatus(charity.id, 'rejected')}>
//                       Reject
//                     </button>
//                     <button className="delete" onClick={() => handleDeleteCharity(charity.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No pending charities found.</p>
//           )}
//         </section>

//         {/* Approved Charities Section */}
//         <section className="admin-section">
//           <h3>Approved Charities</h3>
//           {approvedCharities.length ? (
//             <ul>
//               {approvedCharities.map((charity) => (
//                 <li key={charity.id}>
//                   <span>
//                     {charity.name} - {charity.status}
//                   </span>
//                   <div className="admin-btn-group">
//                     <button className="delete" onClick={() => handleDeleteCharity(charity.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No approved charities found.</p>
//           )}
//         </section>

//         {/* Rejected Charities Section */}
//         <section className="admin-section">
//           <h3>Rejected Charities</h3>
//           {rejectedCharities.length ? (
//             <ul>
//               {rejectedCharities.map((charity) => (
//                 <li key={charity.id}>
//                   <span>
//                     {charity.name} - {charity.status}
//                   </span>
//                   <div className="admin-btn-group">
//                     <button className="delete" onClick={() => handleDeleteCharity(charity.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No rejected charities found.</p>
//           )}
//         </section>

//         {/* Users Section */}
//         <section className="admin-section">
//           <h3>All Users</h3>
//           {users.length ? (
//             <ul>
//               {users.map((user) => (
//                 <li key={user.id}>
//                   <span>
//                     {user.name} - {user.email} - {user.role}
//                   </span>
//                   <div className="admin-btn-group">
//                     <button className="delete" onClick={() => handleDeleteUser(user.id)}>
//                       Delete User
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No users found.</p>
//           )}
//         </section>

//         {/* Donations Section */}
//         <section className="admin-section">
//           <h3>Donations</h3>
//           {donations.length ? (
//             <ul>
//               {donations.map((donation) => (
//                 <li key={donation.id}>
//                   <span>
//                     Donation ID: {donation.id} - Amount: {donation.amount} - Donor: {donation.donor_id}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No donations found.</p>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPendingCharities,
  fetchApprovedCharities,
  fetchRejectedCharities,
  fetchUsers,
  fetchDonations,
  updateCharityStatus,
  deleteUser,
  deleteCharity,
  clearMessage,
} from '../redux/adminSlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userInfo } = useSelector((state) => state.auth);
  const {
    pendingCharities,
    approvedCharities,
    rejectedCharities,
    users,
    donations,
    message,
    status,
    error,
  } = useSelector((state) => state.admin);

  // State to track sidebar collapse
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchPendingCharities());
      dispatch(fetchApprovedCharities());
      dispatch(fetchRejectedCharities());
      dispatch(fetchUsers());
      dispatch(fetchDonations());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleUpdateStatus = (charityId, newStatus) => {
    dispatch(updateCharityStatus({ charityId, status: newStatus }));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleDeleteCharity = (charityId) => {
    dispatch(deleteCharity(charityId));
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>{!collapsed ? 'Admin Dashboard' : 'AD'}</h2>
          {userInfo && !collapsed && (
            <p>Welcome, {userInfo.name || `Admin ${userInfo.id}`}</p>
          )}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#pending">
                {!collapsed ? 'Pending Charities' : 'P'}
              </a>
            </li>
            <li>
              <a href="#approved">
                {!collapsed ? 'Approved Charities' : 'A'}
              </a>
            </li>
            <li>
              <a href="#rejected">
                {!collapsed ? 'Rejected Charities' : 'R'}
              </a>
            </li>
            <li>
              <a href="#users">
                {!collapsed ? 'Users' : 'U'}
              </a>
            </li>
            <li>
              <a href="#donations">
                {!collapsed ? 'Donations' : 'D'}
              </a>
            </li>
          </ul>
        </nav>
        {!collapsed && (
          <div className="logout-container">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </aside>
      <main className="admin-main-content">
        <div className="admin-dashboard-container">
          {message && <p className="admin-message admin-success">{message}</p>}
          {status === 'loading' && <p>Loading data...</p>}
          {error && <p className="admin-message admin-error">{error}</p>}

          {/* Pending Charities Section */}
          <section className="admin-section" id="pending">
            <h3>Pending Charities</h3>
            {pendingCharities.length ? (
              <ul>
                {pendingCharities.map((charity) => (
                  <li key={charity.id}>
                    <span>
                      <strong>{charity.name}</strong> - {charity.status}
                    </span>
                    <div className="admin-btn-group">
                      <button onClick={() => handleUpdateStatus(charity.id, 'approved')}>
                        Approve
                      </button>
                      <button onClick={() => handleUpdateStatus(charity.id, 'rejected')}>
                        Reject
                      </button>
                      <button className="delete" onClick={() => handleDeleteCharity(charity.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending charities found.</p>
            )}
          </section>

          {/* Approved Charities Section */}
          <section className="admin-section" id="approved">
            <h3>Approved Charities</h3>
            {approvedCharities.length ? (
              <ul>
                {approvedCharities.map((charity) => (
                  <li key={charity.id}>
                    <span>
                      {charity.name} - {charity.status}
                    </span>
                    <div className="admin-btn-group">
                      <button className="delete" onClick={() => handleDeleteCharity(charity.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No approved charities found.</p>
            )}
          </section>

          {/* Rejected Charities Section */}
          <section className="admin-section" id="rejected">
            <h3>Rejected Charities</h3>
            {rejectedCharities.length ? (
              <ul>
                {rejectedCharities.map((charity) => (
                  <li key={charity.id}>
                    <span>
                      {charity.name} - {charity.status}
                    </span>
                    <div className="admin-btn-group">
                      <button className="delete" onClick={() => handleDeleteCharity(charity.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No rejected charities found.</p>
            )}
          </section>

          {/* Users Section */}
          <section className="admin-section" id="users">
            <h3>All Users</h3>
            {users.length ? (
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <span>
                      {user.name} - {user.email} - {user.role}
                    </span>
                    <div className="admin-btn-group">
                      <button className="delete" onClick={() => handleDeleteUser(user.id)}>
                        Delete User
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </section>

          {/* Donations Section */}
          <section className="admin-section" id="donations">
            <h3>Donations</h3>
            {donations.length ? (
              <ul>
                {donations.map((donation) => (
                  <li key={donation.id}>
                    <span>
                      Donation ID: {donation.id} - Amount: {donation.amount} - Donor: {donation.donor_id}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donations found.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
