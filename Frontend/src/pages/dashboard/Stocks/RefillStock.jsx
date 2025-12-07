import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../components/common/Modal.jsx";
import Button from "../../../components/common/Button.jsx";
import InputField from "../../../components/common/InputField.jsx";
import "../Forms.css";
import { PRODUCT_ROUTES } from "../../../api/ApiRoutes.js";
import { toast } from "react-toastify";

const RefillStock = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    price: 0,
  });
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) fetchProducts();
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(PRODUCT_ROUTES.MY_PRODUCTS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // normalize: support both array and { products: [...] }
      const list = Array.isArray(res.data) ? res.data : res.data.products || [];
      setProducts(list);
    } catch (err) {
      console.error("Fetch products error:", err);
      toast.error("Failed to load products.");
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setForm((p) => ({ ...p, productId }));

    if (!productId) {
      setForm((p) => ({ ...p, price: 0, quantity: 1 }));
      return;
    }

    const selected = products.find((x) => x._id === productId);
    if (selected) {
      setForm((p) => ({ ...p, price: selected.price || 0, quantity: 1 }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productId, quantity, price } = form;

    if (!productId || quantity < 1 || price < 0) {
      toast.error("Please provide valid product, quantity and price.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        // your backend refill route (uses PRODUCT_ROUTES.REFILL_STOCK in your ApiRoutes)
        PRODUCT_ROUTES.REFILL_STOCK,
        { productId, quantity, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(res.data?.message || "Stock refilled successfully");
      onClose();
    } catch (err) {
      console.error("Refill error:", err);
      toast.error(err?.response?.data?.error || "Failed to refill stock.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Refill Stock">
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="input-field-container">
          <label className="input-label">Select Product</label>
          <select
            className="common-input"
            name="productId"
            value={form.productId}
            onChange={handleProductChange}
            required
          >
            <option value="">
              {loadingProducts ? "Loading..." : "Choose product"}
            </option>
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

        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          min={1}
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <InputField
          label="Price (₹)"
          name="price"
          type="number"
          min={0}
          value={form.price}
          onChange={handleChange}
          required
        />

        <div className="order-btns">
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Saving..." : "Refill Stock"}
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            type="button"
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RefillStock;
