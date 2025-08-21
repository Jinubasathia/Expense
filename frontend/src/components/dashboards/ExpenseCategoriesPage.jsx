import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./Dashboard.css";

export default function ExpenseCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/expense-categories");
        setCategories(data);
      } catch(e){ console.error(e); }
    };
    fetchCategories();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Expense Categories</h2>
        {categories.length ? (
          <ul>{categories.map(c => <li key={c.id}>{c.name}</li>)}</ul>
        ) : <p>Data will appear here once the Expense Categories table is created.</p>}
      </div>
    </div>
  );
}
