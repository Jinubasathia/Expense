import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./Dashboard.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users");
        setUsers(data);
      } catch (e) { console.error(e); }
    };
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Manage Users</h2>
        {users.length ? (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th></tr>
            </thead>
            <tbody>
              {users.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}
            </tbody>
          </table>
        ) : <p>Data will appear here once the Users table is created.</p>}
      </div>
    </div>
  );
}
