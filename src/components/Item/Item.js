import React from "react";
import "./item--style.css"
import ModalConfirm from "./ModalConfirm/ModalConfirm"

export default function Item(prop) {
  const [confirmActive, setConfirmActive] = React.useState(false)

  function yes() {
    setConfirmActive(false)
    prop.func(prop.index)
  }
  
  return (
    <div className="item">
      <div className="item--info">
        <img className="item--img" src={prop.imageUrl} alt="Sorry your link is don't load"/>
        <div className="item--text">
          <h1 className="item--name">
            {prop.name}
          </h1>
          <p className="item--count">
            In stock: {prop.count}
          </p>
          <img onClick={() => setConfirmActive(true)} className="img--delete" src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" alt="del"/>
        </div>
        <ModalConfirm active={confirmActive} setActive={setConfirmActive}>
          <div>
            Are You Shure?
          </div>
          <div className="confirm--btns">
            <button onClick={() => yes()}>Yes</button>
            <button onClick={() => setConfirmActive(false)}>No</button>
          </div>
        </ModalConfirm>
      </div>
    </div>
  )
}