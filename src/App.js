import React from "react";
import Modal from "./components/Modal/Modal";
import Item from "./components/Item/Item"

export default function App() {

  let img = React.createRef()
  let name = React.createRef()
  let count = React.createRef()
  let width = React.createRef()
  let heigth = React.createRef()
  let weigth = React.createRef()
  
  const [isActive, setActive] = React.useState(false)
  const [array, setArray] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const itemRend = array.map(item => {
    return <Item 
      key={item.id}
      imageUrl={item.imageUrl}
      name={item.name}
      count={item.count}
      weight={item.weight}
      size={item.size}
      comments={item.comments}
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
      id: array.length + 1,
      imageUrl: img.current.value,
      name: name.current.value,
      count: parseInt(count.current.value),
      size: {
        width: width.current.value,
        heigth: heigth.current.value,
      },
      weigth: weigth.current.value,
    }
    array.push(newItem)
    clear()
    setActive(false)
    localStorage.setItem("My Array",JSON.stringify(array))
  }

  function clear() {
    img.current.value = ''
    name.current.value = ''
    count.current.value = ''
    width.current.value = ''
    heigth.current.value = ''
    weigth.current.value = ''
  }

  function sortByCount() {
    const copyData = array.concat()
    let newItems = copyData.sort(
      (a, b)=>{return a.count > b.count ? 1 : -1}
    )
    setArray(newItems)
  }

  function sortByName() {
    const copyData = array.concat()
    let newItems = copyData.sort(
      (a, b)=>{return a.name > b.name ? 1 : -1}
    )
    setArray(newItems)
  }
  
  function changeListener(){
    let value = document.getElementById("selector")
      if (value.value === "name") {
        sortByName()
      } else if (value.value === "count") {
        sortByCount()
      }
  }

  function oh() {
    if (img.current.value !== '' && name.current.value !== '' && count.current.value !== '' && width.current.value !== '' && heigth.current.value !== '' && weigth.current.value !== '') {
      setModalVisible(true)
    }else {
      setModalVisible(false)
    }
    
  }

  return (
    <div className="app">
      <div className="app--btn--sort">
        <button className="app--btn" onClick={() => setActive(true)}>
          Add new Item
        </button>
        <label htmlFor="sort">Choose a sort:</label>
        <select id="selector" name="sort" size="1" onChange={changeListener}>
          <option id="so" value="name">by Name</option>
          <option id="so" value="count">by Count</option>
        </select>
      </div>
      <div className="app--items">
        {itemRend}
      </div>

      <Modal isActive={isActive} setActive={setActive}>
        <h1 className="modal--title">
          Please write info about product
        </h1>
        <div className="modal--info">
          <p>Img Url</p>
          <input id="img" type="text" ref={img} onChange={oh}/>
          <p>Name</p>
          <input id="name" type="text" ref={name} onChange={oh}/>
          <p>Count</p>
          <input id="count" type="text" ref={count} onChange={oh}/>
          <p>Size</p>
          <input id="width" type="text" placeholder="Width" ref={width} onChange={oh}/>
          <input id="heigth" type="text" placeholder="Heigth" ref={heigth} onChange={oh}/>
          <p>Weigth</p>
          <input id="weigth" type="text" ref={weigth} onChange={oh}/>
        </div>
        <div className="modal--btns">
          <button className={modalVisible ? "modal--add active" : "modal--add"} onClick={addToArray}>Add</button>
          <button onClick={clear}>Clear</button>
        </div>
      </Modal>
    </div>
  )
}