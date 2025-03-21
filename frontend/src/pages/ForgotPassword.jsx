import React, { useContext, useState } from "react";
import "./CSS/Form.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
  });

  // maintaning form input states
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const ForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
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
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Reset Password</h2>
      <p>
        Remember your password?{" "}
        <Link to="/login">
          <span className="switch-link">Login</span>
        </Link>
      </p>

      <form onSubmit={ForgotPassword}>
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

        <PrimaryBtn className="form-btn" text="Verify Email" />
      </form>
    </div>
  );
};

export default ForgotPassword;
