
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error } = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(login(formData));
//     if (login.fulfilled.match(resultAction)) {
//       const role = resultAction.payload.role;
//       if (role === 'admin') {
//         navigate('/admin-dashboard');
//       } else if (role === 'charity') {
//         navigate('/charity-dashboard');
//       } else {
//         navigate('/donor-dashboard');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input name="email" type="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input name="password" type="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         <button type="submit" disabled={status === 'loading'}>Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/authSlice';
// import { useNavigate, Link } from 'react-router-dom';


// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error } = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(login(formData));
//     if (login.fulfilled.match(resultAction)) {
//       const role = resultAction.payload.role;
//       if (role === 'admin') {
//         navigate('/admin-dashboard');
//       } else if (role === 'charity') {
//         navigate('/charity-dashboard');
//       } else {
//         navigate('/donor-dashboard');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={status === 'loading'}>
//           Login
//         </button>
//       </form>
//       <p>
//         Don't have an account?{' '}
//         <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      const role = resultAction.payload.role;
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'charity') {
        navigate('/charity-dashboard');
      } else {
        navigate('/donor-dashboard');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Login</h2>
        {status === 'failed' && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={status === 'loading'}>
            Login
          </button>
        </form>
        <p className="link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
