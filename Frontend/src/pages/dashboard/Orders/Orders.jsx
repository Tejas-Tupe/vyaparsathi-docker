import React, { useEffect, useState } from "react";
import "./Orders.css";
import { ORDER_ROUTES } from "../../../api/ApiRoutes.js";
import ExportOrdersButton from "./ExportOrdersButton.jsx";
import Button from "../../../components/common/Button.jsx";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch(ORDER_ROUTES.MY_ORDERS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (Array.isArray(result)) {
        setOrders(result);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Deleting all orders function
  const deleteAllOrders = async () => {
    try {
      const res = await fetch(ORDER_ROUTES.DELETE_ALL_ORDERS, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "All orders deleted");
        loadOrders(); // Reload orders again
      } else {
        toast.error(result.message || "Action failed");
      }
    } catch (err) {
      toast.error("Failed to delete orders");
    }
  };

  useEffect(() => {
    loadOrders(); //fetch on mount
  }, []);

  if (loading)
    return <p style={{ color: "var(--primary-color)" }}>Loading orders...</p>;

  if (orders.length === 0)
    return <p style={{ color: "var(--primary-color)" }}>No orders found.</p>;

  return (
    <div className="orders container">
      <div className="orders-header">
        <h2 className="section-heading">Recent Orders</h2>

        <div className="orders-actions">
          <ExportOrdersButton />
          <Button variant="danger" onClick={deleteAllOrders}>
            Delete all orders
          </Button>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total (₹)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
