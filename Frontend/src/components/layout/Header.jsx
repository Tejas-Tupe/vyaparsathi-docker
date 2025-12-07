import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import Logo from "../../../public/Favicon.png";
import Button from "../common/Button";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth(); //use from context

  const isAuthenticated = !!token; // checks if token exists
  const userName = user?.firstName || "User";

  const handleLogout = () => {
    logout(); // centralized logout
    navigate("/login"); // redirect after logout
  };

  return (
    <header className="app-header">
      {/* 1. Logo and Product Name */}
      <div className="header-brand">
        <Link to="/" className="header-logo-link">
          <img src={Logo} alt="VyaparSathi Logo" className="header-logo" />
          <span className="product-name">
            {user?.shopName || "Vyaparsathi"}
          </span>
        </Link>
      </div>

      {/* 2. Navigation/Action Items */}
      <div className="header-actions">
        {isAuthenticated ? (
          <>
            <div className="user-info">
              Welcome, <span className="user-name">{userName}</span>
            </div>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="btn-logout"
              title="Logout"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
