import '../styles/Message.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import {
  PublieMessage,
  AfficheMessages,
  SupprimerMessage,
  SelectUnMessage,
  SupprimerMessageAdmin,
} from './utils/RequeteMessage'
import Commentaire from './Commentaire'
import LikeMessage from './LikeMessage'
import { dateParserMessage } from './utils/DateParser'

library.add(faThumbsUp, faImage, faComment, faTrashCan, faComments, faShare)

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
  const [dataMessage, setDataMessages] = useState([])
  const [text, setText] = useState('')
  const [image, setImage] = useState()
  const [file, setFile] = useState()
  const [afficheCommentaire, setAfficheCommentaire] = useState(false)

  let placeholderMessage = 'Quoi de neuf, ' + userPseudo + ' ?'

  useEffect(() => {
    AfficheMessages(setDataMessages)
  }, [])

  /**
   * fonction pour créer un nouveau message et mettre à jour le DOM
   */
  async function publier() {
    if (text || image) {
      const data = new FormData()
      data.append('text', text)
      if (file) data.append('file', file)

      await PublieMessage(data, token)
      AfficheMessages(setDataMessages)
      annuler()
    } else {
      alert('Veuillez entrer un message')
    }
  }

  /**
   * fonction pour l'ajout d'image
   * @param {*} e
   */
  function handlePicture(e) {
    setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  /**
   * fonction pour et mettre à jour le State
   */
  function annuler() {
    setText('')
    setImage('')
    setFile('')
  }

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
    alert('Message suprimé')
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
   * fonction pour aller sur la page qui affiche les message d'un utilisateur
   * @param {string} dataMess - information message
   */
  function userForum(dataMess) {
    window.location.href =
      './userMessage?userPseudo=' +
      userPseudo +
      'isAdmin' +
      isAdmin +
      'Bearer' +
      token +
      'selectUser' +
      dataMess.userPseudo
  }

  return (
    <div className="sectionMessage">
      <div className="ajout-message">
        <form className="form-message">
          <label htmlFor="nouveau-message" className="nouveau-message-label">
            ""
          </label>
          <textarea
            id="nouveau-message"
            className="nouveau-message"
            rows="2"
            cols="70"
            placeholder={placeholderMessage}
            onChange={(e) => setText(e.target.value)}
            value={text}
            required
          ></textarea>

          {text || image ? (
            <li className="contenu-message">
              <div className="contenu-header">
                <p className="p-contenu">{userPseudo}</p>
              </div>
              <div className="contenu">
                <p className="p-contenu">{text}</p>
                <img className="p-image" src={image} alt=""></img>
              </div>
            </li>
          ) : null}
          <div className="footer-nouveau-message">
            <FontAwesomeIcon
              icon="fa-regular fa-image"
              className="icon-photo"
            />
            <input
              className="ajout-photo-message"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
              title="Ajouter une image"
            />
            {text || image ? (
              <button className="annule-message" onClick={annuler}>
                Annuler
              </button>
            ) : null}
            <button
              className="envoie-message"
              onClick={(e) => {
                e.preventDefault()
                publier()
              }}
            >
              Publier
            </button>
          </div>
        </form>
      </div>
      <div className="allMessages">
        {dataMessage.map((dataMess) => (
          <div key={dataMess.id} className="messagePlusCommentaire">
            <div className="message-header">
              <button
                className="message-pseudoUser"
                title="Voir tous les messages de cet utilisateur"
                onClick={(e) => {
                  e.preventDefault()
                  userForum(dataMess)
                }}
              >
                {dataMess.userPseudo}
              </button>
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
            {dataMess.userPartage !== null && dataMess.datePartage !== null ? (
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
                {isAdmin === 'true' || userPseudo === dataMess.userPseudo ? (
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
                  <p className="nbrCommentaire">{dataMess.nbrCommentaire}</p>
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
        ))}
      </div>
    </div>
  )
}

export default SectionMessage
