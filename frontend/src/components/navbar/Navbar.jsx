import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import streak_logo from "../../assets/streak_logo.svg";
import streak_dull from "../../assets/streak_dull.svg";
import streak_lit from "../../assets/streak_lit.svg";
import user_avatar from "../../assets/user_avatar.svg";
import { ProgressContext } from "../../context/ProgressContext";
import { AppContext } from "../../context/AppContext";
import leaderboard from "../../assets/leaderboard.svg";
import pointsxp from "../../assets/pointsxp.svg";
import burger_menu from "../../assets/burger_menu.svg";

const Navbar = () => {
  const { filter } = useContext(AppContext);
  const { progressInfo, levelQuestions, levelQuestionsDone } =
    useContext(ProgressContext);

  const [mobileMenu, setMobileMenu] = useState(false);

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
      {localStorage.getItem("auth-token") && (
        <div className="total-progress-container">
          <p className="total-progress-percentage">
            {Math.ceil(
              (levelQuestionsDone(filter) / levelQuestions(filter)) * 100
            )}
            % completed
          </p>
          <p className="total-progress">
            {levelQuestionsDone(filter)} / {levelQuestions(filter)}
          </p>
        </div>
      )}

      <div className="navbar-right">
        {/* {true ? ( //for testing purpose */}
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
            {mobileMenu ? (
              <div className="mobile-navbar-expanded">
                <div
                  className="burger-menu"
                  onClick={() => setMobileMenu(false)}
                >
                  <img src={burger_menu} alt="" className="burger-menu-logo" />
                </div>
                <div className="mobile-navbar-popup">
                  <Link
                    to="/leaderboard"
                    className="navbar-leaderboard mobile-navbar-leaderboard"
                    onClick={() => setMobileMenu(false)}
                  >
                    <img src={leaderboard} alt="" />
                    <p>Leaderboard</p>
                  </Link>
                  <Link
                    to="/profile"
                    className="navbar-profile mobile-navbar-profile"
                    onClick={() => setMobileMenu(false)}
                  >
                    <img src={user_avatar} alt="" />
                    <p>Profile</p>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mobile-navbar">
                <div
                  className="burger-menu"
                  onClick={() => setMobileMenu(true)}
                >
                  <img src={burger_menu} alt="" className="burger-menu-logo" />
                </div>
              </div>
            )}
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
