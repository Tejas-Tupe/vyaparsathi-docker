import React, { useState, useContext } from 'react';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import './auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    shopType: '',
    address: '',
    gstin: '',
  });

  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await signup(formData);

    // Redirect after exactly 3 seconds regardless of success
    setTimeout(() => {
      if (success) {
        window.location.href = '/login';
      }
    }, 3000);

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Create Your Account</h2>

        <form onSubmit={handleRegister} className="auth-form">
          <InputField label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          <InputField label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          <InputField label="Mobile Number" type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
          <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
          <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          <InputField label="Business Name" type="text" name="shopName" value={formData.shopName} onChange={handleChange} />
          <InputField label="Business Type" type="text" name="shopType" value={formData.shopType} onChange={handleChange} />
          <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} />
          <InputField label="GSTIN" type="text" name="gstin" value={formData.gstin} onChange={handleChange} />

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <a href="/login">Log In here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
