import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import {
  CréerLikeMessage,
  SupprimerLikeMessage,
  ModifNbrLikeMessage,
  AfficheMessages,
} from './Requete'
import '../styles/LikeMessage.css'

library.add(faThumbsUp)

function LikeMessage({ info, setDataMessages }) {
  let url = new URL(window.location.href)
  let search_parms = new URLSearchParams(url.search)
  let userPseudoIsAdminBearer = ''
  let token = ''
  let userPseudo = ''
  let userPseudoIsAdmin = ''
  if (search_parms.has('userPseudo')) {
    userPseudoIsAdminBearer = search_parms.get('userPseudo')
    token = userPseudoIsAdminBearer.split('Bearer')[1]
    userPseudoIsAdmin = userPseudoIsAdminBearer.split('Bearer')[0]
    userPseudo = userPseudoIsAdmin.split('isAdmin')[0]
  }

  const [dataLikeMessage, setDataLikeMessages] = useState(false)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/likes/likeMessage/`)
      .then((res) => res.json())
      .then((data) => {
        for (let dataLike of data) {
          if (
            dataLike.idMessage === info.id &&
            dataLike.userPseudo === userPseudo
          )
            setDataLikeMessages(true)
        }
      })
  }, [info.id, userPseudo])

  async function LikeMessage() {
    const data = {
      idMessage: info.id,
      nbrLikeMessage: info.likes,
      likeMessage: true,
    }
    await CréerLikeMessage(data, token)
    AfficheMessages(setDataMessages)
  }

  async function supLikeMessage() {
    SupprimerLikeMessage(info, token)
    const data = {
      idMessage: info.id,
      nbrLikeMessage: info.likes,
    }
    ModifNbrLikeMessage(data)
    alert('message disliké')
    AfficheMessages(setDataMessages)
  }

  return (
    <div className="all-like-message">
      {dataLikeMessage === false && (
        <button className="like-message" title="Liker le message">
          <FontAwesomeIcon
            title="liker le message"
            icon="fa-solid fa-thumbs-up"
            className="like-message-icon"
            onClick={() => {
              LikeMessage()
              setDataLikeMessages(!dataLikeMessage)
            }}
          />
        </button>
      )}
      {dataLikeMessage === true && (
        <button className="dislike-message" title="disliker le message">
          <FontAwesomeIcon
            title="disliker le message"
            icon="fa-solid fa-thumbs-up"
            className="dislike-message-icon"
            onClick={() => {
              supLikeMessage()
              setDataLikeMessages(!dataLikeMessage)
            }}
          />
        </button>
      )}
    </div>
  )
}
export default LikeMessage
