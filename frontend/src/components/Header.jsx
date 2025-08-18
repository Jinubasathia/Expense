import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      <h1>Expense Reimbursement System</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </header>
  );
};

export default Header;
