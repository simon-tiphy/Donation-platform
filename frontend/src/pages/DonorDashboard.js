// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCharity, setDonationAmount, setDonationFrequency, toggleAnonymous, setPaymentMethod } from "../redux/donationSlice";
// import { Link } from "react-router-dom";
// import "../styles/DonorDashboard.css";

// const DonorDashboard = () => {
//   const dispatch = useDispatch();
  
//   // Redux state
//   const selectedCharity = useSelector((state) => state.donation.selectedCharity);
//   const donationAmount = useSelector((state) => state.donation.donationAmount);
//   const donationFrequency = useSelector((state) => state.donation.donationFrequency);
//   const anonymous = useSelector((state) => state.donation.anonymous);
//   const paymentMethod = useSelector((state) => state.donation.paymentMethod);

//   // Local state for charity selection
//   const [charities] = useState([
//     { id: 1, name: "Charity A" },
//     { id: 2, name: "Charity B" },
//     { id: 3, name: "Charity C" },
//   ]);

//   // Handle form updates
//   const handleCharityChange = (e) => {
//     dispatch(setCharity(e.target.value));
//   };

//   const handleAmountChange = (e) => {
//     dispatch(setDonationAmount(e.target.value));
//   };

//   const handleFrequencyChange = (e) => {
//     dispatch(setDonationFrequency(e.target.value));
//   };

//   const handleAnonymousChange = () => {
//     dispatch(toggleAnonymous());
//   };

//   const handlePaymentMethodChange = (e) => {
//     dispatch(setPaymentMethod(e.target.value));
//   };

//   const handleDonate = () => {
//     // Placeholder for the actual donation logic
//     console.log("Donation details: ", {
//       selectedCharity,
//       donationAmount,
//       donationFrequency,
//       anonymous,
//       paymentMethod,
//     });
//   };

//   return (
//     <div className="donor-dashboard">
//       <h1>Welcome </h1>

//       <div className="donation-form">
//         <h2>Choose a charity to donate to</h2>
//         <select onChange={handleCharityChange} value={selectedCharity}>
//           <option value="">Select a charity</option>
//           {charities.map((charity) => (
//             <option key={charity.id} value={charity.name}>
//               {charity.name}
//             </option>
//           ))}
//         </select>

//         <h2>Donation Details</h2>
//         <div className="donation-amount">
//           <label htmlFor="amount">Amount to Donate:</label>
//           <input
//             type="number"
//             id="amount"
//             value={donationAmount}
//             onChange={handleAmountChange}
//             placeholder="Enter amount"
//           />
//         </div>

//         <div className="donation-frequency">
//           <label htmlFor="frequency">Donation Frequency:</label>
//           <select onChange={handleFrequencyChange} value={donationFrequency}>
//             <option value="one-time">One-Time</option>
//             <option value="recurring">Recurring</option>
//           </select>
//         </div>

//         <div className="anonymous-donation">
//           <label htmlFor="anonymous">Donate Anonymously:</label>
//           <input
//             type="checkbox"
//             checked={anonymous}
//             onChange={handleAnonymousChange}
//           />
//         </div>

//         <div className="payment-method">
//           <label htmlFor="payment-method">Payment Method:</label>
//           <select onChange={handlePaymentMethodChange} value={paymentMethod}>
//             <option value="paypal">PayPal</option>
//             <option value="stripe">Stripe</option>
//           </select>
//         </div>

//         <button onClick={handleDonate}>Donate</button>
//       </div>

//       <div className="donation-history">
//         <h2>Donation History</h2>
//         <Link to="/donation-history">View Your Donation History</Link>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;


const DonorDashboard = () => {
  return <h2>Welcome to Donor Dashboard</h2>;
};

export default DonorDashboard;
