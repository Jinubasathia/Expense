// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Header.css";

export default function Header() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="nav">
      <Link to="/dashboard">Dashboard</Link>

      {user?.role === "EMPLOYEE" && (
        <>
          <Link to="/expenses/new">Add Expense</Link>
          <Link to="/expenses/my">My Expenses</Link>
        </>
      )}

      {(user?.role === "MANAGER" || user?.role === "ADMIN") && (
        <>
          <Link to="/admin/expenses">All Expenses</Link>
        </>
      )}

      {token ? (
        <button className="btn outline" onClick={() => { logout(); navigate("/login"); }}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login"><button className="btn outline">Login</button></Link>
          <Link to="/signup"><button className="btn outline">Sign Up</button></Link>
        </>
      )}
    </div>
  );
}
