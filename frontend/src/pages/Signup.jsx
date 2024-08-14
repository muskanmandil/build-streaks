import React, { useContext, useState } from "react";
import "./CSS/LoginSignup.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";
import { Link } from "react-router-dom";

const Signup = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading, isSignedUp, setSignedUp } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    otp: "",
  });

  // maintaning form input states
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSignup = async (e) => {
    // preventing default event
    e.preventDefault();

    // checking if password & confirm password matches
    if (formData.password.trim() === formData.confirm_password.trim()) {
      // if it does then try to fetch response
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/signup`, {
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

        // if response is successful i.e. status code 200
        if (res.status === 200) {
          console.log(formData.email);
          localStorage.setItem("savedEmail", formData.email);
          console.log(localStorage.getItem("savedEmail"));

          setSignedUp(true);
        }

        // alert the response message
        alert(data.message);
      } catch (error) {
        // if any error occurs catch it and log it
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    // if passwords do not matches alert user about it
    else {
      alert("Passwords do not match");
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("savedEmail"),
          otp: formData.otp,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.removeItem("savedEmail");

        // store auth-token in local storage
        localStorage.setItem("auth-token", data.token);

        // redirect to dashboard
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
      <h2 className="form-heading">{!isSignedUp ? "Signup" : "Verify"}</h2>
      <p>
        {!isSignedUp
          ? "Already have an account? "
          : `A verification code has been sent to ${localStorage.getItem(
              "savedEmail"
            )}.`}
        {!isSignedUp && (
          <Link to="/login">
            <span className="switch-link" onClick={() => setSignedUp(true)}>
              Login
            </span>
          </Link>
        )}
      </p>

      {!isSignedUp ? (
        /* Signup Form */
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

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

          <PrimaryBtn className="form-btn" text="Signup" />
        </form>
      ) : (
        /* Verification Form */
        <form onSubmit={handleOTPVerification}>
          <div className="input-div">
            <label htmlFor="">Enter your code</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              required
            />
          </div>

          <PrimaryBtn className="form-btn" text="Verify" />
        </form>
      )}
    </div>
  );
};

export default Signup;
