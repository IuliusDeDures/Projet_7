import logo from '../assets/icon-left-font-rogner.png'
import '../styles/SupprimerCompte.css'
import axios from 'axios'
import { useState } from 'react'

function SupprimerCompte() {
  const [email, setEmail] = useState()
  const [pseudo, setPseudo] = useState()
  const [password, setPassword] = useState()

  function Delete() {
    axios
      .delete(`http://127.0.0.1:8000/api/auth/${email}`)
      .then((res) => {
        alert('Utilisateur ' + pseudo + ' supprimé')
        window.location.href = '/'
      })
      .catch(() => alert('les informations saisies sont incorrectes'))
  }

  return (
    <div className="sup-group-suppression">
      <div className="sup-group-header">
        <img src={logo} alt="logo-groupomania" className="sup-group-logo" />
      </div>
      <div className="sup-group-form">
        <form className="sup-form-deleteUser">
          <p className="sup-form-title">Supprimer un compte :</p>
          <label for="text" className="sup-label-email">
            Votre adresse email :{' '}
          </label>
          <input
            type="text"
            className="sup-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label for="text" className="sup-label-pseudo">
            Votre pseudo :{' '}
          </label>
          <input
            type="text"
            className="sup-pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            required
          />
          <label for="email" className="sup-label-password">
            Votre password :{' '}
          </label>
          <input
            type="password"
            className="sup-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            className="sup-form-send"
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              Delete()
            }}
          >
            Supprimer le compte
          </button>
        </form>
      </div>
    </div>
  )
}

export default SupprimerCompte
