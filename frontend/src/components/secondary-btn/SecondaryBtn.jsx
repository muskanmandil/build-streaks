import React from "react";
import PrimaryBtn from "../primary-btn/PrimaryBtn";
import "./SecondaryBtn.css";

const SecondaryBtn = (props) => {
  return (
    <PrimaryBtn
      className={`secondary-btn ${props.className}`}
      onClick={props.onClick}
      text={props.text}
    />
  );
};

export default SecondaryBtn;
