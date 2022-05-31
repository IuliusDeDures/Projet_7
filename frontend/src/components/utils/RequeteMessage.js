import axios from 'axios'
import { urlMessage, urlMessageAdmin } from './UrlApi'

/**
 * message d'alerte */
const alertMessageInfoIncorrecte = 'les informations saisies sont incorrectes'

/**
 * fonction pour publie un message
 * @param {FormData} data - information du message
 * @param {string} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function PublieMessage(data, token) {
  try {
    await axios.post(urlMessage, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessageInfoIncorrecte)
  }
}
export { PublieMessage }

/**
 * fonction pour afficher l'ensemble des messages
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setDataMessages - state message
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
 * @param {string} dataMess - information du message
 * @param {string} token - token d'identification de l'utilisateur
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
 * fonction pour supprimer un message pour administrateur
 * @param {string} dataMess - information du message
 * @param {string} token - token d'identification de l'utilisateur
 */
function SupprimerMessageAdmin(dataMess, token) {
  axios
    .delete(urlMessageAdmin + dataMess.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerMessageAdmin }

/**
 * fonction pour select un message
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setAfficheCommentaire - state commentaire
 * @param {string} dataMess - information du message
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
