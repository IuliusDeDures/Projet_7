import axios from 'axios'

/**
 * liste des URL de l'API */
const urlRepCommentaire = 'http://127.0.0.1:8000/api/repCommentaires/'
const urlRepCommentaireAdmin =
  'http://127.0.0.1:8000/api/repCommentaires/admin/'

/**
 * message d'alerte */
const alertMessageInfoIncorrecte = 'les informations saisies sont incorrectes'

/**
 * fonction pour affiche les réponses de commentaire
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setDataRepCommentaire - state réponse de commentaire
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
 * @param {string} token - token d'identification de l'utilisateur
 * @returns - message d'erreur
 */
async function PublieRepCommentaire(data, token) {
  try {
    await axios.post(urlRepCommentaire, data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert(alertMessageInfoIncorrecte)
  }
}
export { PublieRepCommentaire }

/**
 * fonction pour supprimer une réponse de commentaire
 * @param {string} dataRepCom - information des réponses de commentaire
 * @param {string} token - token d'identification de l'utilisateur
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
 * fonction pour supprimer une réponse de commentaire pour l'administrateur
 * @param {string} dataRepCom - information des réponses de commentaire
 * @param {string} token - token d'identification de l'utilisateur
 */
function SupprimerRepCommentaireAdmin(dataRepCom, token) {
  axios
    .delete(urlRepCommentaireAdmin + dataRepCom.id, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerRepCommentaireAdmin }

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
