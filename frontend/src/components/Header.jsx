// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Header.css";

export default function Header() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <Link className="logo" to={user ? "/dashboard" : "/login"}>Expense Portal</Link>

      <div className="nav-links">
        {user?.role === "EMPLOYEE" && (
          <>
            <Link to="/expenses/new" className="nav-btn">Add Expense</Link>
            <Link to="/expenses/my" className="nav-btn outline">My Expenses</Link>
          </>
        )}

        {user?.role === "MANAGER" && (
          <>
            <Link to="/manager/dashboard" className="nav-btn">Manager Home</Link>
            <Link to="/manager/expenses" className="nav-btn outline">All Expenses</Link>
          </>
        )}

        {user?.role === "FINANCE" && (
          <>
            <Link to="/finance/dashboard" className="nav-btn">Finance Home</Link>
            <Link to="/finance/expenses" className="nav-btn outline">All Expenses</Link>
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard" className="nav-btn">Admin Home</Link>
            <Link to="/admin/expenses" className="nav-btn outline">All Expenses</Link>
          </>
        )}

        {token ? (
          <button
            className="nav-btn outline"
            onClick={() => { logout(); navigate("/login"); }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-btn outline">Login</Link>
            <Link to="/signup" className="nav-btn outline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
