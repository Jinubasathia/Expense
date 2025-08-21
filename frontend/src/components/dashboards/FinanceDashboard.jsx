// FinanceDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import "./Dashboard.css";

export default function FinanceDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [pendingFinance, setPendingFinance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/expenses?status=APPROVED");
        setStats({
          total: data.length,
          pending: data.filter(e => e.status === "PENDING").length,
          approved: data.filter(e => e.status === "APPROVED").length,
          rejected: data.filter(e => e.status === "REJECTED").length
        });
        setPendingFinance(data.filter(e => !e.paid));
      } catch (e) { console.error(e); }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Finance Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card pending"><h3>{stats.pending}</h3><p>Pending</p></div>
          <div className="stat-card approved"><h3>{stats.approved}</h3><p>Approved</p></div>
          <div className="stat-card rejected"><h3>{stats.rejected}</h3><p>Rejected</p></div>
          <div className="stat-card total"><h3>{stats.total}</h3><p>Total</p></div>
        </div>
      </div>

      <div className="card">
        <h3>Pending Payments</h3>
        {pendingFinance.length ? (
          <ul>
            {pendingFinance.map(e => (
              <li key={e.id}>{e.employeeName} - {e.amount} - {e.description}</li>
            ))}
          </ul>
        ) : <p>No pending payments</p>}
        
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/finance/process-payments" className="btn">Process Payments</Link>
          <Link to="/finance/reports" className="btn outline">View Reports</Link>
        </div>
      </div>
    </div>
  );
}
