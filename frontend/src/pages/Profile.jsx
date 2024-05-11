import React, { useContext } from "react";
import "./CSS/Profile.css";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { userName, userEmail } = useContext(AppContext);
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    alert("User Logged out successfully");
    window.location.href = "/";
  };
  return (
    <div className="profile-container">
      <div className="info-div">
        <h3>Name:</h3>
        <p>{userName}</p>
      </div>
      <div className="info-div">
        <h3>Email:</h3>
        <p>{userEmail}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
