import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Connection.css'

function Connection() {
  return (
    <div className="group-connection">
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />
      </div>
      <div className="group-form">
        <form className="form-login">
          <p className="form-title">
            Connection :
            <br />
            <label for="email" className="label-email">
              Votre adresse email :{' '}
            </label>
            <input type="text" className="email" />
            <br />
            <label for="pseudo" className="label-pseudo">
              Votre pseudo :{' '}
            </label>
            <input type="text" className="pseudo" />
            <br />
            <label for="password" className="label-password">
              Votre password :{' '}
            </label>
            <input type="password" className="password" />
            <br />
            <button className="form-send">Connection</button>
          </p>
        </form>
      </div>
      <div>
        <p className="group-signUp">
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
