import '../styles/SectionUsers.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'

library.add(faFaceSmile)

function AllUsers() {
  const [data, setDataUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/auth/users')
        const data = await res.json()
        setDataUsers(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="allUsers">
      {data.map((info) => (
        <div className="users" key={info.id}>
          <p className="users-contenu">
            <FontAwesomeIcon
              icon="fa-solid fa-face-smile"
              className="icon-smile"
            />
            {info.pseudo}
          </p>
        </div>
      ))}
    </div>
  )
}

export default AllUsers
