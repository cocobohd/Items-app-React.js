import React from "react";
import "./item--style.css"
import ModalConfirm from "./ModalConfirm/ModalConfirm"
import ModalView from "./ModalView/ModalView"
import Comm from "./Comments/Comm";

export default function Item(prop) {
  const [confirmActive, setConfirmActive] = React.useState(false)
  const [modalView, setModalView] = React.useState(false)
  const [sendComment, setSendComment] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const comment = React.createRef()
  let renderComments = sendComment.map((item, index) => {
    return <Comm
      key={item.id}
      text={item.desctiption}
      date={item.date}
    />
  })

  function yes() {
    setConfirmActive(false)
    prop.func(prop.index)
  }

  function send() {
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    const newComment = {
      id: Math.floor(Math.random()*100000),
      productId: prop.id,
      desctiption: comment.current.value,
      date: time
    }

    setModalView(false)
    comment.current.value = ""
    sendComment.push(newComment)
  }

  function valid() {
    if (comment.current.value.trim() != 0 ) {
      setModalVisible(true)
    } else {
      setModalVisible(false)
    }
  }
  
  return (
    <div className="item">
      <div className="item--info">
        <img onClick={() => setModalView(true)} className="item--img" src={prop.imageUrl} alt="Sorry your link is don't load"/>
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
      <ModalView isActive={modalView} setActive={setModalView}>
          <div className="modalviev--div">
            <h1 className="modalviev--title">
              Full info about {prop.name}
            </h1>
            <p className="modalview--stock">
              In stock: {prop.count}
            </p>
            <p className="modalview--size">
              Width: {prop.size.width} Height: {prop.size.heigth}
            </p>
            <p className="modalview--weight">
              Weight: {prop.weight}
            </p>
            <p className="modalview--comments">
              Comments: {renderComments}
            </p>
            <p>
              Leave a comment?
            </p>
            <textarea className="modalview--textarea" type="textarea" ref={comment} onChange={valid}/>
            <button className={modalVisible ? "modalview--btn active" : "modalview--btn"} onClick={() => send()}>Send!</button>
          </div>
      </ModalView>
    </div>
  )
}