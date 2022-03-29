import '../styles/SectionMessage.css'
import '../styles/Footer.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { PublieMessage, AfficheMessages } from './Requete'

library.add(faThumbsUp, faImage)

library.add(faThumbsUp)

function AllMessage() {
  let url = new URL(window.location.href)
  let search_parms = new URLSearchParams(url.search)
  let userPseudoBearer = ''
  let token = ''
  let useurPseudo = ''
  if (search_parms.has('userPseudo')) {
    userPseudoBearer = search_parms.get('userPseudo')
    token = userPseudoBearer.split('Bearer')[1]
    useurPseudo = userPseudoBearer.split('Bearer')[0]
  }

  const [dataMessage, setDataMessages] = useState([])
  const [text, setText] = useState('')
  const [image, setImage] = useState()
  const [file, setFile] = useState()

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

  return (
    <div className="sectionMessage">
      <div className="allMessages">
        {dataMessage.map((info) => (
          <div key={info.id}>
            <p className="message-pseudoUser">{info.userPseudo}</p>
            <div className="message">
              <p className="message-contenu">
                {info.text}
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-up"
                  className="icon-like"
                />
              </p>
            </div>
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
                <p className="p-contenu">{useurPseudo}</p>
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

export default AllMessage
