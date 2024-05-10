import React, { useState } from "react";
import "./CSS/Login.css";

const Login = () => {
  const [user, setUser] = useState("Signup");
  return (
    <div className="login-container">
      <h2 className="form-heading">{user === "Signup" ? "Signup" : "Login"}</h2>
      <form action="">
        <div className="input-div">
          <label htmlFor="">Name</label>
          <input type="text" />
        </div>
        <div className="input-div">
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
        <div className="input-div">
          <label htmlFor="">Password</label>
          <input type="text" />
        </div>
        <button className="login-btn">{user === "Signup" ? "Signup" : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
