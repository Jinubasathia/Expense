import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./Dashboard.css";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await api.get("/departments");
        setDepartments(data);
      } catch(e){ console.error(e); }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Manage Departments</h2>
        {departments.length ? (
          <ul>{departments.map(d => <li key={d.id}>{d.name}</li>)}</ul>
        ) : <p>Data will appear here once the Departments table is created.</p>}
      </div>
    </div>
  );
}
