import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addInventoryItem, removeInventoryItem } from "../redux/beneficiarySlice";
import "../styles/InventoryModal.css"; // Updated CSS file

const InventoryModal = ({ isOpen, onClose, beneficiary }) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState("");
  const [inventory, setInventory] = useState(beneficiary?.inventory || []);

  useEffect(() => {
    setInventory(beneficiary?.inventory || []);
  }, [beneficiary]);

  if (!isOpen || !beneficiary) return null;

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      dispatch(addInventoryItem({ beneficiaryId: beneficiary.id, item: newItem }));
      setInventory([...inventory, newItem]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    dispatch(removeInventoryItem({ beneficiaryId: beneficiary.id, itemId: index }));
    setInventory(inventory.filter((_, i) => i !== index));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Manage Inventory for <span>{beneficiary.name}</span></h2>

        {/* Display Inventory Items */}
        {inventory.length > 0 ? (
          <ul className="inventory-list">
            {inventory.map((item, index) => (
              <li key={index}>
                {item} 
                <button className="remove-btn" onClick={() => handleRemoveItem(index)}>✖</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-items">No inventory items added.</p>
        )}

        {/* Input for Adding New Items */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="input-field"
          />
          <button className="add-btn" onClick={handleAddItem}>+ Add Item</button>
        </div>

        {/* Modal Close Button */}
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default InventoryModal;
