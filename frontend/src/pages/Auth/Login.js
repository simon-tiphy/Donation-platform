import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../services/authService'; // Corrected path
import { loginSuccess, loginFailure } from '../../store/slices/authSlice'; // Corrected path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await login(userData);
      dispatch(loginSuccess({ user: response.user, token: response.token }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;