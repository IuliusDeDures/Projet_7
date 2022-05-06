import axios from 'axios'

// requete pour publier un message
async function PublieMessage(data, token) {
  try {
    await axios.post('http://127.0.0.1:8000/api/messages/', data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert('les informations saisies sont incorrectes')
  }
}
export { PublieMessage }

// requete pour afficher les messages
function AfficheMessages(setDataMessages) {
  axios
    .get('http://127.0.0.1:8000/api/messages/')
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
function SupprimerMessage(info, token) {
  axios
    .delete(`http://127.0.0.1:8000/api/messages/${info.id}`, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerMessage }

// requete pour publier un commentaire
async function PublieCommentaire(data, token) {
  try {
    await axios.post('http://127.0.0.1:8000/api/commentaires/', data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert('les informations saisies sont incorrectes')
  }
}
export { PublieCommentaire }

// requete pour afficher les commentaires
function AfficheCommentaire(setDataCommentaire) {
  axios
    .get(`http://127.0.0.1:8000/api/commentaires/`)
    .then((res) => {
      const dataCommentaire = res.data
      setDataCommentaire(dataCommentaire)
    })
    .catch((err) => {
      console.log(err)
    })
}
export { AfficheCommentaire }

// requete selection un message
function SelectUnMessage(setAfficheCommentaire, info) {
  axios
    .get(`http://127.0.0.1:8000/api/messages/${info.id}`)
    .then((res) => {
      const message = res.data.id
      setAfficheCommentaire(message)
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SelectUnMessage }

// requete selectionner un commentaire
function SelectUnCommentaire(setReponse, dataCom) {
  axios
    .get(`http://127.0.0.1:8000/api/commentaires/${dataCom.id}`)
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
    .delete(`http://127.0.0.1:8000/api/commentaires/${dataCom.id}`, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerCommentaire }

// requete pour modifier le nombre de commentaires
function ModifNbrCommentaire(data) {
  axios.put('http://127.0.0.1:8000/api/commentaires/', data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrCommentaire }

// requete pour afficher les réponses de commentaires
function AfficheRepCommentaire(setDataRepCommentaire) {
  axios
    .get(`http://127.0.0.1:8000/api/repCommentaires/`)
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
    await axios.post('http://127.0.0.1:8000/api/repCommentaires/', data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert('les informations saisies sont incorrectes')
  }
}
export { PublieRepCommentaire }

// requete pour supprimer une reponse de commentaire
function SupprimerRepCommentaire(dataRepCom, token) {
  axios
    .delete(`http://127.0.0.1:8000/api/repCommentaires/${dataRepCom.id}`, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerRepCommentaire }

// requete pour modifier le nombre de reponse commentaires
function ModifNbrRepCommentaire(data) {
  axios.put('http://127.0.0.1:8000/api/repCommentaires/', data).catch((err) => {
    console.log(err)
  })
}
export { ModifNbrRepCommentaire }

// requete pour supprimer un like message
function SupprimerLikeMessage(info, token) {
  axios
    .delete(`http://127.0.0.1:8000/api/likes/likeMessage/${info.id}`, {
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
    await axios.post('http://127.0.0.1:8000/api/likes/likeMessage/', data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert('les informations saisies sont incorrectes')
  }
}
export { CréerLikeMessage }

// requete pour modifier le nombre like message
function ModifNbrLikeMessage(data) {
  axios
    .put('http://127.0.0.1:8000/api/likes/likeMessage/', data)
    .catch((err) => {
      console.log(err)
    })
}
export { ModifNbrLikeMessage }

// requete pour supprimer un like message
function SupprimerLikeCommentaire(info, token) {
  axios
    .delete(`http://127.0.0.1:8000/api/likes/likeCommentaire/${info.id}`, {
      headers: { Authorization: 'bearer ' + token },
    })
    .catch((err) => {
      console.log(err)
    })
}
export { SupprimerLikeCommentaire }

// requete pour créer un like message
async function CréerLikeCommentaire(data, token) {
  try {
    await axios.post('http://127.0.0.1:8000/api/likes/likeCommentaire/', data, {
      headers: { Authorization: 'bearer ' + token },
    })
  } catch {
    return alert('les informations saisies sont incorrectes')
  }
}
export { CréerLikeCommentaire }

// requete pour modifier le nombre like message
function ModifNbrLikeCommentaire(data) {
  axios
    .put('http://127.0.0.1:8000/api/likes/likeCommentaire/', data)
    .catch((err) => {
      console.log(err)
    })
}
export { ModifNbrLikeCommentaire }
