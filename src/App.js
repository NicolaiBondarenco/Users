import React, { useState, useEffect } from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components'

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [valueInput, setValueInput] = useState('')
  const [addToggle, setAddToggle] = useState([])
  const [success, setSucces] = useState(false)

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setItems(json.data))
    setLoading(false)
  }, [])

  const onChangeSearchValue = (e) => {
    setValueInput(e.target.value)
  }

  const addUser = (id) => {
    if (addToggle.includes(id)) {
      setAddToggle((prev) => prev.filter((_id) => _id !== id))
    } else {
      setAddToggle([...addToggle, id])
    }
  }

  const sendToUsers = () => {
    if (addToggle.length == 0) return
    setSucces(true)
  }

  return (
    <div className="App">
      {success ? (
        <Success count={addToggle.length} />
      ) : (
        <Users
          items={items}
          isLoading={isLoading}
          onChangeSearchValue={onChangeSearchValue}
          valueInput={valueInput}
          addUser={addUser}
          addToggle={addToggle}
          sendToUsers={sendToUsers}
        />
      )}
    </div>
  )
}

export default App
