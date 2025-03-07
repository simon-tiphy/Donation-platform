import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {role === 'donor' && <Link to="/donor">Donor Dashboard</Link>}
        {role === 'charity' && <Link to="/charity">Charity Dashboard</Link>}
        {role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
        {!role && <Link to="/login">Login</Link>}
      </nav>
    </header>
  );
};

export default Header;