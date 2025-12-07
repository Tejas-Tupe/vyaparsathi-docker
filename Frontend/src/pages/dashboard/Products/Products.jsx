import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch.js";
import "./Products.css";
import { PRODUCT_ROUTES } from "../../../api/ApiRoutes.js";
import Button from "../../../components/common/Button.jsx";

const Products = () => {
  const { data, loading, error } = useFetch(
    () =>
      fetch(PRODUCT_ROUTES.PRODUCTS_OVERVIEW, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
    [],
  );

  const [products, setProducts] = useState([]);

  const deleteProduct = async (productId) => {
    const res = await fetch(`${PRODUCT_ROUTES.DELETE_PRODUCT}/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      //Updating UI Instantly without reloading page
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } else {
      toast.error(data.error || "Failed to delete product");
    }
  };

  useEffect(() => {
    if (data?.products && Array.isArray(data.products)) {
      setProducts(data.products);
    }
  }, [data]);

  if (loading)
    return <p style={{ color: "var(--primary-color)" }}>Loading products...</p>;

  if (error)
    return (
      <p style={{ color: "var(--primary-color)" }}>
        Failed to load products. Try again later.
      </p>
    );

  if (!loading && !error && products.length === 0)
    return (
      <p style={{ color: "var(--primary-color)", fontWeight: 500 }}>
        No products found.
      </p>
    );

  return (
    <div className="products container">
      <div className="table-header-action">
        <h2 className="section-heading">Products Overview</h2>
        <div className="table-actions">{/* buttons if any */}</div>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit Price (₹)</th>
            <th>Remaining</th>
            <th>Total Sold</th>
            <th>Total Revenue (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantityRemaining}</td>
              <td>{p.totalSold}</td>
              <td>{p.totalRevenue}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteProduct(p._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
