import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import InputField from "../../components/common/InputField.jsx";
import Button from "../../components/common/Button.jsx";
import "./auth.css";

const DeleteAccount = () => {
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const success = await deleteAccount(password);
      // toast handled in AuthContext

      // Redirect after showing toast (always after 3 seconds)
      setTimeout(() => {
        if (success) {
          navigate("/", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }, 3000);
    } catch (err) {
      console.error("Delete account error:", err);
      // even in case of unexpected error, redirect safely
      setTimeout(() => navigate("/dashboard", { replace: true }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Delete Account</h2>

        <form onSubmit={handleDeleteAccount} className="auth-form">
          <InputField
            label="Current Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button variant="danger" type="submit" disabled={loading}>
            {loading ? "Deleting..." : "Delete Account"}
          </Button>
        </form>

        <p className="auth-footer-text">
          <Link to="/dashboard">Back to Dashboard</Link>
        </p>
      </div>
    </div>
  );
};

export default DeleteAccount;
