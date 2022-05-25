import UserMessage from '../components/UserMessage'
import Banner from '../components/Banner'
import '../styles/Forum.css'
/**
 * fonction de la page forum
 * @returns - la page forum
 */
function UserForum() {
  return (
    <div className="group-forum">
      <Banner></Banner>
      <UserMessage></UserMessage>
    </div>
  )
}

export default UserForum
