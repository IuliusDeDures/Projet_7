import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import {
  CréerLikeCommentaire,
  SupprimerLikeCommentaire,
  ModifNbrLikeCommentaire,
  AfficheCommentaire,
} from './Requete'
import '../styles/LikeCommentaire.css'

library.add(faThumbsUp)

function LikeCommentaire({ dataCom, setDataCommentaire }) {
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

  const [dataLikeCommentaire, setDataLikeCommentaire] = useState(false)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/likes/likeCommentaire/`)
      .then((res) => res.json())
      .then((data) => {
        for (let dataLike of data) {
          if (
            dataLike.idCommentaire === dataCom.id &&
            dataLike.userPseudo === userPseudo
          )
            setDataLikeCommentaire(true)
        }
      })
  }, [dataCom.id, userPseudo])

  async function LikeCommentaire() {
    const data = {
      idCommentaire: dataCom.id,
      nbrLikeCommentaire: dataCom.likes,
      likeCommentaire: true,
    }
    await CréerLikeCommentaire(data, token)
    AfficheCommentaire(setDataCommentaire)
  }

  async function supLikeCommentaire() {
    SupprimerLikeCommentaire(dataCom, token)
    const data = {
      idCommentaire: dataCom.id,
      nbrLikeCommentaire: dataCom.likes,
    }
    ModifNbrLikeCommentaire(data)
    alert('Commentaire disliké')
    AfficheCommentaire(setDataCommentaire)
  }

  return (
    <div className="all-like-commentaire">
      {dataLikeCommentaire === false && (
        <button className="like-commentaire" title="Liker le commentaire">
          <FontAwesomeIcon
            title="liker le commentaire"
            icon="fa-solid fa-thumbs-up"
            className="like-commentaire-icon"
            onClick={() => {
              LikeCommentaire()
              setDataLikeCommentaire(!dataLikeCommentaire)
            }}
          />
        </button>
      )}
      {dataLikeCommentaire === true && (
        <button className="dislike-commentaire" title="disliker le commentaire">
          <FontAwesomeIcon
            title="disliker le commentaire"
            icon="fa-solid fa-thumbs-up"
            className="dislike-commentaire-icon"
            onClick={() => {
              supLikeCommentaire()
              setDataLikeCommentaire(!dataLikeCommentaire)
            }}
          />
        </button>
      )}
    </div>
  )
}
export default LikeCommentaire
