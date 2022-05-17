import axios from 'axios'

// liste url
const urlMessage = 'http://127.0.0.1:8000/api/messages/'
const urlCommentaire = 'http://127.0.0.1:8000/api/commentaires/'
const urlRepCommentaire = 'http://127.0.0.1:8000/api/repCommentaires/'
const urlLikeMessaqge = 'http://127.0.0.1:8000/api/likes/likeMessage/'
const urlLikeCommentaire = 'http://127.0.0.1:8000/api/likes/likeCommentaire/'
const urlLogin = 'http://127.0.0.1:8000/api/auth/login'
const urlSignup = 'http://127.0.0.1:8000/api/auth/signup'
const urlDeleteUser = 'http://127.0.0.1:8000/api/auth/'
const urlDeleteOneUser = 'http://127.0.0.1:8000/api/auth/deleteOne/'

// message d'alerte
const alertMessage1 = 'les informations saisies sont incorrectes'
const AlertMessage2 = "Vous n'êtes pas inscrit !"
const AlertMessage3 = 'Utilisateur supprimé'

// requete pour publier un message
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

// requete pour afficher les messages
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

// requete pour supprimer un message
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

// requete selection un message
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

// requete pour publier un commentaire
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

// requete pour afficher les commentaires
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

// requete selectionner un commentaire
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

// requete pour supprimer un commentaire
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

// requete pour modifier le nombre de commentaires
function ModifNbrCommentaire(data) {
  axios.put(urlCommentaire, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrCommentaire }

// requete pour afficher les réponses de commentaires
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

// requete pour publier une reponse de commentaire
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

// requete pour supprimer une reponse de commentaire
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

// requete pour modifier le nombre de reponse commentaires
function ModifNbrRepCommentaire(data) {
  axios.put(urlRepCommentaire, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrRepCommentaire }

// requete pour afficher les likes message
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

// requete pour supprimer un like message
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

// requete pour créer un like message
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

// requete pour modifier le nombre like message
function ModifNbrLikeMessage(data) {
  axios.put(urlLikeMessaqge, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrLikeMessage }

// requete pour affiche les likes commentaire
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

// requete pour supprimer un like commentaire
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

// requete pour créer un like commentaire
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

// requete pour modifier le nombre like commentaire
function ModifNbrLikeCommentaire(data) {
  axios.put(urlLikeCommentaire, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrLikeCommentaire }

// requete pour la connection au site
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

// requete pour la création d'un compte
function UserSignup(user) {
  axios
    .post(urlSignup, user)
    .then((res) => {
      window.location.href = './'
    })
    .catch(() => alert(alertMessage1))
}
export { UserSignup }

// requete pour supprimer un compte
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

// requete pour supprimer un compte (administrateur)
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
