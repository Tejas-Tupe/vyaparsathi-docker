import React, { useState } from "react";
import axios from "axios";
import Modal from "../../../components/common/Modal.jsx";
import Button from "../../../components/common/Button.jsx";
import InputField from "../../../components/common/InputField.jsx";
import { PRODUCT_ROUTES } from "../../../api/ApiRoutes.js";
import { toast } from "react-toastify";
import "../Forms.css";

const AddStockModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    lowStockThreshold: "",
  });
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, quantity, price, lowStockThreshold } = form;

    if (!name || !category || quantity < 0 || price < 0) {
      alert("Please fill valid product details.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        PRODUCT_ROUTES.ADD_STOCK,
        { name, category, quantity, price, lowStockThreshold },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Stock added Successfully");
      onClose();
    } catch (err) {
      console.error("Error adding stock:", err);
      toast.error("Failed to add stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Stock">
      <form className="order-form" onSubmit={handleSubmit}>
        <InputField
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          min={0}
          required
        />

        <InputField
          label="Price (₹)"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          min={0}
          required
        />

        <InputField
          label="Low Stock Threshold"
          name="lowStockThreshold"
          type="number"
          value={form.lowStockThreshold}
          onChange={handleChange}
          min={0}
        />

        <div className="order-btns">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : "Add Stock"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStockModal;
