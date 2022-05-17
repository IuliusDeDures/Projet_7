import '../styles/Message.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import {
  PublieMessage,
  AfficheMessages,
  SupprimerMessage,
  SelectUnMessage,
} from './utils/Requete'
import Commentaire from './Commentaire'
import LikeMessage from './LikeMessage'
import { dateParser } from './utils/DateParser'

// ajout des différents icons
library.add(faThumbsUp, faImage, faComment, faTrashCan, faComments)

// fonction principal des messages
function SectionMessage() {
  // recupération du token, isAdmin et de user pseudo
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

  useEffect(() => {
    AfficheMessages(setDataMessages)
  }, [])

  // fonction pour créer un nouveau message et mettre à jour le DOM
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

  // fonction pour l'ajout d'image
  function handlePicture(e) {
    setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  // fonction pour et mettre à jour le State
  function annuler() {
    setText('')
    setImage('')
    setFile('')
  }

  // fonction pour supprimer un message et mettre à jour le DOM
  function supMessage(dataMess) {
    SupprimerMessage(dataMess, token)
    alert('Message suprimé')
    AfficheMessages(setDataMessages)
  }

  // fonction pour selectionner un message
  function selectMessage(dataMess) {
    SelectUnMessage(setAfficheCommentaire, dataMess)
  }

  return (
    <div className="sectionMessage">
      <div className="allMessages">
        {dataMessage.map((dataMess) => (
          <div key={dataMess.id} className="messagePlusCommentaire">
            <div className="message-header">
              <p className="message-pseudoUser">{dataMess.userPseudo}</p>
              <p className="message-date">{dateParser(dataMess.createdAt)}</p>
            </div>
            <div className="message">
              <p className="message-contenu">{dataMess.text}</p>
              {dataMess.file && (
                <img
                  className="message-image"
                  src={dataMess.file}
                  alt="fichier_image"
                />
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
      <div className="ajout-message">
        <form className="form-message">
          <textarea
            name="nouveau-message"
            className="nouveau-message"
            rows="2"
            cols="70"
            placeholder="Tapez votre message"
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
                <img src={image} alt=""></img>
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
    </div>
  )
}

export default SectionMessage
