import React, { useContext } from "react";
import "./CSS/Profile.css";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { setLoading, userInfo } = useContext(AppContext);
  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("auth-token");
    alert("User Logged out successfully");
    window.location.href = "/";
  };
  return (
    <div className="profile-container">
      <div className="info-div">
        <h3>Name:</h3>
        <p>{userInfo.name}</p>
      </div>
      <div className="info-div">
        <h3>Email:</h3>
        <p>{userInfo.email}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
