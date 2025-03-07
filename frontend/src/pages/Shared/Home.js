import React from 'react';
import { Link } from 'react-router-dom';
import './pages/Shared/Home.css'; // Ensure you have a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Automated Donation Platform</h1>
      <p>Please log in or register to get started.</p>
      <div className="home-buttons">
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/register" className="home-button">Register</Link>
      </div>
    </div>
  );
};

export default Home;