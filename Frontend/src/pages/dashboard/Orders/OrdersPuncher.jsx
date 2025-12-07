import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../components/common/Modal.jsx";
import Button from "../../../components/common/Button.jsx";
import InputField from "../../../components/common/InputField.jsx";
import { ORDER_ROUTES, PRODUCT_ROUTES } from "../../../api/ApiRoutes.js";
import { toast } from "react-toastify";
import "../Forms.css";

const OrderPuncher = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) fetchProducts();
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(PRODUCT_ROUTES.MY_PRODUCTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = Array.isArray(res.data) ? res.data : res.data.products || [];
      setProducts(list);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
    if (!productId) return;

    const prod = products.find((p) => p._id === productId);
    if (prod) {
      setProductName(prod.name);
      setPrice(prod.price);
      setQuantity(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || quantity <= 0) {
      alert("Invalid inputs");
      return;
    }

    const total = price * quantity;
    const orderData = {
      productId: selectedProduct,
      productName,
      quantity,
      price,
      total,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(ORDER_ROUTES.CREATE_ORDER, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully");
      onClose();
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Order">
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="input-field-container">
          <label className="input-label">Select Product</label>
          <select
            className="common-input"
            value={selectedProduct}
            onChange={handleProductChange}
            required
          >
            <option value="">Select</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}{" "}
                {typeof p.quantity !== "undefined"
                  ? `(${p.quantity} left)`
                  : ""}
              </option>
            ))}
          </select>
        </div>

        <InputField label="Price (₹)" value={price} disabled />

        <InputField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          required
        />

        <InputField label="Total (₹)" value={price * quantity || 0} disabled />

        <div className="order-btns">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Placing..." : "Place Order"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderPuncher;
