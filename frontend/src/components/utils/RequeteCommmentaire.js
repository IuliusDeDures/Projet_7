import axios from 'axios'
import { urlCommentaire, urlCommentaireAdmin } from './UrlApi'

/**
 * message d'alerte */
const alertMessageInfoIncorrecte = 'les informations saisies sont incorrectes'

/**
 * fonction pour publier un commentaire
 * @param {*} data - information du commentaire
 * @param {string} token - token d'identification de l'utilisateur
 * @returns - mesage d'erreur
 */
async function PublieCommentaire(data, token) {
  try {
    await axios.post(urlCommentaire, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessageInfoIncorrecte)
  }
}
export { PublieCommentaire }

/**
 * fonction pour afficher un commentaire
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setDataCommentaire - state commentaire
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
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setReponse - state réponse de commentaire
 * @param {string} dataCom - information du commentaire
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
 * @param {string} dataCom - information du commentaire
 * @param {string} token - token d'identification de l'utilisateur
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
 * fonction pour supprimer un commentaire pour l'administrateur
 * @param {string} dataCom - information du commentaire
 * @param {string} token - token d'identification de l'utilisateur
 */
function SupprimerCommentaireAdmin(dataCom, token) {
  axios
    .delete(urlCommentaireAdmin + dataCom.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerCommentaireAdmin }

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
