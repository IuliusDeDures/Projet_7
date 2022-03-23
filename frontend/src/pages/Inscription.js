import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Inscription.css'

function Inscription() {
  return (
    <div className="ins-group-inscription">
      <div className="ins-group-header">
        <img src={logo} alt="logo-groupomania" className="ins-group-logo" />
      </div>
      <div className="ins-group-form">
        <form className="ins-form-signUp">
          <p className="ins-form-title">Créer un compte :</p>
          <label for="text" className="ins-label-email">
            Votre adresse email :{' '}
          </label>
          <input type="text" className="ins-email" />
          <label for="text" className="ins-label-pseudo">
            Votre pseudo :{' '}
          </label>
          <input type="text" className="ins-pseudo" />
          <label for="email" className="ins-label-password">
            Votre password :{' '}
          </label>
          <input type="password" className="ins-password" />
          <span className="ins-info-password">
            Votre mot de passe doit contenir au moin 5 caractères
            <br /> dont 1 majuscule, 1 minuscule et 1 chiffre.
          </span>
          <button className="ins-form-send">Créer le compte</button>
        </form>
      </div>
    </div>
  )
}

export default Inscription
