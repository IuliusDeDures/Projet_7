import React, { useState, useEffect } from 'react'
import {
  AfficheRepCommentaire,
  PublieRepCommentaire,
  SupprimerRepCommentaire,
  ModifNbrRepCommentaire,
  SupprimerRepCommentaireAdmin,
} from './utils/RequeteRepCommentaire'
import { AfficheMessages } from './utils/RequeteMessage'
import { AfficheCommentaire } from './utils/RequeteCommmentaire'
import { dateParserCommentaire } from './utils/DateParser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '../styles/RepCommentaire.css'

library.add(faTrashCan)

/**
 * // fonction principal des réponses de commentaire
 * @param {Object} dataMess - information message
 * @param {Object} setDataMessages - state message
 * @param {Object} setDataCommentaire - state commentaire
 * @param {Object} dataCom - information commentaire
 * @returns - les réponses de commentaire
 */
function RepCommentaire({
  dataMess,
  setDataMessages,
  setDataCommentaire,
  dataCom,
}) {
  /**
   * recupération du token, isAdmin et de user pseudo
   */
  let url = new URL(window.location.href)
  let search_parms = new URLSearchParams(url.search)
  let userPseudoIsAdminBearer = ''
  let token = ''
  let tokenSelectUser = ''
  let userPseudo = ''
  let isAdmin = ''
  let userPseudoIsAdmin = ''
  if (search_parms.has('userPseudo')) {
    userPseudoIsAdminBearer = search_parms.get('userPseudo')
    tokenSelectUser = userPseudoIsAdminBearer.split('Bearer')[1]
    token = tokenSelectUser.split('selectUser')[0]
    userPseudoIsAdmin = userPseudoIsAdminBearer.split('Bearer')[0]
    isAdmin = userPseudoIsAdmin.split('isAdmin')[1]
    userPseudo = userPseudoIsAdmin.split('isAdmin')[0]
  }

  const [dataRepCommentaire, setDataRepCommentaire] = useState([])
  const [repCommentaire, setRepCommentaire] = useState('')

  useEffect(() => {
    AfficheRepCommentaire(setDataRepCommentaire)
  }, [])

  /**
   * fonction pour créer une reponse de commentaire et mettre à jour le DOM
   */
  async function Repondre() {
    if (repCommentaire) {
      const data = {
        idMessage: dataMess.id,
        idCommentaire: dataCom.id,
        repCommentaire: repCommentaire,
        nbrRepCommentaire: dataMess.nbrRepCommentaire,
        nbrRepCommentaireCom: dataCom.nbrRepCommentaireCom,
      }
      await PublieRepCommentaire(data, token)

      AfficheRepCommentaire(setDataRepCommentaire)
      annuler()
      AfficheMessages(setDataMessages)
      AfficheCommentaire(setDataCommentaire)
    } else {
      alert('Veuillez entrer un commentaire ')
    }
  }
  /**
   * fonction pour supprimer une reponse de commentaire et mettre à jour le DOM
   * @param {string} dataRepCom - information réponse de commentaire
   */
  function supRepCommentaire(dataRepCom) {
    if (isAdmin === 'true') {
      SupprimerRepCommentaireAdmin(dataRepCom, token)
    } else {
      SupprimerRepCommentaire(dataRepCom, token)
    }
    const data = {
      idMessage: dataMess.id,
      nbrRepCommentaire: dataMess.nbrRepCommentaire,
      idCommentaire: dataCom.id,
      nbrRepCommentaireCom: dataCom.nbrRepCommentaireCom,
    }
    ModifNbrRepCommentaire(data)
    alert('Réponse de commentaire supprimé !')
    AfficheRepCommentaire(setDataRepCommentaire)
    AfficheMessages(setDataMessages)
    AfficheCommentaire(setDataCommentaire)
  }

  /**
   *  fonction pour et mettre à jour le State
   */
  function annuler() {
    setRepCommentaire('')
  }

  return (
    <div className="repCommentairesPlusForm">
      <div className="allRepCommentaires">
        {dataRepCommentaire.map((dataRepCom) => (
          <div key={dataRepCom.id}>
            {dataRepCom.idCommentaire === dataCom.id ? (
              <div className="repCommentaire">
                <div className="repCommentaire-header">
                  <p className="repCommentaire-pseudoUser">
                    {dataRepCom.userPseudo} :
                  </p>
                  <p className="repCommentaire-date">
                    {dateParserCommentaire(dataRepCom.createdAt)}
                  </p>
                </div>
                <p className="repCommentaire-contenu">
                  {dataRepCom.repCommentaire}
                </p>
                <div className="repCommentaire-boutton">
                  {isAdmin === 'true' ||
                  userPseudo === dataRepCom.userPseudo ? (
                    <button
                      className="sup-repCommentaire"
                      title="Supprimer la réponse de commentaire"
                      onClick={(e) => {
                        e.preventDefault()
                        supRepCommentaire(dataRepCom)
                      }}
                    >
                      <FontAwesomeIcon
                        className="sup-repCommentaire-icon"
                        icon="fa-regular fa-trash-can"
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <form className="form-repCommentaire">
        <input
          type="text"
          className="nouveau-repCommentaire"
          value={repCommentaire}
          placeholder="Votre réponse..."
          onChange={(e) => setRepCommentaire(e.target.value)}
        />
        <button
          className="envoie-nouveau-repCommentaire"
          onClick={(e) => {
            e.preventDefault()
            Repondre()
          }}
        >
          Envoyer
        </button>
      </form>
    </div>
  )
}

export default RepCommentaire
