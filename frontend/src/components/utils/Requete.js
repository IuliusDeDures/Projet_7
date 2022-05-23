import axios from 'axios'

/**
 * liste des URL de l'API */
const urlMessage = 'http://127.0.0.1:8000/api/messages/'
const urlCommentaire = 'http://127.0.0.1:8000/api/commentaires/'
const urlRepCommentaire = 'http://127.0.0.1:8000/api/repCommentaires/'
const urlLikeMessaqge = 'http://127.0.0.1:8000/api/likes/likeMessage/'
const urlLikeCommentaire = 'http://127.0.0.1:8000/api/likes/likeCommentaire/'
const urlLogin = 'http://127.0.0.1:8000/api/auth/login'
const urlSignup = 'http://127.0.0.1:8000/api/auth/signup'
const urlDeleteUser = 'http://127.0.0.1:8000/api/auth/'
const urlDeleteOneUser = 'http://127.0.0.1:8000/api/auth/deleteOne/'
/**
 * message d'alerte */
const alertMessage1 = 'les informations saisies sont incorrectes'
const AlertMessage2 = "Vous n'êtes pas inscrit !"
const AlertMessage3 = 'Utilisateur supprimé'

/**
 * fonction pour publie un message
 * @param {*} data - information du message
 * @param {*} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function PublieMessage(data, token) {
  try {
    await axios.post(urlMessage, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessage1)
  }
}
export { PublieMessage }

/**
 * fonction pour afficher l'ensemblre des messages
 * @param {*} setDataMessages -  state message
 */
function AfficheMessages(setDataMessages) {
  axios
    .get(urlMessage)
    .then((res) => {
      const dataMessage = res.data
      setDataMessages(dataMessage)
    })
    .catch((err) => {
      console.log(err)
    })
}
export { AfficheMessages }

/**
 * fonction pour supprimer un message
 * @param {*} dataMess - information du message
 * @param {*} token - token d'identification de l'utilisateur
 */
