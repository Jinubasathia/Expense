import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function EmployeeDashboard() {
  return (
    <div className="card">
      <h2>Employee Dashboard</h2>

      <div className="row">
        <div className="card">
          <h3>Submit Expense</h3>
          <p>Create a new claim.</p>
          <Link className="btn" to="/expenses/new">
            Add Expense
          </Link>
        </div>

        <div className="card">
          <h3>My Expenses</h3>
          <p>Track your claims and status.</p>
          <Link className="btn outline" to="/expenses/my">
            View My Expenses
          </Link>
        </div>
      </div>
    </div>
  );
}
