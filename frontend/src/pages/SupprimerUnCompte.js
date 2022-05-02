import logo from '../assets/icon-left-font-rogner.png'
import '../styles/SupprimerUnCompte.css'
import axios from 'axios'
import { useState } from 'react'

function SupprimerUnCompte() {
  const [pseudo, setPseudo] = useState('')

  function Delete() {
    axios
      .delete(`http://127.0.0.1:8000/api/auth/deleteOne/${pseudo}`)
      .then((res) => {
        alert('Utilisateur supprimé')
        window.location.href = '/'
      })
      .catch(() => alert('les informations saisies sont incorrectes'))
  }

  return (
    <div className="sup-admin-group-suppression">
      <div className="sup-admin-group-header">
        <img
          src={logo}
          alt="logo-groupomania"
          className="sup-admin-group-logo"
        />
      </div>
      <div className="sup-admin-group-form">
        <form className="sup-admin-form-deleteUser">
          <p className="sup-admin-form-title">Supprimer un compte :</p>
          <label htmlFor="text" className="sup-admin-label-pseudo">
            Saisissez le pseudo du compte à supprimer :{' '}
          </label>
          <input
            type="text"
            className="sup-admin-pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            required
          />
          <button
            className="sup-admin-form-send"
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              Delete()
            }}
          >
            Supprimer le compte
          </button>
          <button
            className="sup-admin-form-retour"
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

export default SupprimerUnCompte
