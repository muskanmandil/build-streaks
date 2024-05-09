import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import user_avatar from "../../assets/user_avatar.svg"
const Navbar = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <div className="navbar">
      <h2 className="logo-text" onClick={() => (window.location.href = "/")}>
        Build Streaks
      </h2>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <div className="navbar-streak">
              <div className="navbar-streak-logo">
                <dotlottie-player
                  src="https://lottie.host/d9b879c5-3f5e-44e3-ab78-5d27129eb7c0/3HUwwtXJN5.json"
                  background="transparent"
                  speed="2"
                  loop
                  autoplay
                />
              </div>
              <div className="navbar-streak-number">15</div>
            </div>
            <Link to="/profile">
              <div className="navbar-profile"><img src={user_avatar} alt="" /></div>
            </Link>
          </>
        ) : (
          <button onClick={()=>setLoggedIn(true)}className="login-btn">Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
