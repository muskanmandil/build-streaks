import React from 'react'
import "./PrimaryBtn.css"

const PrimaryBtn = (props) => {
  return (
    <button className={`${props.className} primary-btn`} onClick={props.onClick}>{props.text}</button>
  )
}

export default PrimaryBtn