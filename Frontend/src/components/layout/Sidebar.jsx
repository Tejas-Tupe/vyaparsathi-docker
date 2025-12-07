import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import CollapsibleSection from "./CollapsibleSection.jsx";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/customers">Customers</NavLink>
          </li>
          <CollapsibleSection title="Profile">
            <li>
              <NavLink to="/editprofile">Edit Profile</NavLink>
            </li>
            <li>
              <NavLink to="/changepassword">Change Password</NavLink>
            </li>
            <li>
              <NavLink to="/deleteaccount">Delete Account</NavLink>
            </li>
          </CollapsibleSection>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
