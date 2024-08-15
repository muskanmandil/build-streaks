import React, { useContext, useEffect, useState } from "react";
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
import notes from "../../assets/notes.svg";
import burger_menu from "../../assets/burger_menu.svg";
import PrimaryBtn from "../primary-btn/PrimaryBtn";

const Navbar = () => {
  const { filter, fetchLeaderboard, revision } = useContext(AppContext);
  const {
    progressInfo,
    fetchProgressInfo,
    filteredQuestions,
    filteredQuestionsDone,
  } = useContext(ProgressContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  // fetching progress info as progress info changes explicitly here to avoid that done then undone and then done state management issue of questions
  useEffect(() => {
    fetchProgressInfo();
  }, [fetchProgressInfo, progressInfo]);

  // fetching this date to update the streak
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

      {/* progress view */}
      {localStorage.getItem("auth-token") && (
        <div className="total-progress-container">
          <p className="total-progress-percentage">
            {filteredQuestions(filter, revision) === 0
              ? "0"
              : Math.floor(
                  (filteredQuestionsDone(filter, revision) /
                    filteredQuestions(filter, revision)) *
                    100
                )}
            % completed
          </p>

          <p className="total-progress">
            {filteredQuestionsDone(filter, revision)} /{" "}
            {filteredQuestions(filter, revision)}
          </p>
        </div>
      )}

      <div className="navbar-right">
        {/* {true ? ( //for testing purpose */}
        {/* login check */}
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

            <Link
              to="/leaderboard"
              className="navbar-leaderboard"
              onClick={fetchLeaderboard}
            >
              <img src={leaderboard} alt="" />
            </Link>

            <Link to="/notes" className="navbar-notes">
              <img src={notes} alt="" />
            </Link>

            <Link to="/profile" className="navbar-profile">
              <img src={user_avatar} alt="" />
            </Link>

            {/* mobile menu state */}
            {mobileMenu ? (
              // open state
              <div className="mobile-navbar-expanded">
                {/* burger menu icon */}
                <div
                  className="burger-menu"
                  onClick={() => setMobileMenu(false)}
                >
                  <img src={burger_menu} alt="" className="burger-menu-logo" />
                </div>

                {/* mobile menu popup */}
                <div className="mobile-navbar-popup">
                  {/* progress-view */}
                  {localStorage.getItem("auth-token") && (
                    <div className="total-progress-container mobile-total-progress-container">
                      <p className="total-progress-percentage">
                        {filteredQuestions(filter, revision) === 0
                          ? "0"
                          : Math.floor(
                              (filteredQuestionsDone(filter, revision) /
                                filteredQuestions(filter, revision)) *
                                100
                            )}
                        % completed
                      </p>

                      <p className="total-progress">
                        {filteredQuestionsDone(filter, revision)} /{" "}
                        {filteredQuestions(filter, revision)}
                      </p>
                    </div>
                  )}

                  <Link
                    to="/leaderboard"
                    className="navbar-leaderboard mobile-navbar-leaderboard"
                    onClick={() => {
                      fetchLeaderboard();
                      setMobileMenu(false);
                    }}
                  >
                    <img src={leaderboard} alt="" />
                    <p>Leaderboard</p>
                  </Link>

                  <Link
                    to="/notes"
                    className="navbar-notes mobile-navbar-notes"
                    onClick={() => setMobileMenu(false)}
                  >
                    <img src={notes} alt="" />
                    <p>Notes</p>
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
              // mobile menu closed state
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
          // login btn
          <Link to="/login">
            <PrimaryBtn className="login-btn" text="Login" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
