import React, { useContext, useState } from "react";
import "./CSS/Form.css";
import { AppContext } from "../context/AppContext";
import PrimaryBtn from "../components/primary-btn/PrimaryBtn";

const Verification = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    otp: "",
  });

  // maintaning form input states
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/auth/verify`, {
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
        localStorage.setItem("auth-token", data.token);
        if (data.flag === "newUser") {
          window.location.href = "/dashboard";
        }

        if (data.flag === "existingUser") {
          window.location.href = "/new-password";
        }
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
      <h2 className="form-heading">Verify</h2>
      <p>
        A verification code has been sent to{" "}
        {localStorage.getItem("savedEmail")}
      </p>
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

        <p>(Do check your Spam Folder for Verification Code)</p>

        <PrimaryBtn className="form-btn" text="Verify" />
      </form>
    </div>
  );
};

export default Verification;
