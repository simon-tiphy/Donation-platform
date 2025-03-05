// import React from "react";
// import { useSelector } from "react-redux";
// import "../styles/CharityDashboard.css";

// const CharityDashboard = () => {
//   const { user } = useSelector((state) => state.auth);

//   // Dummy data for now (replace with Redux data later)
//   const totalDonations = 5000;
//   const totalBeneficiaries = 120;
//   const anonymousDonations = 3000;
//   const nonAnonymousDonations = 2000;
//   const recentDonations = [
//     { id: 1, donor: "John Doe", amount: 200, date: "2025-03-02" },
//     { id: 2, donor: "Jane Smith", amount: 150, date: "2025-03-01" },
//     { id: 3, donor: "Anonymous", amount: 500, date: "2025-02-28" },
//   ];

//   return (
//     <div className="charity-dashboard">
//       <h2>Welcome, {user.name}!</h2>

//       {/* Summary Cards */}
//       <div className="dashboard-cards">
//         <div className="card">
//           <h3>Total Donations</h3>
//           <p>${totalDonations}</p>
//         </div>
//         <div className="card">
//           <h3>Total Beneficiaries</h3>
//           <p>{totalBeneficiaries}</p>
//         </div>
//         <div className="card">
//           <h3>Anonymous Donations</h3>
//           <p>${anonymousDonations}</p>
//         </div>
//         <div className="card">
//           <h3>Non-Anonymous Donations</h3>
//           <p>${nonAnonymousDonations}</p>
//         </div>
//       </div>

//       {/* Recent Donations List */}
//       <div className="recent-donations">
//         <h3>Recent Donations</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Donor</th>
//               <th>Amount</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentDonations.map((donation) => (
//               <tr key={donation.id}>
//                 <td>{donation.donor}</td>
//                 <td>${donation.amount}</td>
//                 <td>{donation.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CharityDashboard;



const CharityDashboard = () => {
  return <h2>Charity Dashboard</h2>;
};

export default CharityDashboard;
