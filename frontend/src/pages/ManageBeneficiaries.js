import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddBeneficiaryModal from "./AddBeneficiaryModal";
import InventoryModal from "./InventoryModal"; // Import the Inventory Modal
import { removeBeneficiary } from "../redux/beneficiarySlice"; // Import removeBeneficiary action
import "../styles/ManageBeneficiaries.css";

const ManageBeneficiaries = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  
  const dispatch = useDispatch();
  const beneficiaries = useSelector((state) => state.beneficiaries.list);

  const handleOpenInventory = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsInventoryModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(removeBeneficiary(id));
  };

  return (
    <div className="manage-beneficiaries">
      <h1>Manage Beneficiaries</h1>
      
      {/* Button to open the "Add Beneficiary" modal */}
      <button onClick={() => setIsAddModalOpen(true)} className="add-btn">
        + Add Beneficiary
      </button>

      {/* Modals */}
      <AddBeneficiaryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      {isInventoryModalOpen && (
        <InventoryModal
          isOpen={isInventoryModalOpen}
          onClose={() => setIsInventoryModalOpen(false)}
          beneficiary={selectedBeneficiary}
        />
      )}

      {/* List of Beneficiaries */}
      <div className="beneficiaries-list">
        {beneficiaries.length > 0 ? (
          beneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="beneficiary-card">
              <h3>{beneficiary.name}</h3>
              <p>Age: {beneficiary.age}</p>
              <p>Gender: {beneficiary.gender}</p>
              <p>Needs: {beneficiary.needs}</p>
              <button onClick={() => handleOpenInventory(beneficiary)}>Manage Inventory</button>
              <button onClick={() => handleDelete(beneficiary.id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No beneficiaries added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageBeneficiaries;
