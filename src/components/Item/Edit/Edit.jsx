import React from "react";
import "./edit.css"

export default function Edit ({isActive, setActive, children}) {
  return (
    <div className={isActive ? "edit active" : "edit"} onClick={() => setActive(false)}>
      <div className={isActive ? "edit--content active" : "edit--contet"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}