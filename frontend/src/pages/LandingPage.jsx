import React from "react";
import "./CSS/LandingPage.css";
import StreakLogo from "../components/streak-logo/StreakLogo";
import tuf from "../assets/tuf.svg";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="introduction">
        <h2>Want to study DSA ?</h2>
        <h3>but not able to be consistent...</h3>
        <p>
          Let's gamify your experience of studying and help you in
          accompolishing your goal
        </p>
      </div>
      <div className="credits-container">
        <p>
          <i>Based on Striver's A-Z DSA Sheet</i>
        </p>
        <a href="https://www.takeuforward.com" target="_blank" rel="noreferrer">
          <img src={tuf} alt="" className="tuf-logo" />
        </a>
      </div>
      <StreakLogo />
    </div>
  );
};

export default LandingPage;
