import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Banner.css'

// fonction qui envoie faire la page de suppression de compte
function suppCompte() {
  window.location.href = '/supprimerCompte?token=' + token
}
// fonction qui envoie faire la page de suppression de compte (administrateur)
function suppUnCompte() {
  window.location.href = '/supprimerUnCompte'
}
// fonction qui envoie faire la page de connexion
function connexion() {
  window.location.href = '/'
}
// fonction qui envoie faire la page de creation de compte (administrateur)
function CreaCompteAdmin() {
  window.location.href = '/CreaCompteAdmin'
}
// recupération du token, isAdmin
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

// fonction pour afficher le header de la page forum
function Banner() {
  return (
    <div>
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />
        <div className="group-boutton">
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
