// src/components/pages/FinanceReports.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./Dashboard.css";

export default function FinanceReports() {
  const [stats, setStats] = useState({ total: 0, paid: 0, unpaid: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/expenses?status=APPROVED");
        const paid = data.filter(e => e.paid).length;
        const unpaid = data.filter(e => !e.paid).length;
        setStats({ total: data.length, paid, unpaid });
      } catch(e){ console.error(e); }
    };
    fetchData();
  }, []);

  const downloadCSV = () => {
    const csv = `Status,Count\nPaid,${stats.paid}\nUnpaid,${stats.unpaid}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finance_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Finance Reports</h2>
        <p>Total Approved Expenses: {stats.total}</p>
        <p>Paid: {stats.paid}</p>
        <p>Unpaid: {stats.unpaid}</p>
        <button className="btn" onClick={downloadCSV}>Download CSV Report</button>
      </div>
    </div>
  );
}
