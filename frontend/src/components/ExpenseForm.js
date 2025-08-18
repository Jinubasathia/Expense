import React from "react";
import api from "../utils/api";
import "./ExpenseForm.css";
import { useNavigate } from "react-router-dom";

export default function ExpenseForm() {
  const [form, setForm] = React.useState({ employeeId: "", amount: "", description: "", date: "" });
  const [errors, setErrors] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.employeeId) e.employeeId = "Employee ID is required";
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Amount must be greater than 0";
    if (!form.description || form.description.trim().length < 5) e.description = "Description must be at least 5 characters";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    try {
      setLoading(true);
      await api.post("/expenses", {
        employeeId: Number(form.employeeId),
        amount: Number(form.amount),
        description: form.description.trim(),
        date: form.date,
      });
      setMessage("Expense submitted successfully");
      setForm({ employeeId: "", amount: "", description: "", date: "" });
      setTimeout(() => navigate("/expenses"), 500);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Submission failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="card">
      <h2>Submit Expense Claim</h2>
      <form className="form" onSubmit={onSubmit} aria-label="expense-form">
        <div>
          <label className="label">Employee ID</label>
          <input className="input" name="employeeId" type="number" value={form.employeeId} onChange={onChange} />
          {errors.employeeId && <div className="error">{errors.employeeId}</div>}
        </div>
        <div>
          <label className="label">Amount</label>
          <input className="input" name="amount" type="number" value={form.amount} onChange={onChange} />
          {errors.amount && <div className="error">{errors.amount}</div>}
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="textarea" name="description" value={form.description} onChange={onChange} />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div>
          <label className="label">Date</label>
          <input className="input" name="date" type="date" value={form.date} onChange={onChange} />
          {errors.date && <div className="error">{errors.date}</div>}
        </div>
        <button className="btn" type="submit" disabled={loading}>{loading ? "Submitting…" : "Submit"}</button>
        {message && <div className={message.includes("success") ? "success" : "error"}>{message}</div>}
      </form>
    </div>
  );
}
