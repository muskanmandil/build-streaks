import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import streak_logo from "../../assets/streak.svg";
import user_avatar from "../../assets/user_avatar.svg";

const Navbar = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => (window.location.href = "/")}>
        <img src={streak_logo} className="logo-streak-icon" alt="" />
        <i>Build Streaks</i>
      </h2>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <div className="navbar-streak">
              <img src={streak_logo} alt="" className="navbar-streak-logo" />
              <div className="navbar-streak-number">0</div>
            </div>
            <Link to="/profile" className="navbar-profile">
              <img src={user_avatar} alt="" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button onClick={() => setLoggedIn(true)} className="login-btn">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
