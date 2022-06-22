import logo from '../assets/icon-left-font-monochrome-black_rogner.png'
import '../styles/CreaCompteAdmin.css'
import React, { useState } from 'react'
import { UserSignup } from '../components/utils/RequeteUser'

/**
 * fonction pour l'inscription au site pour l'administrateur
 * @returns - la page d'inscription au site pour l'administrateur
 */
function Inscription() {
  const [email, setEmail] = useState()
  const [pseudo, setPseudo] = useState()
  const [password, setPassword] = useState()
  const [isAdmin, setIsAdmin] = useState(false)

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
  function Signup() {
    if (isAdmin === true) {
      const user = {
        email: validationMail(email),
        pseudo: pseudo,
        password: password,
        isAdmin: true,
      }
      UserSignup(user)
    } else {
      const user = {
        email: validationMail(email),
        pseudo: pseudo,
        password: password,
        isAdmin: false,
      }
      UserSignup(user)
    }
  }

  return (
    <div className="cca-group-inscription">
      <div className="cca-group-header">
        <img src={logo} alt="logo-groupomania" className="cca-group-logo" />
        <h1 className="cca-group-titre">Groupomania</h1>
      </div>
      <div className="cca-group-info">
        <p className="cca-info">Bienvenue !</p>
      </div>
      <div className="cca-group-form">
        <form className="cca-form-signUp">
          <h2 className="cca-form-title">Créer un compte :</h2>
          <label htmlFor="email" className="cca-label-email">
            Votre adresse email :{}
          </label>
          <input
            id="email"
            type="email"
            className="cca-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="pseudo" className="cca-label-pseudo">
            Votre pseudo :{}
          </label>
          <input
            id="pseudo"
            type="text"
            className="cca-pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          <span className="cca-info-pseudo">
            Votre pseudo doit contenir au moin 3 caractères.
          </span>
          <label htmlFor="password" className="cca-label-password">
            Votre password :{}
          </label>
          <input
            id="password"
            type="password"
            className="cca-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span className="cca-info-password">
            Votre mot de passe doit contenir au moin 5 caractères
            <br /> dont 1 majuscule, 1 minuscule et 1 chiffre.
          </span>
          <div>
            <label htmlFor="compteAdmin" className="cca-info-compteAdmin">
              Compte administrateur :{' '}
            </label>
            <input
              id="compteAdmin"
              className="isAdmin"
              type="checkbox"
              onChange={() => setIsAdmin(!isAdmin)}
            />
          </div>
          <button
            className="cca-form-send"
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              Signup()
            }}
          >
            Créer le compte
          </button>
          <button
            className="cca-form-retour"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = './'
              sessionStorage.removeItem('infoUser')
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  )
}

export default Inscription
