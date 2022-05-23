import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import {
  AfficheLikeMessage,
  CréerLikeMessage,
  SupprimerLikeMessage,
  ModifNbrLikeMessage,
  AfficheMessages,
} from './utils/Requete'
import '../styles/LikeMessage.css'

library.add(faThumbsUp)

/**
 * fonction principal des likes messages
 * @param {Object} dataMess - information message
 * @param {Object} setDataMessages - state message
 * @returns likes message
 */
function LikeMessage({ dataMess, setDataMessages }) {
  /**
   * recupération du token, isAdmin et de user pseudo
   */
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
    AfficheLikeMessage(dataMess, userPseudo, setDataLikeMessages)
  }, [dataMess, userPseudo])

  /**
   * fonction pour liker un message et mettre à jour le DOM
   */
  async function LikeMessage() {
    const data = {
      idMessage: dataMess.id,
      nbrLikeMessage: dataMess.likes,
      likeMessage: true,
    }
    await CréerLikeMessage(data, token)
    AfficheMessages(setDataMessages)
  }

  /**
   * fonction pour supprimer un like de message et mettre à jour le DOM
   */
  async function supLikeMessage() {
    SupprimerLikeMessage(dataMess, token)
    const data = {
      idMessage: dataMess.id,
      nbrLikeMessage: dataMess.likes,
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
