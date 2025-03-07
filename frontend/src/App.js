import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DonorDashboard from "./pages/DonorDashboard";
import CharityDashboard from "./pages/CharityDashboard";
import BeneficiariesDashboard from "./pages/BeneficiariesDashboard"; // Import the beneficiaries component
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
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <DonorDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/charity-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["charity"]}>
                <CharityDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/charity-dashboard/beneficiaries" 
            element={
              <ProtectedRoute allowedRoles={["charity"]}>
                <BeneficiariesDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
