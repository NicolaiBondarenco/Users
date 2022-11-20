import React, { useState, useEffect } from 'react'
import './index.scss'
import { ItemsType } from './components/Users'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

export type AddToggleType = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const App = () => {
  const [items, setItems] = useState<ItemsType[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [valueInput, setValueInput] = useState<string>('')
  const [addToggle, setAddToggle] = useState<AddToggleType[]>([])
  const [success, setSucces] = useState<boolean>(false)

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setItems(json.data))
      .catch((err) => console.log('Error ==>', err))
    setLoading(false)
  }, [])

  const onChangeSearchValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setValueInput(e.target.value)
  }

  const addUser = (id: any) => {
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
