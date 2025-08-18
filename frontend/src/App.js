import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext.jsx";
import { registerTokenGetter } from "./utils/api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import LoginPage from "./components/LoginPage"; // ✅ new page
import "./App.css";

// ✅ Header uses Context for login/logout
function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    registerTokenGetter(() => token);
  }, [token]);

  return (
    <div className="nav">
      <Link to="/">Add Expenses</Link>
      <Link to="/expenses">All Expenses</Link>
      {token ? (
        <button
          className="btn outline"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="btn outline">Login</button>
        </Link>
      )}
    </div>
  );
}

// ✅ Main App
export default function App() {
  return (
    <AuthProvider>
      <div className="container">
        <h1 className="h1">Expense Reimbursement Portal</h1>
        <Header />
        <Routes>
          <Route path="/" element={<ExpenseForm />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/login" element={<LoginPage />} /> {/* ✅ new route */}
        </Routes>
      </div>
    </AuthProvider>
  );
}
