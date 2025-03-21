import React, { useContext, useState } from "react";
import "./CSS/Form.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";

const NewPassword = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
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

  const ChangePassword = async (e) => {
    e.preventDefault();

    if (formData.new_password.trim() === formData.confirm_password.trim()) {
      setLoading(true);

      try {
        const res = await fetch(`${backendUrl}/auth/new-password`, {
          method: "POST",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password: formData.new_password,
          }),
        });

        // console.log(res);

        const data = await res.json();

        if (res.status === 200) {
          window.location.href = "/dashboard";
        }

        alert(data.message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Set New Password</h2>

      {/* Form */}
      <form onSubmit={ChangePassword}>
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
        <div className="input-div">
          <label htmlFor="">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
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

        <PrimaryBtn className="form-btn" text="Change Password" />
      </form>
    </div>
  );
};

export default NewPassword;
