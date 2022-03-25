import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Banner.css'

function suppCompte() {
  window.location.href = '/supprimerCompte'
}
function connexion() {
  window.location.href = '/'
}

function Banner() {
  return (
    <div>
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />
        <div>
          <button className="group-logout" onClick={connexion}>
            Déconnexion
          </button>
          <button className="group-deleteUser" onClick={suppCompte}>
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
