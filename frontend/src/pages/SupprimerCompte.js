import logo from '../assets/icon-left-font-rogner.png'
import '../styles/SupprimerCompte.css'

function SupprimerCompte() {
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
          <input type="text" className="sup-email" />
          <label for="text" className="sup-label-pseudo">
            Votre pseudo :{' '}
          </label>
          <input type="text" className="sup-pseudo" />
          <label for="email" className="sup-label-password">
            Votre password :{' '}
          </label>
          <input type="password" className="sup-password" />
          <button className="sup-form-send">Supprimer le compte</button>
        </form>
      </div>
    </div>
  )
}

export default SupprimerCompte
