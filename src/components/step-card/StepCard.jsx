import React from "react";
import "./StepCard.css"

const StepCard = (props) => {
  return (
    <div className="step-card">
      <div className="card-img" style={{backgroundColor: props.color}}></div>
      <div className="card-header">
        <p className="step-number">Step {props.id}</p>
        <p className="card-heading">{props.title}</p>
        <div className="progress-bar"></div>
      </div>
      <div className="substeps-list">{
        props.all_substeps.map((substep)=>{
            return <div>{substep.substepTitle}</div>
        })
      }</div>
    </div>
  );
};

export default StepCard;
