import React, { useState, useEffect } from 'react'
import {
  AfficheCommentaire,
  PublieCommentaire,
  SupprimerCommentaire,
  AfficheMessages,
  ModifNbrCommentaire,
  SelectUnCommentaire,
  SupprimerCommentaireAdmin,
} from './utils/Requete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '../styles/Commentaire.css'
import RepCommentaire from './RepCommentaire'
import LikeCommentaire from './LikeCommentaire'
import { dateParser } from './utils/DateParser'

library.add(faThumbsUp, faComment, faTrashCan)

/**
 * fonction principal des commentaires
 * @param {Object} dataMess - information message
 * @param {Object} setDataMessages - state message
 * @returns - les commentaires
 */
function Commentaire({ dataMess, setDataMessages }) {
  /**
   * recupération du token, d'isAdmin et du user pseudo
   */
  let url = new URL(window.location.href)
  let search_parms = new URLSearchParams(url.search)
  let userPseudoIsAdminBearer = ''
  let token = ''
  let userPseudo = ''
  let isAdmin = ''
  let userPseudoIsAdmin = ''
  if (search_parms.has('userPseudo')) {
    userPseudoIsAdminBearer = search_parms.get('userPseudo')
    token = userPseudoIsAdminBearer.split('Bearer')[1]
    userPseudoIsAdmin = userPseudoIsAdminBearer.split('Bearer')[0]
    isAdmin = userPseudoIsAdmin.split('isAdmin')[1]
    userPseudo = userPseudoIsAdmin.split('isAdmin')[0]
  }

  const [dataCommentaire, setDataCommentaire] = useState([])
  const [commentaire, setCommentaire] = useState('')
  const [afficheReponse, setAfficheReponse] = useState(false)

  useEffect(() => {
    AfficheCommentaire(setDataCommentaire)
  }, [])

  /**
   * fonction pour créer un nouveau commentaire et mettre à jour le DOM
   */
  async function Commenter() {
    if (commentaire) {
      const data = {
        idMessage: dataMess.id,
        commentaire: commentaire,
        nbrCommentaire: dataMess.nbrCommentaire,
      }
      await PublieCommentaire(data, token)

      AfficheCommentaire(setDataCommentaire)
      annuler()
      AfficheMessages(setDataMessages)
    } else {
      alert('Veuillez entrer un commentaire ')
    }
  }
  /**
   * fonction pour supprimer un commentaire et mettre à jour le DOM
   * @param {string} dataCom - information commentaire
   */
  function supCommentaire(dataCom) {
    if (dataCom.nbrRepCommentaireCom === 0) {
      if (isAdmin === 'true') {
        SupprimerCommentaireAdmin(dataCom, token)
      } else {
        SupprimerCommentaire(dataCom, token)
      }
      const data = {
        idMessage: dataMess.id,
        nbrCommentaire: dataMess.nbrCommentaire,
      }
      ModifNbrCommentaire(data)

      alert('Commentaire supprimé !')
      AfficheCommentaire(setDataCommentaire)
      AfficheMessages(setDataMessages)
    } else {
      alert(
        'Ce commentaire ne peut être supprimer car il ya des reponses à ce commentaire. Supprimer les réponses pour supprimer le commentaire'
      )
    }
  }
  /**
   * fonction pour et mettre à jour le State
   */
  function annuler() {
    setCommentaire('')
  }
  /**
   * fonction pour selectionner un commentaire
   * @param {string} dataCom - information commentaire
   */
  function selectCommentaire(dataCom) {
    SelectUnCommentaire(setAfficheReponse, dataCom)
  }

  return (
    <div className="commentairesPlusForm">
      <div className="allCommentaires">
        <p className="titre-commentaire">Commentaire :</p>
        {dataCommentaire.map((dataCom) => (
          <div key={dataCom.id}>
            {dataCom.idMessage === dataMess.id ? (
              <div className="commentaire">
                <div className="commentaire-header">
                  <p className="commentaire-pseudoUser">
                    {dataCom.userPseudo} :
                  </p>
                  <p className="commentaire-date">
                    {dateParser(dataCom.createdAt)}
                  </p>
                </div>
                <p className="commentaire-contenu">{dataCom.commentaire}</p>
                <div className="commentaire-boutton">
                  {isAdmin === 'true' || userPseudo === dataCom.userPseudo ? (
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

                  {!afficheReponse ? (
                    <button
                      className="repondre-commentaire"
                      title="Répondre à ce commentaire"
                      onClick={() => {
                        selectCommentaire(dataCom)
                      }}
                    >
                      <FontAwesomeIcon
                        icon="fa-regular fa-comments"
                        className="icon-nbrRepCommentaire"
                      />
                    </button>
                  ) : (
                    <button
                      className="repondre-commentaire"
                      title="Ne pas répondre à ce commentaire"
                      onClick={() => {
                        setAfficheReponse(!afficheReponse)
                      }}
                    >
                      <FontAwesomeIcon
                        icon="fa-regular fa-comments"
                        className="icon-nbrRepCommentaireCom"
                      />
                    </button>
                  )}

                  <div className="message-nbrRepCommentaire">
                    <p className="nbrRepCommentaire">
                      {dataCom.nbrRepCommentaireCom}
                    </p>
                  </div>
                  <LikeCommentaire
                    dataCom={dataCom}
                    setDataCommentaire={setDataCommentaire}
                  />
                  <div className="message-nbrLikes">
                    <p className="nbrLikes">{dataCom.likes}</p>
                  </div>
                </div>
                {afficheReponse === dataCom.id && (
                  <RepCommentaire
                    dataMess={dataMess}
                    setDataMessages={setDataMessages}
                    dataCom={dataCom}
                    setDataCommentaire={setDataCommentaire}
                  />
                )}
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
