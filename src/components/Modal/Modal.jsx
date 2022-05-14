import React from "react";
import "./modal.css"

export default function Modal({isActive, setActive, children}) {
  return (
    <div className={isActive ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={isActive ? "modal--content active" : "modal--content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}