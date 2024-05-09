import React from "react";
import "./CSS/LandingPage.css";
import StreakLogo from "../components/streak-logo/StreakLogo";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="introduction">
        <h2>Want to study DSA ?</h2>
        <h3>but not able to be consistent..</h3>
        <p>Let's gamify your experience of studying and help you in accompolishing your goal</p>
      </div>

      <StreakLogo />
    </div>
  );
};

export default LandingPage;
