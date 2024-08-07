import React from "react";
import "./PrimaryBtn.css";

const PrimaryBtn = (props) => {
  return (
    <button
      className={`primary-btn ${props.className} `}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default PrimaryBtn;
