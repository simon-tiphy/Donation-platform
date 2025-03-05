import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getPendingCharities,
  getDonations,
  changeCharityStatus,
  approveCharityUser,
  removeCharity,
  removeUser,
} from "../redux/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, pendingCharities, donations, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPendingCharities());
    dispatch(getDonations());
  }, [dispatch]);

  // ✅ Approve/reject charity organizations
  const handleApproveCharity = (charityId) => {
    dispatch(changeCharityStatus({ charityId, status: "approved" }));
  };

  const handleRejectCharity = (charityId) => {
    dispatch(changeCharityStatus({ charityId, status: "rejected" }));
  };

  // ✅ Approve/reject charity users
  const handleApproveUser = (userId) => {
    dispatch(approveCharityUser({ userId, status: "approved" }));
  };

  const handleRejectUser = (userId) => {
    dispatch(approveCharityUser({ userId, status: "rejected" }));
  };

  // ✅ Delete actions
  const handleDeleteUser = (userId) => {
    dispatch(removeUser(userId));
  };

  const handleDeleteCharity = (charityId) => {
    dispatch(removeCharity(charityId));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <section>
        <h2>Pending Charities</h2>
        {pendingCharities.map((charity) => (
          <div key={charity.id}>
            <p>{charity.name}</p>
            <button onClick={() => handleApproveCharity(charity.id)}>Approve</button>
            <button onClick={() => handleRejectCharity(charity.id)}>Reject</button>
            <button onClick={() => handleDeleteCharity(charity.id)}>Delete</button>
          </div>
        ))}
      </section>

      <section>
        <h2>Pending Charity Users</h2>
        {users
          .filter((user) => user.role === "charity" && user.status === "pending")
          .map((user) => (
            <div key={user.id}>
              <p>{user.name} (Charity User)</p>
              <button onClick={() => handleApproveUser(user.id)}>Approve</button>
              <button onClick={() => handleRejectUser(user.id)}>Reject</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
