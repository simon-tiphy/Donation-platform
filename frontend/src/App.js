// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider, useSelector } from "react-redux";
// import store from "./redux/store";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DonorDashboard from "./pages/DonorDashboard";
// import CharityDashboard from "./pages/CharityDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import ManageBeneficiaries from "./pages/ManageBeneficiaries"; // Import the page
// import RoleProtectedRoute from "./components/RoleProtectedRoute";
// import Sidebar from "./components/Sidebar";
// import PendingApproval from "./pages/PendingApproval";
// import DonationHistory from "./pages/DonationHistory";



// const AppContent = () => {
//   const user = useSelector((state) => state.auth.user);

//   return (
//     <div className="app-container">
//       {user && <Sidebar />}
//       <div className="main-content">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/pending-approval" element={<PendingApproval />} />

//           {/* Role-based protected routes */}
//           <Route element={<RoleProtectedRoute allowedRoles={["donor"]} />}>
//             <Route path="/donor-dashboard" element={<DonorDashboard />} />
//             <Route path="/donation-history" element={<DonationHistory />} /> 

//           </Route>

//           <Route element={<RoleProtectedRoute allowedRoles={["charity"]} />}>
//             <Route path="/charity-dashboard" element={<CharityDashboard />} />
//             <Route path="/manage-beneficiaries" element={<ManageBeneficiaries />} /> 
//           </Route>

//           <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           </Route>

//           <Route path="*" element={<Login />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <AppContent />
//       </Router>
//     </Provider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DonorDashboard from "./pages/DonorDashboard";
import CharityDashboard from "./pages/CharityDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/donor-dashboard" 
            element={<ProtectedRoute allowedRoles={["donor"]}><DonorDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/charity-dashboard" 
            element={<ProtectedRoute allowedRoles={["charity"]}><CharityDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
