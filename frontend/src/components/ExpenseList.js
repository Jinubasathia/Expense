// src/components/ExpenseList.js
import React from "react";
import api from "../utils/api";
import ExpenseStatusUpdate from "./ExpenseStatusUpdate";
import "./ExpenseList.css";
import { useAuth } from "../context/AuthContext.jsx";

export default function ExpenseList({ scope = "ALL" }) {
  const [items, setItems] = React.useState([]);
  const [status, setStatus] = React.useState("ALL");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { user } = useAuth();

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = scope === "MINE" ? "/expenses/me" : "/expenses";
      const { data } = await api.get(endpoint);
      setItems(data);
    } catch (e) {
      setError("Failed to load expenses");
    } finally { setLoading(false); }
  }, [scope]);

  React.useEffect(() => { load(); }, [load]);

  const filtered = items.filter((e) => status === "ALL" || e.status === status);
  const fmtAmount = (n) => `₹${Number(n).toFixed(2)}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });

  const showActions = scope !== "MINE" && (user?.role === "MANAGER" || user?.role === "ADMIN");

  return (
    <div className="card">
      <h2>{scope === "MINE" ? "My Expenses" : "All Expenses"}</h2>

      <div className="controls">
        <label>Status:</label>
        <select className="select" aria-label="status-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <button className="btn outline" onClick={load}>Refresh</button>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div className="error">{error}</div>}

      {filtered.length === 0 && !loading ? (
        <div>No expenses found</div>
      ) : (
        <table className="table" aria-label="expenses-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td>{e.employeeId}</td>
                <td>{fmtAmount(e.amount)}</td>
                <td>{e.description}</td>
                <td>{fmtDate(e.date)}</td>
                <td><span className={`badge ${e.status.toLowerCase()}`}>{e.status}</span></td>
                <td>{e.remarks || "-"}</td>
                {showActions && (
                  <td><ExpenseStatusUpdate expense={e} onUpdated={load} /></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
