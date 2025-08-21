// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";

// Components
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";

// Dashboards
import EmployeeDashboard from "./components/dashboards/EmployeeDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import ManagerDashboard from "./components/dashboards/ManagerDashboard";
import FinanceDashboard from "./components/dashboards/FinanceDashboard";

// Extra Pages
import UsersPage from "./components/dashboards/UsersPage";
import DepartmentsPage from "./components/dashboards/DepartmentsPage";
import ExpenseCategoriesPage from "./components/dashboards/ExpenseCategoriesPage";
import FinanceReports from "./components/dashboards/FinanceReports";
import ProcessPayments from "./components/dashboards/ProcessPayments";

// Expenses
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

// Auth
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

// Protected route wrapper
function ProtectedRoute() {
  const { isAuthed } = useAuth();
  return isAuthed ? <Outlet /> : <Navigate to="/login" />;
}

// Role-based guard
function RoleGuard({ allow }) { 
  const { user, isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to="/login" />;
  return user && allow.includes(user.role.toUpperCase()) ? <Outlet /> : <Navigate to="/dashboard" />;
}

// Layout wrapper for protected routes to include Header
function ProtectedLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Landing Page - default route */}
          <Route path="/" element={<LandingPage />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes with Header */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>

              {/* Employee */}
              <Route path="/dashboard" element={<EmployeeDashboard />} />
              <Route path="/expenses/new" element={<ExpenseForm />} />
              <Route path="/expenses/my" element={<ExpenseList reviewer={false} title="My Expenses" />} />
              <Route path="/expenses/reports" element={<ExpenseList reviewer={false} title="Expense Reports" />} />

              {/* Admin */}
              <Route element={<RoleGuard allow={["ADMIN"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/expenses" element={<ExpenseList reviewer title="All Expenses (Admin)" />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/departments" element={<DepartmentsPage />} />
                <Route path="/admin/categories" element={<ExpenseCategoriesPage />} />
              </Route>

              {/* Manager */}
              <Route element={<RoleGuard allow={["MANAGER"]} />}>
                <Route path="/manager/dashboard" element={<ManagerDashboard />} />
                <Route path="/manager/expenses" element={<ExpenseList reviewer title="All Expenses (Manager)" />} />
                <Route path="/manager/expenses/approve/:id" element={<ExpenseList reviewer title="All Expenses (Manager)" />} />
                <Route path="/manager/expenses/reject/:id" element={<ExpenseList reviewer title="All Expenses (Manager)" />} />
                <Route path="/manager/team" element={<ExpenseList reviewer title="Team Expenses" />} />
              </Route>

              {/* Finance */}
              <Route element={<RoleGuard allow={["FINANCE"]} />}>
                <Route path="/finance/dashboard" element={<FinanceDashboard />} />
                <Route path="/finance/expenses" element={<ExpenseList reviewer title="All Expenses (Finance)" />} />
                <Route path="/finance/process-payments" element={<ProcessPayments />} />
                <Route path="/finance/reports" element={<FinanceReports />} />
              </Route>

            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
