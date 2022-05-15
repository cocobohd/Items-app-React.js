import React from "react";
import "./item--style.css"

export default function Item(prop) {

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
          <img onClick={() => prop.func()} className="img--delete" src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" alt="del"/>
        </div>
      </div>
    </div>
  )
}