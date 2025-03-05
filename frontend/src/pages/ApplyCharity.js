// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerCharity } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";

// const ApplyCharity = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mission: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerCharity(formData));
//     navigate("/login");
//   };

//   return (
//     <div>
//       <h2>Apply as a Charity</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Charity Name" value={formData.name} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//         <textarea name="mission" placeholder="Mission Statement" value={formData.mission} onChange={handleChange} required />

//         <button type="submit">Submit Application</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default ApplyCharity;