function SupprimerMessage(dataMess, token) {
  axios
    .delete(urlMessage + dataMess.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerMessage }

/**
 * fonction pour select un message
 * @param {*} setAfficheCommentaire - state commentaire
 * @param {*} dataMess - information du message
 */
function SelectUnMessage(setAfficheCommentaire, dataMess) {
  axios
    .get(urlMessage + dataMess.id)
    .then((res) => {
      const message = res.data.id
      setAfficheCommentaire(message)
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SelectUnMessage }

/**
 * fonction pour publier un commentaire
 * @param {*} data - information du commentaire
 * @param {*} token - token d'identification de l'utilisateur
 * @returns - mesage d'erreur
 */
async function PublieCommentaire(data, token) {
  try {
    await axios.post(urlCommentaire, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessage1)
  }
}
export { PublieCommentaire }

/**
 * fonction pour afficher un commentaire
 * @param {*} setDataCommentaire - state commentaire
 */
function AfficheCommentaire(setDataCommentaire) {
  axios
    .get(urlCommentaire)
    .then((res) => {
      const dataCommentaire = res.data
      setDataCommentaire(dataCommentaire)
    })
    .catch((err) => {
      console.log(err)
    })
}
export { AfficheCommentaire }

/**
 * fonction pour selectionner un commentaire
 * @param {*} setReponse - state réponse de commentaire
 * @param {*} dataCom - information du commentaire
 */
function SelectUnCommentaire(setReponse, dataCom) {
  axios
    .get(urlCommentaire + dataCom.id)
    .then((res) => {
      const message = res.data.id
      setReponse(message)
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SelectUnCommentaire }

/**
 * fonction pour supprimer un commentaire
 * @param {*} dataCom - information du commentaire
 * @param {*} token - token d'identification de l'utilisateur
 */
function SupprimerCommentaire(dataCom, token) {
  axios
    .delete(urlCommentaire + dataCom.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerCommentaire }

/**
 * fonction pour modifier le nombre de commentaire
 * @param {*} data - information du message
 */
function ModifNbrCommentaire(data) {
  axios.put(urlCommentaire, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrCommentaire }

/**
 * fonction pour affiche les réponses de commentaire
 * @param {*} setDataRepCommentaire - state réponse de commentaire
 */
function AfficheRepCommentaire(setDataRepCommentaire) {
  axios
    .get(urlRepCommentaire)
    .then((res) => {
      const dataRepCommentaire = res.data
      setDataRepCommentaire(dataRepCommentaire)
    })
    .catch((err) => {
      console.log(err)
    })
}
export { AfficheRepCommentaire }

/**
 * fonction pour publier les réponses de commentaire
 * @param {*} data - information des réponses de commentaire
 * @param {*} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function PublieRepCommentaire(data, token) {
  try {
    await axios.post(urlRepCommentaire, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessage1)
  }
}
export { PublieRepCommentaire }

/**
 * fonction pour supprimer une réponse de commentaire
 * @param {*} dataRepCom - information des réponses de commentaire
 * @param {*} token - token d'identification de l'utilisateur
 */
function SupprimerRepCommentaire(dataRepCom, token) {
  axios
    .delete(urlRepCommentaire + dataRepCom.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerRepCommentaire }

/**
 * fonction pour modifier le nombre de réponse de commentaire
 * @param {*} data - informantion de commentaire
 */
function ModifNbrRepCommentaire(data) {
  axios.put(urlRepCommentaire, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrRepCommentaire }

/**
 * fonction pour afficher les likes message
 * @param {*} dataMess - information de message
 * @param {*} userPseudo - pseudo de l'utilisateur
 * @param {*} setDataLikeMessages - state des likes messages
 */
function AfficheLikeMessage(dataMess, userPseudo, setDataLikeMessages) {
  fetch(urlLikeMessaqge)
    .then((res) => res.json())
    .then((data) => {
      for (let dataLike of data) {
        if (
          dataLike.idMessage === dataMess.id &&
          dataLike.userPseudo === userPseudo
        )
          setDataLikeMessages(true)
      }
    })
}
export { AfficheLikeMessage }

/**
 * fonction pour supprimer un like message
 * @param {*} dataMess - information du message
 * @param {*} token - token d'identification de l'utilisateur
 */
function SupprimerLikeMessage(dataMess, token) {
  axios
    .delete(urlLikeMessaqge + dataMess.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerLikeMessage }

/**
 * fonction pour liker un message
 * @param {*} data - information like message
 * @param {*} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function CréerLikeMessage(data, token) {
  try {
    await axios.post(urlLikeMessaqge, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessage1)
  }
}
export { CréerLikeMessage }

/**
 * fonction pour modifier le nombre de like message
 * @param {*} data - information message
 */
function ModifNbrLikeMessage(data) {
  axios.put(urlLikeMessaqge, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrLikeMessage }

/**
 * fonction pour afficher les likes commentaire
 * @param {*} dataCom - information commentaire
 * @param {*} userPseudo - pseudo de l'utilisateur
 * @param {*} setDataLikeCommentaire - state like commentaire
 */
function AfficheLikeCommentaire(dataCom, userPseudo, setDataLikeCommentaire) {
  fetch(urlLikeCommentaire)
    .then((res) => res.json())
    .then((data) => {
      for (let dataLike of data) {
        if (
          dataLike.idCommentaire === dataCom.id &&
          dataLike.userPseudo === userPseudo
        )
          setDataLikeCommentaire(true)
      }
    })
}
export { AfficheLikeCommentaire }

/**
 * fonction pour supprimer un like commentaire
 * @param {*} dataCom - information commentaire
 * @param {*} token - token d'identification de l'utilisateur
 */
function SupprimerLikeCommentaire(dataCom, token) {
  axios
    .delete(urlLikeCommentaire + dataCom.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerLikeCommentaire }

/**
 * fonction pour liker un commentaire
 * @param {*} data - information like commentaire
 * @param {*} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function CréerLikeCommentaire(data, token) {
  try {
    await axios.post(urlLikeCommentaire, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessage1)
  }
}
export { CréerLikeCommentaire }

/**
 * fonction pour modifier le nombre de like commentaire
 * @param {*} data - information commentaire
 */
function ModifNbrLikeCommentaire(data) {
  axios.put(urlLikeCommentaire, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrLikeCommentaire }

/**
 * fonction pour se connecter au site
 * @param {*} user - information de l'utilisateur
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
    .catch(() => alert(AlertMessage2))
}
export { UserLogin }

/**
 * fonction pour créer un nouvel utilisateur
 * @param {*} user - information de l'utilisateur
 */
function UserSignup(user) {
  axios
    .post(urlSignup, user)
    .then((res) => {
      window.location.href = './'
    })
    .catch(() => alert(alertMessage1))
}
export { UserSignup }

/**
 * fonction pour suppimer son compte utilisteur
 * @param {*} email - email de l'utilisateur
 * @param {*} token - token d'identification de l'utilisateur
 */
function UserDelete(email, token) {
  axios
    .delete(urlDeleteUser + email, {
      headers: { Authorization: 'bearer ' + token },
    })
    .then((res) => {
      alert(AlertMessage3)
      window.location.href = './'
    })
    .catch(() => alert(alertMessage1))
}
export { UserDelete }

/**
 * fonction pour supprimer un compte utilisateur pour l'administrateur
 * @param {*} pseudo - pseudo de l'utilisateur
 */
function DeleteOneUser(pseudo) {
  axios
    .delete(urlDeleteOneUser + pseudo)
    .then((res) => {
      alert(AlertMessage3)
      window.location.href = './'
    })
    .catch(() => alert(alertMessage1))
}
export { DeleteOneUser }
