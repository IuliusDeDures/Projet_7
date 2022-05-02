import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Connection.css'
import React, { useState } from 'react'
import axios from 'axios'

function Connection() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function Login() {
    const user = {
      email: email,
      password: password,
    }

    axios
      .post(`http://127.0.0.1:8000/api/auth/login`, user)
      .then(
        (res) =>
          (window.location.href =
            './message?userPseudo=' +
            res.data.userPseudo +
            'isAdmin' +
            res.data.isAdmin +
            'Bearer' +
            res.data.token)
      )
      .catch(() => alert("Vous n'êtes pas inscrit !"))
  }

  return (
    <div className="connect-group-connection">
      <div className="connect-group-header">
        <img src={logo} alt="logo-groupomania" className="connect-group-logo" />
      </div>
      <div className="connect-group-form">
        <form className="connect-form-login">
          <p className="connect-form-title">Connection :</p>
          <label type="email" className="connect-label-email">
            Votre adresse email :{}
          </label>
          <input
            type="email"
            className="connect-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label type="password" className="connect-label-password">
            Votre password :{}
          </label>
          <input
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
