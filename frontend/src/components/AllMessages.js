import '../styles/AllMessages.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

library.add(faThumbsUp)

function AllMessage() {
  const [data, setDataMessages] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/messages')
        const data = await res.json()
        setDataMessages(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="allMessages">
      {data.map((info) => (
        <div key={info.id}>
          <p className="message-pseudoUser">{info.userPseudo}</p>
          <div className="message">
            <p className="message-contenu">
              {info.text}
              <FontAwesomeIcon
                icon="fa-solid fa-thumbs-up"
                className="icon-like"
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllMessage
