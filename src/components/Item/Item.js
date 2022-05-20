import React from "react";
import "./item--style.css"
import ModalConfirm from "../Modal/ModalConfirm/ModalConfirm"
import ModalView from "../Modal/ModalView/ModalView"
import Comm from "./Comments/Comm";
import Edit from "./Edit/Edit";

export default function Item(prop) {
  const [confirmActive, setConfirmActive] = React.useState(false)
  const [modalView, setModalView] = React.useState(false)
  // eslint-disable-next-line no-unused-vars
  const [sendComment, setSendComment] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [editView, setEditView] = React.useState(false)
  const comment = React.createRef()
  let count = React.createRef()
  let width = React.createRef()
  let heigth = React.createRef()
  let weight = React.createRef()

  let arrFromLocalStorage = JSON.parse(localStorage.getItem("My Array"))

  let renderComments = arrFromLocalStorage[prop.index].comments.map((item, index) => {
    return <Comm
      key={item.id}
      text={item.desctiption}
      date={item.date}
      index={index}
      func={() => deleteComment(index)}
    />
  })

  function yes() {
    setConfirmActive(false)
    prop.func(prop.index)
  }

  const send = () => {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    if (minutes <= 9) {
      minutes = '0' + minutes
    }
    if (hours <= 9) {
      hours = '0' + hours
    }
    if (day <= 9) {
      day = '0' + day
    }
    if (month <= 9) {
      month = '0' + month
    }

    const time = `${hours}:${minutes} | ${day}.${month}.${year}`
    const newComment = [
      ...arrFromLocalStorage[prop.index].comments,
      {
        id: Math.floor(Math.random()*100000),
        productId: prop.id,
        desctiption: comment.current.value,
        date: time
      }
    ]

    setSendComment(newComment)
    for (let i = 0; i < newComment.length; i++) {
      if (arrFromLocalStorage[prop.index].id === newComment[i].productId) {
        arrFromLocalStorage[prop.index].comments = newComment
        localStorage.setItem("My Array", JSON.stringify(arrFromLocalStorage))
      }
    }
    
    comment.current.value = ""
  }

  function valid() {
    setModalView(true)
    // eslint-disable-next-line
    if (comment.current.value.trim() != 0 ) {
      setModalVisible(true)
    } else {
      setModalVisible(false)
    }
  }

  function deleteComment(index) {
    let newArr = arrFromLocalStorage[prop.index].comments.splice(index, 1)
    setSendComment(newArr)
    localStorage.setItem("My Array", JSON.stringify(arrFromLocalStorage))
  }
  
  function edit() {
    setEditView(true)
  }

  function saveChanges() {
    let newArr = arrFromLocalStorage

    if (count.current.value === '') {
      newArr[prop.index].count = arrFromLocalStorage[prop.index].count
    }else {
      newArr[prop.index].count = parseInt(count.current.value)
    }

    if (width.current.value === '') {
      newArr[prop.index].size.width = arrFromLocalStorage[prop.index].size.width
    }else {
      newArr[prop.index].size.width = parseInt(width.current.value)
    }
    
    if (heigth.current.value === '') {
      newArr[prop.index].size.heigth = arrFromLocalStorage[prop.index].size.heigth
    }else {
      newArr[prop.index].size.heigth = parseInt(heigth.current.value)
    }

    if (weight.current.value === '') {
      newArr[prop.index].weight = arrFromLocalStorage[prop.index].weight
    }else {
      newArr[prop.index].weight = weight.current.value
    }

    localStorage.setItem("My Array", JSON.stringify(newArr))

    count.current.value = ""
    width.current.value = ""
    heigth.current.value = ""
    weight.current.value =""

    setEditView(false)
    prop.re()
  }

  return (
    <div className="item">
      <div className="item--info">
        <img onClick={() => valid()} className="item--img" src={prop.imageUrl} alt="Sorry your link is don't load"/>
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
            <button onClick={() => edit()} className="edit--btn">edit</button>
            <p className="modalview--comments">
              Comments: {arrFromLocalStorage[prop.index].comments.length === 0 ? "No one leave comments..." : arrFromLocalStorage[prop.index].comments.length}
            </p>
              {renderComments}
            <p>
              Leave comment?
            </p>
            <textarea className="modalview--textarea" type="textarea" ref={comment} onChange={valid}/>
            <button className={modalVisible ? "modalview--btn active" : "modalview--btn"} onClick={send}>Send!</button>
          </div>
      </ModalView>

      <Edit isActive={editView} setActive={setEditView}>
        <div className="edit--div">
          <p className="modalview--stock">
            In stock:
          </p>
          <input type="number" ref={count}/>
          <p className="modalview--size">
            Width and Height: 
          </p>
          <input type="number" ref={width} placeholder="Width..."/>
          <input type="number" ref={heigth} placeholder="Heigth..."/>
          <p className="modalview--weight">
            Weight:
          </p>
          <input type="text" ref={weight} maxLength={10}/>
          <button onClick={() => saveChanges()}>Save</button>
        </div>
      </Edit>

    </div>
  )
}