import React, { useContext } from "react";
import "./CSS/Profile.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";

const Profile = () => {
  const { setLoading, userInfo } = useContext(AppContext);

  // logout function
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
      <PrimaryBtn className="logout-btn" text="Logout" onClick={handleLogout} />
    </div>
  );
};

export default Profile;
