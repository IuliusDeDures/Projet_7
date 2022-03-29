import axios from 'axios'

async function PublieMessage(data, token) {
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/messages/', data, {
      headers: { Authorization: 'bearer ' + token },
    })
    console.log(res)
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
