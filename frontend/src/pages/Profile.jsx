import React, { useContext, useState } from "react";
import "./CSS/Profile.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";
import Heatmap from "../components/heatmap/Heatmap";
import { ProgressProvider } from "../context/ProgressContext";

const Profile = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading, userInfo } = useContext(AppContext);
  const [formData, setFormData] = useState({
    curr_password: "",
    new_password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevValue) => !prevValue);
  };
  
  // maintaning form input states
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  // Change Password function
  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curr_password: formData.curr_password,
          new_password: formData.new_password,
        }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // logout function
  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("auth-token");
    alert("User Logged out successfully");
    window.location.href = "/";
  };

  // delete account
  const deleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannnot be reversed."
    );

    if (confirmation) {
      setLoading(true);

      try {
        const res = await fetch(`${backendUrl}/auth/delete-account`, {
          method: "POST",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        });

        const data = res.json();

        if (res.status === 200) {
          alert("Account deleted successfully");
          localStorage.removeItem("auth-token");
          window.location.href = "/";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="info-div">
        <h3>Name:</h3>
        <p>{userInfo.name}</p>
      </div>
      <div className="info-div">
        <h3>Email:</h3>
        <p>{userInfo.email}</p>
      </div>
      <ProgressProvider>
        <Heatmap />
      </ProgressProvider>
      <form className="change-password-form" onSubmit={changePassword}>
        <div className="input-div">
          <label htmlFor="">Current Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="curr_password"
            value={formData.curr_password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="new_password"
            value={formData.new_password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-div show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="">Show Password</label>
        </div>

        <PrimaryBtn text="Change Password" className="form-btn" />
      </form>

      <PrimaryBtn className="logout-btn" text="Logout" onClick={handleLogout} />
      <PrimaryBtn
        className="delete-account-btn"
        text="Delete Account"
        onClick={deleteAccount}
      />
    </div>
  );
};

export default Profile;
