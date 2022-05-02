import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Banner.css'

function suppCompte() {
  window.location.href = '/supprimerCompte?token=' + token
}
function suppUnCompte() {
  window.location.href = '/supprimerUnCompte'
}

function connexion() {
  window.location.href = '/'
}
function CreaCompteAdmin() {
  window.location.href = '/CreaCompteAdmin'
}

let url = new URL(window.location.href)
let search_parms = new URLSearchParams(url.search)
let userPseudoIsAdminBearer = ''
let token = ''
let isAdmin = ''
let userPseudoIsAdmin = ''
if (search_parms.has('userPseudo')) {
  userPseudoIsAdminBearer = search_parms.get('userPseudo')
  token = userPseudoIsAdminBearer.split('Bearer')[1]
  userPseudoIsAdmin = userPseudoIsAdminBearer.split('Bearer')[0]
  isAdmin = userPseudoIsAdmin.split('isAdmin')[1]
}

function Banner() {
  return (
    <div>
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />
        <div>
          {isAdmin === 'true' ? (
            <button className="group-listeUser" onClick={CreaCompteAdmin}>
              Créer un compte administrateur
            </button>
          ) : null}
          <button className="group-logout" onClick={connexion}>
            Déconnexion
          </button>
          {isAdmin === 'true' ? (
            <button className="group-admin-deleteUser" onClick={suppUnCompte}>
              Supprimer un compte
            </button>
          ) : (
            <button className="group-deleteUser" onClick={suppCompte}>
              Supprimer le compte
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
