import React, { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import "./ExpenseList.css";
import "./dashboards/Dashboard.css";
import ExpenseStatusUpdate from "./ExpenseStatusUpdate";
import { useAuth } from "../context/AuthContext";

export default function ExpenseList({ reviewer = false, title }) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [filterEmployeeId, setFilterEmployeeId] = useState("");

  const isReviewer = reviewer || ["ADMIN","MANAGER","FINANCE"].includes(user?.role);

  const loadExpenses = async () => {
    try {
      if (isReviewer) {
        const { data } = await api.get("/expenses");
        setExpenses(data);
      } else {
        // employee: get own expenses by user.id
        const { data } = await api.get(`/expenses/employee/${user.id}`);
        setExpenses(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { loadExpenses(); }, []);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const statusOk = filterStatus === "ALL" ? true : e.status === filterStatus;
      const catOk = filterCategory === "ALL" ? true : (e.category === filterCategory);
      const empOk = !isReviewer || !filterEmployeeId ? true : String(e.employeeId) === String(filterEmployeeId);
      return statusOk && catOk && empOk;
    });
  }, [expenses, filterStatus, filterCategory, filterEmployeeId, isReviewer]);

  const exportCsv = async () => {
    const scope = isReviewer ? "all" : "mine";
    const url = isReviewer
      ? `/expenses/export?scope=${scope}`
      : `/expenses/export?scope=${scope}&employeeId=${user.id}`;
    const res = await api.get(url, { responseType: "blob" });
    const blob = new Blob([res.data], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = isReviewer ? "all-expenses.csv" : "my-expenses.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <div className="expense-list">
      <h2 style={{ textAlign:"left" }}>{title || (isReviewer ? "All Expenses" : "My Expenses")}</h2>

      <div className="filters">
        <label>
          Status:{" "}
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </label>
        <label>
          Category:{" "}
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="ALL">All</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Office Supplies</option>
            <option>Internet</option>
            <option>Accommodation</option>
            <option>Other</option>
          </select>
        </label>
        {isReviewer && (
          <label>
            Employee ID:{" "}
            <input
              type="text"
              value={filterEmployeeId}
              onChange={e => setFilterEmployeeId(e.target.value)}
              placeholder="e.g. 101"
              style={{ padding:"8px 10px", borderRadius:8, border:"1px solid #d1d5db" }}
            />
          </label>
        )}
        <button className="btn" onClick={exportCsv} style={{ marginLeft:"auto" }}>
          Export CSV
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Status</th>
            <th>Remarks</th>
            {isReviewer && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.employeeId}</td>
                <td>₹{Number(e.amount).toFixed(2)}</td>
                <td>{e.description}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{e.category}</td>
                <td><span className={`badge ${e.status.toLowerCase()}`}>{e.status}</span></td>
                <td>{e.remarks || "-"}</td>
                {isReviewer && (
                  <td>
                    <ExpenseStatusUpdate
                      expense={e}
                      onUpdated={loadExpenses}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={isReviewer ? 9 : 8} style={{ textAlign: "center" }}>
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
