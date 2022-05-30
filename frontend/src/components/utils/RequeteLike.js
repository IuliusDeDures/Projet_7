import axios from 'axios'

/**
 * liste des URL de l'API */
const urlLikeMessaqge = 'http://127.0.0.1:8000/api/likes/likeMessage/'
const urlLikeCommentaire = 'http://127.0.0.1:8000/api/likes/likeCommentaire/'

/**
 * message d'alerte */
const alertMessageInfoIncorrecte = 'les informations saisies sont incorrectes'

/**
 * fonction pour afficher les likes message
 * @param {string} dataMess - information de message
 * @param {string} userPseudo - pseudo de l'utilisateur
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setDataLikeMessages - state des likes messages
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
 * @param {string} dataMess - information du message
 * @param {string} token - token d'identification de l'utilisateur
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
 * @param {string} data - information like message
 * @param {string} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function CréerLikeMessage(data, token) {
  try {
    await axios.post(urlLikeMessaqge, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessageInfoIncorrecte)
  }
}
export { CréerLikeMessage }

/**
 * fonction pour modifier le nombre de like message
 * @param {string} data - information message
 */
function ModifNbrLikeMessage(data) {
  axios.put(urlLikeMessaqge, data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrLikeMessage }

/**
 * fonction pour afficher les likes commentaire
 * @param {string} dataCom - information commentaire
 * @param {string} userPseudo - pseudo de l'utilisateur
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setDataLikeCommentaire - state like commentaire
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
 * @param {string} dataCom - information commentaire
 * @param {string} token - token d'identification de l'utilisateur
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
 * @param {string} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function CréerLikeCommentaire(data, token) {
  try {
    await axios.post(urlLikeCommentaire, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessageInfoIncorrecte)
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
