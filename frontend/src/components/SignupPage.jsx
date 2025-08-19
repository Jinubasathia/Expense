import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import "./LoginPage.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return setError("All fields are required.");
    setError(""); setOk("");
    try {
      await api.post("/users/signup", { name, email, password, role });
      setOk("Account created. Please login.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
          <input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password (min 6)" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            {/* Create ADMIN accounts manually if you prefer */}
          </select>
          {error && <div className="error">{error}</div>}
          {ok && <div className="success">{ok}</div>}
          <button type="submit">Create Account</button>
        </form>
        <div className="muted">Already have an account? <Link to="/login">Login</Link></div>
      </div>
    </div>
  );
}
