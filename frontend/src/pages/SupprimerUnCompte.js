import logo from '../assets/icon-left-font-monochrome-black_rogner.png'
import '../styles/SupprimerUnCompte.css'
import { DeleteOneUser } from '../components/utils/RequeteUser'
import { useState } from 'react'

/**
 * fonction pour la page de suppression d'un compte utilisateur pour l'administrateur
 * @returns - la page de suppression d'un compte utilisateur pour l'administrateur
 */
function SupprimerUnCompte() {
  const [pseudo, setPseudo] = useState('')

  /**
   * fonction pour supprimer un compte utlisateur pour l'administrateur
   */
  function Delete() {
    DeleteOneUser(pseudo)
  }

  return (
    <div className="sup-admin-group-suppression">
      <div className="sup-admin-group-header">
        <img
          src={logo}
          alt="logo-groupomania"
          className="sup-admin-group-logo"
        />
        <h1 className="sup-admin-group-titre">Groupomania</h1>
      </div>
      <div className="sup-admin-group-form">
        <form className="sup-admin-form-deleteUser">
          <h2 className="sup-admin-form-title">Supprimer un compte :</h2>
          <label htmlFor="pseudo" className="sup-admin-label-pseudo">
            Saisissez le pseudo du compte à supprimer :{' '}
          </label>
          <input
            id="pseudo"
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
