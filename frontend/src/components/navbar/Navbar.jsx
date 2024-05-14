import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import streak_logo from "../../assets/streak_logo.svg";
import streak_dull from "../../assets/streak_dull.svg";
import streak_lit from "../../assets/streak_lit.svg";
import user_avatar from "../../assets/user_avatar.svg";
import { ProgressContext } from "../../context/ProgressContext";
import leaderboard from "../../assets/leaderboard.svg";
import pointsxp from "../../assets/pointsxp.svg";

const Navbar = () => {
  const { progressInfo, totalQuestionsDone } = useContext(ProgressContext);

  let today = new Date(Date.now())
    .toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => (window.location.href = "/")}>
        <img src={streak_logo} className="logo-streak-icon" alt="" />
        <i>Build Streaks</i>
      </h2>
      <div className="total-progress-container">
        <p className="total-progress-percentage">
          {Math.ceil((totalQuestionsDone / 454) * 100)}% completed
        </p>
        <p className="total-progress">{totalQuestionsDone} / 454</p>
      </div>
      <div className="navbar-right">
        {localStorage.getItem("auth-token") ? (
          <>
            <div className="navbar-points">
              <img src={pointsxp} alt="" className="navbar-points-logo" />
              <div className="navbar-points-number">{progressInfo.points}</div>
            </div>
            <Link to="/dashboard">
              <div className="navbar-streak">
                <img
                  src={
                    progressInfo.lastActiveDate === today &&
                    progressInfo.streak !== 0
                      ? streak_lit
                      : streak_dull
                  }
                  alt=""
                  className="navbar-streak-logo"
                />
                <div className="navbar-streak-number">
                  {progressInfo.streak}
                </div>
              </div>
            </Link>
            <Link to="/leaderboard" className="navbar-leaderboard">
              <img src={leaderboard} alt="" />
            </Link>
            <Link to="/profile" className="navbar-profile">
              <img src={user_avatar} alt="" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
