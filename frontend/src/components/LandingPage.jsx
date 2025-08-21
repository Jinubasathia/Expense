// src/components/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Floating Shapes */}
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>
      <div className="shape shape4"></div>

      <div className="landing-content">
        <header className="landing-header">
          <h1 className="logo">EXPENSE MANAGEMENT PORTAL</h1>
          <nav>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn outline">Signup</Link>
          </nav>
        </header>

        <main className="landing-main">
          <div className="intro">
            <h2>Welcome to Expense Management Portal</h2>
            <p>
              Streamline your team's expense tracking and approvals. Submit, manage, 
              and process expenses efficiently all in one place.
            </p>
            <Link to="/signup" className="btn hero-btn">Get Started</Link>
          </div>
        </main>

        <footer className="landing-footer">
          &copy; {new Date().getFullYear()} Expense Manager. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
