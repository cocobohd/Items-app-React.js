import React from "react";
import "./comm.css"

export default function Comm (props) {

  return (
        <>
          <div className="comments--div">
            <span className="comments--text">
              {props.text}
            </span>
            <span className="comments--date">
              {props.date}
            </span>
            <button className="comment--delete" onClick={props.func}>X</button>
          </div>
        </>
  )
}