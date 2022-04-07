import '../styles/SectionMessage.css'
import '../styles/Footer.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import {
  PublieMessage,
  AfficheMessages,
  SupprimerMessage,
  SelectUnMessage,
} from './Requete'
import Commentaire from './Commentaire'

library.add(faThumbsUp, faImage, faComment, faTrashCan)

function SectionMessage() {
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

  const [dataMessage, setDataMessages] = useState([])
  const [text, setText] = useState('')
  const [image, setImage] = useState()
  const [file, setFile] = useState()
  const [afficheCommentaire, setAfficheCommentaire] = useState(false)

  useEffect(() => {
    AfficheMessages(setDataMessages)
  }, [])

  async function publier() {
    if (text || image) {
      const data = new FormData()
      data.append('text', text)
      if (file) data.append('imageUrl', file)

      await PublieMessage(data, token)
      AfficheMessages(setDataMessages)
      annuler()
    } else {
      alert('Veuillez entrer un message')
    }
  }

  function handlePicture(e) {
    setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  function annuler() {
    setText('')
    setImage('')
    setFile('')
  }

  function supMessage(info) {
    SupprimerMessage(info, token)
    alert('Message suprimé')
    AfficheMessages(setDataMessages)
  }
  function selectMessage(info) {
    SelectUnMessage(setAfficheCommentaire, info)
    setAfficheCommentaire(!afficheCommentaire)
  }

  return (
    <div className="sectionMessage">
      <div className="allMessages">
        {dataMessage.map((info) => (
          <div key={info.id} className="messagePlusCommentaire">
            <p className="message-pseudoUser">{info.userPseudo}</p>
            <div className="message">
              <p className="message-contenu">{info.text}</p>
              <div className="message-boutton">
                {userPseudo === info.userPseudo ? (
                  <button
                    className="sup-message"
                    title="Supprimer le message"
                    onClick={(e) => {
                      e.preventDefault()
                      supMessage(info)
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
                        selectMessage(info)
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
                <button className="like-message" title="Liker le message">
                  <FontAwesomeIcon
                    icon="fa-solid fa-thumbs-up"
                    className="like-message-icon"
                  />
                </button>
              </div>
            </div>
            {afficheCommentaire === info.id && <Commentaire info={info} />}
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
              accept=".jpg, .jpeg, .png, .mp4"
              onChange={(e) => handlePicture(e)}
              value={image}
              title="Ajouter une image ou une vidéo"
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
