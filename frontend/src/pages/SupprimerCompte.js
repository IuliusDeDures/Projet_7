import logo from '../assets/icon-left-font-rogner.png'
import '../styles/SupprimerCompte.css'
import { UserDelete } from '../components/utils/Requete'
import { useState } from 'react'

function SupprimerCompte() {
  let url = new URL(window.location.href)
  let search_parms = new URLSearchParams(url.search)
  let token = ''
  if (search_parms.has('token')) {
    token = search_parms.get('token')
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function Delete() {
    UserDelete(email, token)
  }

  return (
    <div className="sup-group-suppression">
      <div className="sup-group-header">
        <img src={logo} alt="logo-groupomania" className="sup-group-logo" />
      </div>
      <div className="sup-group-form">
        <form className="sup-form-deleteUser">
          <p className="sup-form-title">Supprimer un compte :</p>
          <label htmlFor="email" className="sup-label-email">
            Votre adresse email :{' '}
          </label>
          <input
            type="email"
            className="sup-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="password" className="sup-label-password">
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
          <button
            className="sup-form-retour"
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

export default SupprimerCompte
