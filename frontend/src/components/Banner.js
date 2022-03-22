import logo from '../assets/icon-left-font-rogner.png'
import '../styles/Banner.css'

function suppCompte() {
  window.location.href = '/supprimerCompte'
}

function Banner() {
  return (
    <div>
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />
        <div className="group-header-button">
          <button className="group-deleteUser" onClick={suppCompte}>
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
