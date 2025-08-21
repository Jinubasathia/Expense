import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import "./Dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total:0, pending:0, approved:0, rejected:0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: expenses } = await api.get("/expenses");
        setStats({
          total: expenses.length,
          pending: expenses.filter(e => e.status==="PENDING").length,
          approved: expenses.filter(e => e.status==="APPROVED").length,
          rejected: expenses.filter(e => e.status==="REJECTED").length
        });
        const { data: allUsers } = await api.get("/users");
        setUsers(allUsers);
      } catch(e){ console.error(e); }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card pending"><h3>{stats.pending}</h3><p>Pending Requests</p></div>
          <div className="stat-card approved"><h3>{stats.approved}</h3><p>Approved</p></div>
          <div className="stat-card rejected"><h3>{stats.rejected}</h3><p>Rejected</p></div>
          <div className="stat-card total"><h3>{stats.total}</h3><p>Total Expenses</p></div>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
          <Link to="/admin/users" className="btn">Manage Users</Link>
          <Link to="/admin/departments" className="btn outline">Manage Departments</Link>
          <Link to="/admin/categories" className="btn outline">Expense Categories</Link>
        </div>
      </div>
    </div>
  );
}
