import React, { useEffect, useState } from "react";
import InputField from "../../components/common/InputField.jsx";
import Button from "../../components/common/Button.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import { USER_ROUTES } from "../../api/ApiRoutes.js";
import "../auth/auth.css";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { user, token, setUser } = useAuth(); // use context values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    shopName: "",
    shopType: "",
    address: "",
    gstin: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  // Fetch user data from backend (always fresh)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(USER_ROUTES.USER_DETAILS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to load user data");
          setTimeout(() => (window.location.href = "/dashboard"), 5000);
          return;
        }

        setInitialData(data.user);
        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || "",
          mobile: data.user.mobile || "",
          shopName: data.user.shopName || "",
          shopType: data.user.shopType || "",
          address: data.user.address || "",
          gstin: data.user.gstin || "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Server error while fetching user details");
        setTimeout(() => (window.location.href = "/dashboard"), 3000);
      }
    };

    fetchUserData();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update request
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(USER_ROUTES.EDIT_PROFILE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (Array.isArray(data.error)) {
          data.error.forEach((err) => toast.warning(err));
        } else {
          toast.error(data.error || "Failed to update profile.");
        }
        return;
      }

      // Success — update global user context instantly
      toast.success(data.message || "Profile updated successfully!");
      setUser(data.user);
      setInitialData(data.user);

      // Redirect after 3s
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Server error while updating profile");
      setLoading(false);
    }
  };

  // Loading UI
  if (!initialData) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Edit Your Profile</h2>

        <form onSubmit={handleUpdateProfile} className="auth-form">
          <InputField label="First Name" name="firstName" value={formData.firstName} placeholder={initialData.firstName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={formData.lastName} placeholder={initialData.lastName} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={formData.email} placeholder={initialData.email} onChange={handleChange} />
          <InputField label="Mobile Number" name="mobile" value={formData.mobile} placeholder={initialData.mobile} onChange={handleChange} />
          <InputField label="Business Name" name="shopName" value={formData.shopName} placeholder={initialData.shopName} onChange={handleChange} />
          <InputField label="Business Type" name="shopType" value={formData.shopType} placeholder={initialData.shopType} onChange={handleChange} />
          <InputField label="Address" name="address" value={formData.address} placeholder={initialData.address} onChange={handleChange} />
          <InputField label="GSTIN" name="gstin" value={formData.gstin} placeholder={initialData.gstin} onChange={handleChange} />

          <Button variant="primary" type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
          <p className="auth-footer-text">
          <Link to="/dashboard">Back to Dashbaord</Link>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
