import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(formData));
    if (register.fulfilled.match(resultAction)) {
      navigate('/login'); // Redirect to login page after successful registration
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        {status === 'failed' && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input 
              name="name" 
              type="text" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="donor">Donor</option>
              <option value="charity">Charity</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={status === 'loading'}>
            Register
          </button>
        </form>
        <p className="link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
