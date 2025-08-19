import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import "./Dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const loadStats = async () => {
    try {
      const { data } = await api.get("/expenses");
      setStats({
        total: data.length,
        pending: data.filter((e) => e.status === "PENDING").length,
        approved: data.filter((e) => e.status === "APPROVED").length,
        rejected: data.filter((e) => e.status === "REJECTED").length,
      });
    } catch (e) {
      console.error("Failed to load stats", e);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="card">
      <h2>Manager/Admin Dashboard</h2>
      <p>Welcome back! Here’s a quick overview of expenses.</p>

      <div className="row stats-grid">
        <div className="stat-card pending">
          <h3>{stats.pending}</h3>
          <p>Pending Requests</p>
        </div>
        <div className="stat-card approved">
          <h3>{stats.approved}</h3>
          <p>Approved</p>
        </div>
        <div className="stat-card rejected">
          <h3>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
        <div className="stat-card total">
          <h3>{stats.total}</h3>
          <p>Total Expenses</p>
        </div>
      </div>

      <div className="row" style={{ marginTop: "20px" }}>
        <div className="card">
          <h3>All Expenses</h3>
          <p>Review, approve or reject claims.</p>
          <Link className="btn" to="/admin/expenses">Open Queue</Link>
        </div>
      </div>
    </div>
  );
}
