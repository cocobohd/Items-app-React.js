import React from "react";
import Modal from "./components/Modal/Modal";
import Item from "./components/Item/Item"

export default function App() {

  let img = React.createRef()
  let name = React.createRef()
  let count = React.createRef()
  let width = React.createRef()
  let heigth = React.createRef()
  let weight = React.createRef()

  const [isActive, setActive] = React.useState(false)
  const [array, setArray] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  let generalRender = array.map((item, index) => {
    return <Item
      key={item.id}
      id={item.id}
      imageUrl={item.imageUrl}
      name={item.name}
      count={item.count}
      weight={item.weight}
      size={item.size}
      comments={item.comments}
      index = {index}
      func={() => deleteTask(index)}
    />
  })
  

  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem("My Array"));
    if (items) {
      setArray(items);
    }
  }, []);

  function addToArray() {
    let newItem = {
      id: Math.floor(Math.random() * 100000),
      imageUrl: img.current.value,
      name: name.current.value,
      count: parseInt(count.current.value),
      size: {
        width: parseInt(width.current.value),
        heigth: parseInt(heigth.current.value),
      },
      weight: weight.current.value,
      comments: []
    }
    array.push(newItem)
    clear()
    setActive(false)
    localStorage.setItem("My Array", JSON.stringify(array))
  }

  function clear() {
    img.current.value = ''
    name.current.value = ''
    count.current.value = ''
    width.current.value = ''
    heigth.current.value = ''
    weight.current.value = ''
  }

  function sortByCount() {
    const copyData = array.concat()
    let newItems = copyData.sort(
      (a, b) => { return a.count > b.count ? 1 : -1 }
    )
    setArray(newItems)
    localStorage.setItem("My Array", JSON.stringify(newItems))
  }

  function sortByName() {
    const copyData = array.concat()
    let newItems = copyData.sort(
      (a, b) => { return a.name > b.name ? 1 : -1 }
    )
    setArray(newItems)
    localStorage.setItem("My Array", JSON.stringify(newItems))
  }

  function changeListener() {
    let value = document.getElementById("selector")
    if (value.value === "name") {
      sortByName()
    } else if (value.value === "count") {
      sortByCount()
    }
  }

  function validation() {
    setActive(true)
    // eslint-disable-next-line
    if (img.current.value.trim() != 0 && name.current.value.trim() != 0 && count.current.value.trim() != 0 && width.current.value.trim() != 0 && heigth.current.value.trim() != 0 && weight.current.value.trim() != 0) {
      setModalVisible(true)
    } else {
      setModalVisible(false)
    }
  }

  function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('My Array')
    let listArr = JSON.parse(getLocalStorage)
    listArr.splice(index, 1)
    localStorage.setItem('My Array', JSON.stringify(listArr))
    setArray(listArr)
  }

  return (
    <div className="app" onLoad={sortByName}>
      <div className="app--btn--sort">
        <button className="app--btn" onClick={() => validation()}>
          Add new Item
        </button>
        <label htmlFor="sort">Choose a sort:</label>
        <select id="selector" name="sort" size="1" onChange={changeListener}>
          <option id="so" value="name">by Name</option>
          <option id="so" value="count">by Count</option>
        </select>
      </div>
      <div className="app--items">
        {generalRender}
      </div>

      <Modal isActive={isActive} setActive={setActive}>
        <h1 className="modal--title">
          Please write info about product
        </h1>
        <div className="modal--info">
          <p>Img Url</p>
          <input id="img" type="text" ref={img} onChange={validation} />
          <p>Name</p>
          <input id="name" type="text" ref={name} onChange={validation} />
          <p>Count</p>
          <input id="count" type="number" ref={count} onChange={validation} />
          <p>Size</p>
          <input id="width" type="number" placeholder="Width" ref={width} onChange={validation} />
          <input id="heigth" type="number" placeholder="Heigth" ref={heigth} onChange={validation} />
          <p>Weigth</p>
          <input id="weigth" type="text" ref={weight} onChange={validation} />
        </div>
        <div className="modal--btns">
          <button className={modalVisible ? "modal--add active" : "modal--add"} onClick={addToArray}>Add</button>
          <button onClick={clear}>Clear</button>
        </div>
      </Modal>
    </div>
  )
}