import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Inscription.css'
import React, { useState } from 'react'
import axios from 'axios'

function Inscription() {
  const [email, setEmail] = useState()
  const [pseudo, setPseudo] = useState()
  const [password, setPassword] = useState()

  function validationMail(email) {
    if (email.includes('@')) {
      setEmail(email)
      return email
    } else {
      alert("L'email saisie est incorrecte !")
    }
  }

  function Login() {
    const user = {
      email: validationMail(email),
      pseudo: pseudo,
      password: password,
    }
    axios
      .post(`http://127.0.0.1:8000/api/auth/signup`, user)
      .then((res) => {
        console.log(email, pseudo, password)((window.location.href = './'))
      })
      .catch(() => alert('les informations saisies sont incorrectes'))
  }

  return (
    <div className="ins-group-inscription">
      <div className="ins-group-header">
        <img src={logo} alt="logo-groupomania" className="ins-group-logo" />
      </div>
      <div className="ins-group-form">
        <form className="ins-form-signUp">
          <p className="ins-form-title">Créer un compte :</p>
          <label htmlFor="text" className="ins-label-email">
            Votre adresse email :
          </label>
          <input
            type="email"
            className="ins-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="text" className="ins-label-pseudo">
            Votre pseudo :
          </label>
          <input
            type="text"
            className="ins-pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          <span className="ins-info-pseudo">
            Votre pseudo doit contenir au moin 3 caractères.
          </span>
          <label htmlFor="email" className="ins-label-password">
            Votre password :
          </label>
          <input
            type="password"
            className="ins-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span className="ins-info-password">
            Votre mot de passe doit contenir au moin 5 caractères
            <br /> dont 1 majuscule, 1 minuscule et 1 chiffre.
          </span>
          <button
            className="ins-form-send"
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              Login()
            }}
          >
            Créer le compte
          </button>
          <button
            className="ins-form-retour"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = './'
            }}
          >
            Retour
          </button>
        </form>
      </div>
    </div>
  )
}

export default Inscription
