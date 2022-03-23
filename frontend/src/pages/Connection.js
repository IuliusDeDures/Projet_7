import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Connection.css'

function Connection() {
  return (
    <div className="connect-group-connection">
      <div className="connect-group-header">
        <img src={logo} alt="logo-groupomania" className="connect-group-logo" />
      </div>
      <div className="connect-group-form">
        <form className="connect-form-login">
          <p className="connect-form-title">Connection :</p>
          <label for="email" className="connect-label-email">
            Votre adresse email :{' '}
          </label>
          <input type="text" className="connect-email" />
          <label for="pseudo" className="connect-label-pseudo">
            Votre pseudo :{' '}
          </label>
          <input type="text" className="connect-pseudo" />
          <label for="password" className="connect-label-password">
            Votre password :{' '}
          </label>
          <input type="password" className="connect-password" />
          <button className="connect-form-send">Connection</button>
        </form>
      </div>
      <div>
        <p className="connect-group-signUp">
          Si vous n'êtes pas inscrit vous pouvez
          <br />
          créer un compte en cliquant{' '}
          <span>
            <a href="/inscription"> ici </a>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Connection
