import axios from 'axios'

/**
 * liste des URL de l'API */
const urlLogin = 'http://127.0.0.1:8000/api/auth/login'
const urlSignup = 'http://127.0.0.1:8000/api/auth/signup'
const urlDeleteUser = 'http://127.0.0.1:8000/api/auth/'
const urlDeleteOneUser = 'http://127.0.0.1:8000/api/auth/deleteOne/'
/**
 * message d'alerte */
const alertMessageInfoIncorrecte = 'les informations saisies sont incorrectes'
const alertMessagePasInscrit = "Vous n'êtes pas inscrit !"
const alertMessageUserDelete = 'Utilisateur supprimé'

/**
 * fonction pour se connecter au site
 * @param {string} user - information de l'utilisateur
 */
function UserLogin(user) {
  axios
    .post(urlLogin, user)
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
    .catch(() => alert(alertMessagePasInscrit))
}
export { UserLogin }

/**
 * fonction pour créer un nouvel utilisateur
 * @param {string} user - information de l'utilisateur
 */
function UserSignup(user) {
  axios
    .post(urlSignup, user)
    .then((res) => {
      alert('Compte créer')
      window.location.href = './'
    })
    .catch(() =>
      alert(
        alertMessageInfoIncorrecte + ' ou compte déja existant avec ce pseudo !'
      )
    )
}
export { UserSignup }

/**
 * fonction pour suppimer son compte utilisteur
 * @param {string} email - email de l'utilisateur
 * @param {string} token - token d'identification de l'utilisateur
 */
function UserDelete(email, token) {
  axios
    .delete(urlDeleteUser + email, {
      headers: { Authorization: 'bearer ' + token },
    })
    .then((res) => {
      alert(alertMessageUserDelete)
      window.location.href = './'
    })
    .catch(() => alert(alertMessageInfoIncorrecte))
}
export { UserDelete }

/**
 * fonction pour supprimer un compte utilisateur pour l'administrateur
 * @param {string} pseudo - pseudo de l'utilisateur
 */
function DeleteOneUser(pseudo) {
  axios
    .delete(urlDeleteOneUser + pseudo)
    .then((res) => {
      alert(alertMessageUserDelete)
      window.location.href = './'
    })
    .catch(() => alert(alertMessageInfoIncorrecte))
}
export { DeleteOneUser }
