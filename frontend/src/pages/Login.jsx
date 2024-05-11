import React, { useState } from "react";
import "./CSS/Login.css";

const Login = () => {
  const [isSignedUp, setSignedUp] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password.trim() === formData.confirm_password.trim()) {
      try {
        const response = await fetch("http://localhost:4000/signup", {
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
        console.log(response);
        const data = await response.json();
        if (response.status === 200) {
          alert("User Sign up successful");
          setSignedUp(true);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      console.log(response);
      const data = await response.json();
      if (response.status===200) {
        alert("User Logged in successfully");
        setLoggedIn(true);
        window.location.href="/dashboard";
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-heading">{!isSignedUp ? "Signup" : "Login"}</h2>
      <form onSubmit={!isSignedUp ? handleSignup : handleLogin}>
        {!isSignedUp ? (
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
        ) : null}

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
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {!isSignedUp ? (
          <div className="input-div">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              required
            />
          </div>
        ) : null}

        <button className="login-signup-btn">
          {!isSignedUp ? "Signup" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
