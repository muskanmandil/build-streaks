import React, { useContext, useState } from "react";
import "./CSS/LoginSignup.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";
import { Link } from "react-router-dom";

const Login = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading, setSignedUp } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // maintaning form input states
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleLogin = async (e) => {
    // prevent default event
    e.preventDefault();
    setLoading(true);
    // try to fetch response
    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // console.log(res);

      const data = await res.json();

      // if response is successful i.e. status code 200
      if (res.status === 200) {
        // store auth-token in local storage
        localStorage.setItem("auth-token", data.token);

        // redirect to dashboard
        window.location.href = "/dashboard";
      }

      // alert the response message
      alert(data.message);
    } catch (error) {
      // if any error occurs catch it and log it
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="switch-link" onClick={() => setSignedUp(false)}>
            Signup
          </span>
        </Link>
      </p>

      {/* Form */}
      <form onSubmit={handleLogin}>
        {/* Email */}
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

        {/* Password */}
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

        <PrimaryBtn className="form-btn" text="Login" />
      </form>
    </div>
  );
};

export default Login;
