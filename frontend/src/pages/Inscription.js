import logo from '../assets/icon-left-font-monochrome-black_rogner.png'
import '../styles/Inscription.css'
import React, { useState } from 'react'
import { UserSignup } from '../components/utils/RequeteUser'

/**
 * fonction pour s'inscrire au site
 * @returns page d'insription
 */
function Inscription() {
  const [email, setEmail] = useState()
  const [pseudo, setPseudo] = useState()
  const [password, setPassword] = useState()

  /**
   * fonction pour la validation de l'email de l'utilisateur
   * @param {string} email - email de l'utlisateur
   * @returns - message d'erreur
   */
  function validationMail(email) {
    if (email.includes('@')) {
      setEmail(email)
      return email
    } else {
      alert("L'email saisie est incorrecte !")
    }
  }
  /**
   * fonction pour s'inscrire sur le site
   */
  function Login() {
    const user = {
      email: validationMail(email),
      pseudo: pseudo,
      password: password,
    }
    UserSignup(user)
  }

  return (
    <div className="ins-group-inscription">
      <div className="ins-group-header">
        <img src={logo} alt="logo-groupomania" className="ins-group-logo" />
        <h1 className="ins-group-titre">Groupomania</h1>
      </div>
      <div className="ins-group-form">
        <form className="ins-form-signUp">
          <h2 className="ins-form-title">Créer un compte :</h2>
          <label htmlFor="email" className="ins-label-email">
            Votre adresse email :{}
          </label>
          <input
            id="email"
            className="ins-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="pseudo" className="ins-label-pseudo">
            Votre pseudo :{}
          </label>
          <input
            id="pseudo"
            type="text"
            className="ins-pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          <span className="ins-info-pseudo">
            Votre pseudo doit contenir au moin 3 caractères.
          </span>
          <label htmlFor="password" className="ins-label-password">
            Votre password :{}
          </label>
          <input
            id="password"
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
