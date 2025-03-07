import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../services/authService'; // Corrected path
import { loginSuccess, loginFailure } from '../../store/slices/authSlice'; // Corrected path

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, password, role };
      const response = await register(userData);
      dispatch(loginSuccess({ user: response.user, token: response.token }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="donor">Donor</option>
        <option value="charity">Charity</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;