import logo from '../assets/icon-left-font-monochrome-black_rogner.png'
import '../styles/Connection.css'
import React, { useState } from 'react'
import { UserLogin } from '../components/utils/Requete'

function Connection() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function Login() {
    const user = {
      email: email,
      password: password,
    }
    UserLogin(user)
  }

  return (
    <div className="connect-group-connection">
      <div className="connect-group-header">
        <img src={logo} alt="logo-groupomania" className="connect-group-logo" />
        <h1 className="connect-group-titre">Groupomania</h1>
      </div>
      <div className="connect-group-form">
        <form className="connect-form-login">
          <h2 className="connect-form-title">Connection :</h2>
          <label htmlFor="email" className="connect-label-email">
            Votre adresse email :{}
          </label>
          <input
            id="email"
            type="email"
            className="connect-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="connect-label-password">
            Votre password :{}
          </label>
          <input
            id="password"
            type="password"
            className="connect-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="connect-form-send"
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              Login()
              console.log(email, password)
            }}
          >
            Connection
          </button>
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
        </p>{' '}
      </div>
    </div>
  )
}

export default Connection
