import React from "react";
import "./modalview.css"

export default function ModalView({isActive, setActive, children}) {
  return (
    <div className={isActive ? "modalview active" : "modalview"} onClick={() => setActive(false)}>
      <div className={isActive ? "modalview--content active" : "modalview--contet"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}