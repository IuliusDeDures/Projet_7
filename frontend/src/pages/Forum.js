import Message from '../components/Message'
import Banner from '../components/Banner'
import '../styles/Forum.css'
/**
 * fonction de la page forum
 * @returns - la page forum
 */
function Forum() {
  return (
    <div className="group-forum">
      <Banner></Banner>
      <Message></Message>
    </div>
  )
}

export default Forum
