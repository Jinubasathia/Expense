// src/components/dashboards/ProcessPayments.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./Dashboard.css";

export default function ProcessPayments() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data } = await api.get("/expenses?status=APPROVED");
      // Only unpaid
      setExpenses(data.filter(e => !e.paid));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePay = async (id) => {
    try {
      // Mark as paid on backend
      await api.patch(`/expenses/${id}`, { paid: true });
      
      // Update local state to remove paid expense
      setExpenses(prev => prev.filter(e => e.id !== id));

      alert("Payment successful!");
    } catch (e) {
      console.error(e);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Process Payments</h2>
        {expenses.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td>{e.employeeName}</td>
                  <td>{e.amount}</td>
                  <td>{e.description}</td>
                  <td>
                    <button className="btn" onClick={() => handlePay(e.id)}>
                      Pay Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>All approved payments are processed!</p>
        )}
      </div>
    </div>
  );
}
