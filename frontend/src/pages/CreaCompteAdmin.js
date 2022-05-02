import logo from '../assets/icon-left-font-rogner.png'
import '../styles/CreaCompteAdmin.css'
import React, { useState } from 'react'
import axios from 'axios'

function Inscription() {
  const [email, setEmail] = useState()
  const [pseudo, setPseudo] = useState()
  const [password, setPassword] = useState()
  const [isAdmin, setIsAdmin] = useState(false)

  function validationMail(email) {
    if (email.includes('@')) {
      setEmail(email)
      return email
    } else {
      alert("L'email saisie est incorrecte !")
    }
  }

  function Login() {
    if (isAdmin === true) {
      const user = {
        email: validationMail(email),
        pseudo: pseudo,
        password: password,
        isAdmin: true,
      }
      axios
        .post(`http://127.0.0.1:8000/api/auth/signup`, user)
        .then((res) => {
          console.log(
            email,
            pseudo,
            password,
            user.isAdmin
          )((window.location.href = './'))
        })
        .catch(() => alert('les informations saisies sont incorrectes'))
    } else {
      const user = {
        email: validationMail(email),
        pseudo: pseudo,
        password: password,
        isAdmin: false,
      }
      axios
        .post(`http://127.0.0.1:8000/api/auth/signup`, user)
        .then((res) => {
          console.log(
            email,
            pseudo,
            password,
            user.isAdmin
          )((window.location.href = './'))
        })
        .catch(() => alert('les informations saisies sont incorrectes'))
    }
  }

  return (
    <div className="cca-group-inscription">
      <div className="cca-group-header">
        <img src={logo} alt="logo-groupomania" className="cca-group-logo" />
      </div>
      <div className="cca-group-form">
        <form className="cca-form-signUp">
          <p className="cca-form-title">Créer un compte :</p>
          <label htmlFor="text" className="cca-label-email">
            Votre adresse email :
          </label>
          <input
            type="email"
            className="cca-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="text" className="cca-label-pseudo">
            Votre pseudo :
          </label>
          <input
            type="text"
            className="cca-pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          <span className="cca-info-pseudo">
            Votre pseudo doit contenir au moin 3 caractères.
          </span>
          <label htmlFor="email" className="cca-label-password">
            Votre password :
          </label>
          <input
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
            <label className="cca-info-compteAdmin">
              Compte administrateur :{' '}
            </label>
            <input
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
              Login()
            }}
          >
            Créer le compte
          </button>
          <button
            className="cca-form-retour"
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
