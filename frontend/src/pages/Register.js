// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/authSlice";
// import { useNavigate, Link } from "react-router-dom";
// import "../styles/Register.css"; // Import the updated CSS file

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "donor",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(formData));

//     if (!error) {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-box">
//         <h2>Join Us</h2>
//         <p className="subtext">Make an impact with your donations.</p>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

//           <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="donor">Donor</option>
//             <option value="charity">Charity</option>
//             <option value="admin">Admin</option>
//           </select>

//           <button type="submit" disabled={status === "loading"}>Register</button>
//         </form>
//         {error && <p className="error-message">{error}</p>}

//         <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="donor">Donor</option>
          <option value="charity">Charity</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
