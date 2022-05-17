import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import {
  AfficheLikeCommentaire,
  CréerLikeCommentaire,
  SupprimerLikeCommentaire,
  ModifNbrLikeCommentaire,
  AfficheCommentaire,
} from './utils/Requete'
import '../styles/LikeCommentaire.css'

// ajout des différents icons
library.add(faThumbsUp)

// fonction principal des likes commentaires
function LikeCommentaire({ dataCom, setDataCommentaire }) {
  // recupération du token, isAdmin et de user pseudo
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
    AfficheLikeCommentaire(dataCom, userPseudo, setDataLikeCommentaire)
  }, [dataCom, userPseudo])

  // fonction pour liker un commentaire et mettre à jour le DOM
  async function LikeCommentaire() {
    const data = {
      idCommentaire: dataCom.id,
      nbrLikeCommentaire: dataCom.likes,
      likeCommentaire: true,
    }
    await CréerLikeCommentaire(data, token)
    AfficheCommentaire(setDataCommentaire)
  }

  // fonction pour supprimer un like de commentaire et mettre à jour le DOM
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
