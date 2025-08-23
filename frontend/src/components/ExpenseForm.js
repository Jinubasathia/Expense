// src/components/ExpenseForm.js
import React, { useState } from "react";
import api from "../utils/api";
import "./ExpenseForm.css";
import { useAuth } from "../context/AuthContext";

export default function ExpenseForm() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Travel");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!amount || !description || !date || !category) {
      setError("All fields are required!");
      return;
    }
    try {
      await api.post("/expenses", {
        employeeId: Number(user?.id), // auto from logged-in user
        amount: Number(amount),
        description,
        date,
        category
      });
      setAmount(""); setDescription(""); setDate(""); setCategory("Travel");
      setError(""); setSuccess("Expense submitted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="form-container">
      <h2>New Expense</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p style={{color:"#16a34a", fontWeight:700}}>{success}</p>}

        <label>Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />

        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Travel</option>
          <option>Food</option>
          <option>Office Supplies</option>
          <option>Internet</option>
          <option>Accommodation</option>
          <option>Other</option>
        </select>

        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}