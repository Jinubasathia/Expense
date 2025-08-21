// src/components/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPage.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("EMPLOYEE");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: role.toUpperCase() })
      });

      const data = await res.json();
      if (res.ok) navigate("/login");
      else setError(data.message);
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box slide-in-left">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="input-box" />
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" className="input-box" />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="input-box" />
          <label>Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="input-box">
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="FINANCE">Finance</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p className="switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="auth-image signup-image"></div>
    </div>
  );
}
