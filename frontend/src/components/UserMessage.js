import '../styles/Message.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import {
  AfficheMessages,
  SupprimerMessage,
  SelectUnMessage,
  SupprimerMessageAdmin,
  PublieMessage,
} from './utils/RequeteMessage'
import Commentaire from './Commentaire'
import LikeMessage from './LikeMessage'
import { dateParserMessage } from './utils/DateParser'

library.add(faThumbsUp, faImage, faComment, faTrashCan, faComments, faHouse)

/**
 * fonction principal des messages
 * @returns - les messages
 */
function SectionMessage() {
  /**
   * recupération du token, isAdmin et de user pseudo
   */
  let url = new URL(window.location.href)
  let search_parms = new URLSearchParams(url.search)
  let userPseudoIsAdminBearerSelectUser = ''
  let tokenSelectUser = ''
  let token = ''
  let selectUser = ''
  let userPseudo = ''
  let isAdmin = ''
  let userPseudoIsAdmin = ''
  if (search_parms.has('userPseudo')) {
    userPseudoIsAdminBearerSelectUser = search_parms.get('userPseudo')
    tokenSelectUser = userPseudoIsAdminBearerSelectUser.split('Bearer')[1]
    token = tokenSelectUser.split('selectUser')[0]
    selectUser = tokenSelectUser.split('selectUser')[1]
    userPseudoIsAdmin = userPseudoIsAdminBearerSelectUser.split('Bearer')[0]
    isAdmin = userPseudoIsAdmin.split('isAdmin')[1]
    userPseudo = userPseudoIsAdmin.split('isAdmin')[0]
  }
  const [dataMessage, setDataMessages] = useState([])
  const [afficheCommentaire, setAfficheCommentaire] = useState(false)

  useEffect(() => {
    AfficheMessages(setDataMessages)
  }, [])

  /**
   * fonction pour supprimer un message et mettre à jour le DOM
   * @param {string} dataMess - information message
   */
  function supMessage(dataMess) {
    if (isAdmin === 'true') {
      SupprimerMessageAdmin(dataMess, token)
    } else {
      SupprimerMessage(dataMess, token)
    }
    alert('Message supprimé')
    AfficheMessages(setDataMessages)
  }

  /**
   * fonction pour selectionner un message
   * @param {string} dataMess - information message
   */
  function selectMessage(dataMess) {
    SelectUnMessage(setAfficheCommentaire, dataMess)
  }

  /**
   * fontion pour partager un message
   * @param {*} dataMess - information message
   */
  async function partageMessage(dataMess) {
    const data = new FormData()
    data.append('text', dataMess.text)
    data.append('userPartage', dataMess.userPseudo)
    data.append('datePartage', dateParserMessage(dataMess.createdAt))
    if (dataMess.file) data.append('file', dataMess.file)
    await PublieMessage(data, token)
    AfficheMessages(setDataMessages)
  }

  /**
   * fonction pour retourner sur la page qui affiche l'ensemble des messages
   */
  function Forum() {
    window.location.href =
      './message?userPseudo=' +
      userPseudo +
      'isAdmin' +
      isAdmin +
      'Bearer' +
      token
  }

  return (
    <div className="sectionMessage">
      <div className="retour-allMessage">
        <button
          className="bouton-retour-allMessage"
          title="Retour à l'afficher des messages de tous les utilisateurs"
          onClick={(e) => {
            e.preventDefault()
            Forum()
          }}
        >
          <FontAwesomeIcon
            className="icon-bouton-retour-allMessage"
            icon="fa-solid fa-house"
          />
        </button>
      </div>
      <div className="allMessages">
        {dataMessage.map((dataMess) => (
          <div className="selectUser" key={dataMess.id}>
            {selectUser === dataMess.userPseudo ? (
              <div className="messagePlusCommentaire">
                <div className="message-header">
                  <div className="message-pseudoUser">
                    {dataMess.userPseudo}
                  </div>
                  {dataMess.userPartage !== null &&
                  dataMess.datePartage !== null ? (
                    <p className="message-date">
                      Partagé le {dateParserMessage(dataMess.createdAt)}
                    </p>
                  ) : (
                    <p className="message-date">
                      Publié le {dateParserMessage(dataMess.createdAt)}
                    </p>
                  )}
                </div>
                {dataMess.userPartage !== null &&
                dataMess.datePartage !== null ? (
                  <div className="message-partage">
                    <span className="message-userPartage">
                      {dataMess.userPartage}
                    </span>
                    <span className="message-datePartage">
                      Publié le {dataMess.datePartage}
                    </span>
                  </div>
                ) : null}
                <div className="message">
                  <p className="message-contenu">{dataMess.text}</p>
                  {dataMess.file && (
                    <div className="message-conteneur-image">
                      <img
                        className="message-image"
                        src={dataMess.file}
                        alt="fichier_image"
                      />
                    </div>
                  )}
                  <div className="message-boutton">
                    {isAdmin === 'true' ||
                    userPseudo === dataMess.userPseudo ? (
                      <button
                        className="sup-message"
                        title="Supprimer le message"
                        onClick={(e) => {
                          e.preventDefault()
                          supMessage(dataMess)
                        }}
                      >
                        <FontAwesomeIcon
                          className="sup-message-icon"
                          icon="fa-regular fa-trash-can"
                        />
                      </button>
                    ) : null}
                    {!afficheCommentaire ? (
                      <button
                        className="com-boutton"
                        title="Afficher les commentaires"
                      >
                        <FontAwesomeIcon
                          className="icon-commentaire"
                          icon="fa-regular fa-comment"
                          onClick={() => {
                            selectMessage(dataMess)
                          }}
                        />
                      </button>
                    ) : null}
                    {afficheCommentaire ? (
                      <button
                        className="com-boutton"
                        title="Ne plus afficher les commentaires"
                      >
                        <FontAwesomeIcon
                          className="icon-commentaire"
                          icon="fa-regular fa-comment"
                          onClick={() => {
                            setAfficheCommentaire(!afficheCommentaire)
                          }}
                        />
                      </button>
                    ) : null}
                    <div className="message-nbrCommentaire">
                      <p className="nbrCommentaire">
                        {dataMess.nbrCommentaire}
                      </p>
                    </div>
                    <div
                      className="message-icon-nbrRepCommentaire"
                      title="Réponses de commentaires"
                    >
                      <FontAwesomeIcon
                        icon="fa-regular fa-comments"
                        className="icon-nbrRepCommentaire"
                      />
                    </div>
                    <div className="message-nbrRepCommentaire">
                      <p className="nbrRepCommentaire">
                        {dataMess.nbrRepCommentaire}
                      </p>
                    </div>
                    <LikeMessage
                      dataMess={dataMess}
                      setDataMessages={setDataMessages}
                    />
                    <div className="message-nbrLikes">
                      <p className="nbrLikes">{dataMess.likes}</p>
                    </div>
                    <button
                      className="partage-message"
                      title="Partager ce message"
                      onClick={(e) => {
                        e.preventDefault()
                        partageMessage(dataMess)
                      }}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-share"
                        className="icon-partage-message"
                      />
                    </button>
                  </div>
                </div>
                {afficheCommentaire === dataMess.id && (
                  <Commentaire
                    dataMess={dataMess}
                    setDataMessages={setDataMessages}
                  />
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionMessage
