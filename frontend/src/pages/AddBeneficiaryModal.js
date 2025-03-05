// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addBeneficiary } from "../redux/beneficiarySlice";
// import "../styles/Modal.css"; // Style for the popup modal

// const AddBeneficiaryModal = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "Male",
//     needs: "",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addBeneficiary(formData)); // Save to Redux store
//     onClose(); // Close the modal
//   };

//   // If modal is closed, return nothing
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add Beneficiary</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
//           <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <textarea name="needs" placeholder="Needs (e.g., sanitary pads, food, etc.)" value={formData.needs} onChange={handleChange} required></textarea>
//           <div className="modal-buttons">
//             <button type="submit">Add Beneficiary</button>
//             <button type="button" onClick={onClose} className="close-btn">Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBeneficiaryModal;
