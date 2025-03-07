import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonations } from "../redux/donationsSlice";

const DonationHistory = () => {
  const dispatch = useDispatch();
  const { donations, loading, error } = useSelector((state) => state.donations);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  return (
    <div className="donation-history">
      <h2>Donation History</h2>
      {loading && <p>Loading donations...</p>}
      {error && <p className="error">{error}</p>}
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <ul>
          {donations.map((donation) => (
            <li key={donation.id}>
              <strong>Amount:</strong> ${donation.amount} <br />
              <strong>Charity ID:</strong> {donation.charity_id} <br />
              <strong>Recurring:</strong> {donation.is_recurring ? "Yes" : "No"} <br />
              <strong>Anonymous:</strong> {donation.is_anonymous ? "Yes" : "No"} <br />
              <strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonationHistory;
