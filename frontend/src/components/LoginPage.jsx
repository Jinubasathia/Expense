import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError(""); 
    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) { 
        login(data);
        const role = data.user.role.toUpperCase();
        switch (role) {
          case "ADMIN":
            navigate("/admin/dashboard");
            break;
          case "MANAGER":
            navigate("/manager/dashboard");
            break;
          case "FINANCE":
            navigate("/finance/dashboard");
            break;
          default:
            navigate("/dashboard"); // Employee
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image login-image"></div>
      <div className="auth-box slide-in-right">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Enter email" 
            className="input-box"
          />
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Enter password" 
            className="input-box"
          />
          <button type="submit" className="btn">Login</button>
        </form>
        <p className="switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
