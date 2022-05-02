import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Connection from './pages/Connection'
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
          <Connection />
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
