import React from "react";
import "./modalconfirm--style.css"

export default function ModalConfirm ({active, setActive, children}) {
  return (
    <div className={active ? "confirm active" : "confirm"} onClick={() => setActive(false)}>
      <div className={active ? "confirm--content active" : "confirm--contet"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}