import React, { useState } from "react";
import "./StreakLogo.css";

const StreakLogo = () => {
  const [isClicked, setClick] = useState(false);

  // click to start function
  const handleClick = (e) => {
    setClick(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
      setClick(false);
    }, 2000);
  };

  return (
    <div className="streak-logo-container">
      <div
        className={`streak-div ${isClicked ? "rotate" : null}`}
        onClick={handleClick}
      >
        <div className="streak-logo">
          <dotlottie-player
            src="https://lottie.host/d9b879c5-3f5e-44e3-ab78-5d27129eb7c0/3HUwwtXJN5.json"
            background="transparent"
            speed="2"
            loop
            autoplay
          />
        </div>
      </div>
      <p className="click-text">click to start</p>
    </div>
  );
};

export default StreakLogo;
