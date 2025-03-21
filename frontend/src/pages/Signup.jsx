import React, { useContext, useState } from "react";
import "./CSS/Form.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";
import { Link } from "react-router-dom";

const Signup = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password.trim() === formData.confirm_password.trim()) {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        // console.log(res);

        const data = await res.json();

        if (res.status === 200) {
          localStorage.setItem("savedEmail", formData.email);
          window.location.href = "/verify";
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
      <h2 className="form-heading">Signup</h2>
      <p>
        Already have an account?{" "}
        <Link to="/login">
          <span className="switch-link">Login</span>
        </Link>
      </p>

      <form onSubmit={handleSignup}>
        <div className="input-div">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-div">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-div">
          <label htmlFor="">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
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
        <PrimaryBtn className="form-btn" text="Signup" />
      </form>
    </div>
  );
};

export default Signup;
