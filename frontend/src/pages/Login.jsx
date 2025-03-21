import React, { useContext, useState } from "react";
import "./CSS/Form.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";
import { Link } from "react-router-dom";

const Login = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/auth/login`, {
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

      if (res.status === 200) {
        localStorage.setItem("auth-token", data.token);
        window.location.href = "/dashboard";
      }

      alert(data.message);
    } catch (error) {
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
          <span className="switch-link">Signup</span>
        </Link>
      </p>

      <form onSubmit={handleLogin}>
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

        <div className="input-div show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="">Show Password</label>
        </div>

        <div className="form-btns-div">
          <PrimaryBtn className="form-btn" text="Login" />
          <Link to="/forgot-password">
            <span className="switch-link">Forgot Password</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
