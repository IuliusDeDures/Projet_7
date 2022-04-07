import axios from 'axios'

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
