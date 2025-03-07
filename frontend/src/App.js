import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Shared/Home';
import Login from './pages/Auth/Login';
import DonorHome from './pages/Donor/DonorHome';
import CharityDashboard from './pages/Charity/CharityDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NotFound from './pages/Shared/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/donor"
          element={
            <ProtectedRoute role="donor">
              <DonorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/charity"
          element={
            <ProtectedRoute role="charity">
              <CharityDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;