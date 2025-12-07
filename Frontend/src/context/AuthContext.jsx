import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AUTH_ROUTES from "../api/ApiRoutes.js";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // Keep axios header synced with token
  useEffect(() => {
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  }, [token]);

  // Sync user and token with localStorage when changed
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(AUTH_ROUTES.LOGIN, { email, password });

      if (!data.token) throw new Error(data?.message || "Login failed");

      setToken(data.token);
      setUser(data.user);

      toast.success(data.message || "Login successful!");
      return true;
    } catch (err) {
      const error =
        err.response?.data?.error || "Invalid credentials or server error.";
      toast.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const signup = async (formData) => {
    try {
      setLoading(true);
      await axios.post(AUTH_ROUTES.SIGNUP, formData);
      toast.success("Account created successfully!");
      return true;
    } catch (err) {
      const backendError =
        err.response?.data?.error ||
        "Signup failed. Please check your details.";
      toast.error(backendError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.info("Logged out successfully.");
  };

  // CHANGE PASSWORD
  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill all fields.");
        return false;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match.");
        return false;
      }

      const { data } = await axios.post(
        AUTH_ROUTES.CHANGE_PASSWORD,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message || "Password changed successfully!");
      return true;
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Server error while changing password. Try again.";
      toast.error(msg);
      return false;
    }
  };

  // DELETE ACCOUNT
  const deleteAccount = async (password) => {
    try {
      if (!password) {
        toast.error("Please enter your current password.");
        return false;
      }

      const { data } = await axios.delete(AUTH_ROUTES.DELETE_ACCOUNT, {
        data: { password }, // send password in body
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message || "Account deleted successfully.");

      // Clear all user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Reset context state
      setToken(null);
      setUser(null);

      return true;
    } catch (err) {
      const msg =
        err.response?.data?.error || "Failed to delete account. Try again.";
      toast.error(msg);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        setUser, // exposed for edit profile updates
        login,
        signup,
        logout,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
