import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import "./Dashboard.css";

export default function ManagerDashboard() {
  const [stats, setStats] = useState({ total:0, pending:0, approved:0, rejected:0 });
  const [teamExpenses, setTeamExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/expenses?team=true");
        setStats({
          total: data.length,
          pending: data.filter(e => e.status==="PENDING").length,
          approved: data.filter(e => e.status==="APPROVED").length,
          rejected: data.filter(e => e.status==="REJECTED").length
        });
        setTeamExpenses(data.filter(e => e.status==="PENDING"));
      } catch(e){ console.error(e); }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Manager Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card pending"><h3>{stats.pending}</h3><p>Pending</p></div>
          <div className="stat-card approved"><h3>{stats.approved}</h3><p>Approved</p></div>
          <div className="stat-card rejected"><h3>{stats.rejected}</h3><p>Rejected</p></div>
          <div className="stat-card total"><h3>{stats.total}</h3><p>Total</p></div>
        </div>
      </div>

      <div className="card">
        <h3>Team Actions</h3>
        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          {teamExpenses.length ? teamExpenses.map(e => (
            <div key={e.id} className="stat-card pending">
              {e.employeeName} - {e.amount} - {e.description}
              <div style={{marginTop:'6px'}}>
                <Link to={`/manager/expenses/approve/${e.id}`} className="btn outline">Approve</Link>
                <Link to={`/manager/expenses/reject/${e.id}`} className="btn outline">Reject</Link>
              </div>
            </div>
          )) : <p>No pending team expenses</p>}
        </div>
        <Link to="/manager/expenses" className="btn">Open Expense Queue</Link>
      </div>
    </div>
  );
}
