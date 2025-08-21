import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function EmployeeDashboard() {
  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>

      <div className="employee-options">
        <div className="option-card">
          <h3>Submit Expense</h3>
          <p>Create a new claim</p>
          <Link to="/expenses/new" className="btn">Add Expense</Link>
        </div>

        <div className="option-card">
          <h3>My Expenses</h3>
          <p>Track your claims and status</p>
          <Link to="/expenses/my" className="btn">View My Expenses</Link>
        </div>

        <div className="option-card">
          <h3>Expense Reports</h3>
          <p>Download or view your reports</p>
          <Link to="/expenses/reports" className="btn outline">View Reports</Link>
        </div>
      </div>
    </div>
  );
}
