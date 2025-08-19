import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import Header from "./components/Header";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import RoleGuard from "./components/auth/RoleGuard.jsx";

import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

import EmployeeDashboard from "./components/dashboards/EmployeeDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import "./App.css";

function DashboardRouter() {
  // We expose two nested routes guarded by role; index will match whichever guard passes
  return (
    <Routes>
      <Route element={<RoleGuard allow={["EMPLOYEE"]} />}>
        <Route index element={<EmployeeDashboard />} />
      </Route>
      <Route element={<RoleGuard allow={["MANAGER","ADMIN"]} />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="container">
        <h1 className="h1">Expense Reimbursement Portal</h1>
        <Header />

        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected area */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardRouter />} />

            {/* Employee */}
            <Route path="/expenses/new" element={<ExpenseForm />} />
            <Route path="/expenses/my" element={<ExpenseList scope="MINE" />} />

            {/* Admin/Manager */}
            <Route element={<RoleGuard allow={["MANAGER","ADMIN"]} />}>
              <Route path="/admin/expenses" element={<ExpenseList scope="ALL" />} />
            </Route>
          </Route>

          {/* Default → login */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
