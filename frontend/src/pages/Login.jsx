import React, { useContext, useState } from "react";
import "./CSS/Login.css";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { isSignedUp, setSignedUp } = useContext(AppContext);
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

    // preventing default event
    e.preventDefault();

    // checking if password & confirm password matches
    if (formData.password.trim() === formData.confirm_password.trim()) {

      // if it does then try to fetch response
      try {
        const res = await fetch("http://localhost:4000/signup", {
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
          setSignedUp(true);

          // store auth-token in local storage
          localStorage.setItem('auth-token', data.token);

          // redirect to dashboard
          window.location.href='/dashboard'
        }

        // alert the response message
        alert(data.message);
      } 
      // if any error occurs catch it and log it
      catch(error) {
        console.log(error);
      }
    } 
    // if passwords do not matches alert user about it
    else {
      alert("Passwords do not match");
    }
  };

  const handleLogin = async (e) =>{

    // prevent default event
    e.preventDefault();

    // try to fetch response
    try{
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify ({
          email: formData.email,
          password: formData.password
        })
      });

      // console.log(res);

      const data = await res.json();

      // if response is successful i.e. status code 200
      if(res.status===200){

        // store auth-token in local storage
        localStorage.setItem('auth-token', data.token);

        // redirect to dashboard
        window.location.href = '/dashboard';

      }

      // alert the response message
      alert(data.message);
    }
    // if any error occurs catch it and log it
    catch(error){
      console.log(error);
    } 
  }

  return (
    <div className="login-container">
      <h2 className="form-heading">{!isSignedUp ? "Signup" : "Login"}</h2>
      <p>
        {!isSignedUp ? "Already have an account? " : "Don't have an account? "}
        <span
          className="login-signup-link"
          onClick={() => setSignedUp(!isSignedUp)}
        >
          {!isSignedUp ? "Login" : "Signup"}
        </span>
      </p>

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
