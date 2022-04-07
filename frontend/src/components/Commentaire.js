import React, { useState, useEffect } from 'react'
import {
  AfficheCommentaire,
  PublieCommentaire,
  SupprimerCommentaire,
} from './Requete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '../styles/Commentaire.css'

library.add(faThumbsUp, faComment, faTrashCan)

function Commentaire({ info }) {
  let url = new URL(window.location.href)
  let search_parms = new URLSearchParams(url.search)
  let userPseudoBearer = ''
  let token = ''
  let userPseudo = ''

  if (search_parms.has('userPseudo')) {
    userPseudoBearer = search_parms.get('userPseudo')
    token = userPseudoBearer.split('Bearer')[1]
    userPseudo = userPseudoBearer.split('Bearer')[0]
  }

  const [dataCommentaire, setDataCommentaire] = useState([])
  const [commentaire, setCommentaire] = useState('')

  useEffect(() => {
    AfficheCommentaire(setDataCommentaire)
  }, [])

  async function Commenter() {
    if (commentaire) {
      const data = { idMessage: info.id, commentaire: commentaire }
      await PublieCommentaire(data, token)
      console.log(info.id, commentaire)
      AfficheCommentaire(setDataCommentaire)
      annuler()
    } else {
      alert('Veuillez entrer un commentaire ')
    }
  }

  function supCommentaire(dataCom) {
    SupprimerCommentaire(dataCom, token)
    alert('Commentaire supprimé !')
    AfficheCommentaire(setDataCommentaire)
  }

  function annuler() {
    setCommentaire('')
  }

  return (
    <div className="commentairesPlusForm">
      <div className="allCommentaires">
        {dataCommentaire.map((dataCom) => (
          <div key={dataCom.id}>
            {dataCom.idMessage === info.id ? (
              <div className="commentaire">
                <p className="commentaire-pseudoUser">{dataCom.userPseudo} :</p>
                <p className="commentaire-contenu">{dataCom.commentaire}</p>
                <div className="commentaire-boutton">
                  {userPseudo === dataCom.userPseudo ? (
                    <button
                      className="sup-commentaire"
                      title="Supprimer le commentaire"
                      onClick={(e) => {
                        e.preventDefault()
                        supCommentaire(dataCom)
                      }}
                    >
                      <FontAwesomeIcon
                        className="sup-commentaire-icon"
                        icon="fa-regular fa-trash-can"
                      />
                    </button>
                  ) : null}
                  <button
                    className="like-commentaire"
                    title="Liker le commentaire"
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-thumbs-up"
                      className="like-commentaire-icon"
                    />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <form className="form-commentaire">
        <input
          type="text"
          className="nouveau-commentaire"
          value={commentaire}
          placeholder="Votre commentaire..."
          onChange={(e) => setCommentaire(e.target.value)}
        />
        <button
          className="envoie-nouveau-commentaire"
          onClick={(e) => {
            e.preventDefault()
            Commenter()
          }}
        >
          Envoyer
        </button>
      </form>
    </div>
  )
}

export default Commentaire
