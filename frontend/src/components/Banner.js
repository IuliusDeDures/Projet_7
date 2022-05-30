import logo from '../assets/icon-left-font-monochrome-black_rogner.png'
import '../styles/Banner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSlash, faUserPlus, faArrowRightFromBracket)

/**
 * fonction qui envoie faire la page de suppression de son compte utilisateur
 */
function suppCompte() {
  window.location.href = '/supprimerCompte?token=' + token
}
/**
 * fonction qui envoie faire la page de suppression de compte pour l'administrateur
 */
function suppUnCompte() {
  window.location.href = '/supprimerUnCompte'
}
/**
 * fonction qui envoie faire la page de connexion
 */
function connexion() {
  window.location.href = '/'
}
/**
 * fonction qui envoie faire la page de creation de compte pour l'administrateur
 */
function CreaCompteAdmin() {
  window.location.href = '/CreaCompteAdmin'
}
/**
 * recupération du token et d'isAdmin
 */
let url = new URL(window.location.href)
let search_parms = new URLSearchParams(url.search)
let userPseudoIsAdminBearer = ''
let token = ''
let tokenSelectUser = ''
let isAdmin = ''
let userPseudoIsAdmin = ''
if (search_parms.has('userPseudo')) {
  userPseudoIsAdminBearer = search_parms.get('userPseudo')
  tokenSelectUser = userPseudoIsAdminBearer.split('Bearer')[1]
  token = tokenSelectUser.split('selectUser')[0]
  userPseudoIsAdmin = userPseudoIsAdminBearer.split('Bearer')[0]
  isAdmin = userPseudoIsAdmin.split('isAdmin')[1]
}

/**
 * fonction pour afficher le header de la page forum
 * @returns - le header de la page forum
 */
function Banner() {
  return (
    <div className="group-banner-header">
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />
        <h1 className="group-header-title">Goupomania</h1>

        <div className="group-boutton">
          <button
            className="group-logout"
            onClick={connexion}
            title="Déconnexion"
          >
            <FontAwesomeIcon
              className="group-logout-logo"
              icon="fa-solid fa-arrow-right-from-bracket"
            />
          </button>
          {isAdmin === 'true' ? (
            <button
              className="group-createUser"
              onClick={CreaCompteAdmin}
              title="Créer un utilisateur administrateur"
            >
              <FontAwesomeIcon icon="fa-solid fa-user-plus" />
            </button>
          ) : null}
          {isAdmin === 'true' ? (
            <button
              className="group-admin-deleteUser"
              onClick={suppUnCompte}
              title="Supprimer un utilisateur"
            >
              <FontAwesomeIcon icon="fa-solid fa-user-slash" />
            </button>
          ) : (
            <button
              className="group-deleteUser"
              onClick={suppCompte}
              title="Supprimer le compte"
            >
              <FontAwesomeIcon icon="fa-solid fa-user-slash" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
