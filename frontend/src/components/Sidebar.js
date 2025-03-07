// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice";
// import "../styles/Sidebar.css";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   if (!user) return null; // Hide sidebar if not logged in

//   return (
//     <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         ☰
//       </button>

//       {/* Welcome Message */}
//       <div className="welcome-message">
//         {isOpen && <h3>Welcome, {user.name}!</h3>}
//       </div>

//       <nav>
//         <ul>
//           {user.role === "donor" && (
//             <>
//               <li><Link to="/donor-dashboard">Dashboard</Link></li>
//               <li><Link to="/donate">Donate</Link></li>
//               <li><Link to="/donation-history">History</Link></li>
//             </>
//           )}

//           {user.role === "charity" && (
//             <>
//               <li><Link to="/charity-dashboard">Dashboard</Link></li>
//               <li><Link to="/manage-beneficiaries">Beneficiaries</Link></li>
//               <li><Link to="/charity-reports">Reports</Link></li>
//             </>
//           )}

//           {user.role === "admin" && (
//             <>
//               <li><Link to="/admin-dashboard">Dashboard</Link></li>
//               <li><Link to="/approve-charities">Approve Charities</Link></li>
//               <li><Link to="/manage-users">Manage Users</Link></li>
//             </>
//           )}

//           <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import '../styles/sidebar.css'; // Import styles

// const Sidebar = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   if (!user) return null; // Hide sidebar if no user is logged in

//   return (
//     <div className="sidebar">
//       <h2>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard</h2>
//       <ul>
//         {user.role === 'donor' && (
//           <>
//             <li><Link to="/donor-dashboard">Home</Link></li>
//             <li><Link to="/donate">Donate</Link></li>
//             <li><Link to="/donation-history">Donation History</Link></li>
//           </>
//         )}
//         {user.role === 'charity' && (
//           <>
//             <li><Link to="/charity-dashboard">Home</Link></li>
//             <li><Link to="/beneficiaries">Manage Beneficiaries</Link></li>
//             <li><Link to="/donations">View Donations</Link></li>
//           </>
//         )}
//         {user.role === 'admin' && (
//           <>
//             <li><Link to="/admin-dashboard">Home</Link></li>
//             <li><Link to="/charity-requests">Charity Applications</Link></li>
//             <li><Link to="/manage-charities">Manage Charities</Link></li>
//           </>
//         )}
//       </ul>

//       {/* Logout Button */}
//       <button className="logout-btn" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Sidebar;
