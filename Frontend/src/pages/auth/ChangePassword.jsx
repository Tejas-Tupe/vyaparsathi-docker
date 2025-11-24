import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import InputField from "../../components/common/InputField.jsx";
import Button from "../../components/common/Button.jsx";
import "./auth.css";

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const success = await changePassword(
        oldPassword,
        newPassword,
        confirmPassword
      );

      // Always redirect after 3 seconds (success or failure)
      setTimeout(() => navigate("/dashboard", { replace: true }), 3000);

      if (success) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("Change password error:", err);
      setTimeout(() => navigate("/dashboard", { replace: true }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Change Password</h2>

        <form onSubmit={handleChangePassword} className="auth-form">
          <InputField
            label="Current Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <InputField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <InputField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>

        <p className="auth-footer-text">
          <Link to="/dashboard">Back to Dashboard</Link>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
