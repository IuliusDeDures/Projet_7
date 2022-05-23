import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'
import Forum from './pages/Forum'
import SupprimerCompte from './pages/SupprimerCompte'
import SupprimerUnCompte from './pages/SupprimerUnCompte'
import CreaCompteAdmin from './pages/CreaCompteAdmin'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Connexion />
        </Route>
        <Route path="/inscription">
          <Inscription />
        </Route>
        <Route path="/message">
          <Forum />
        </Route>
        <Route path="/CreaCompteAdmin">
          <CreaCompteAdmin />
        </Route>
        <Route path="/supprimerCompte">
          <SupprimerCompte />
        </Route>
        <Route path="/supprimerUnCompte">
          <SupprimerUnCompte />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
