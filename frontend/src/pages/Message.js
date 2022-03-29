import SectionMessage from '../components/SectionMessage'
import SectionUsers from '../components/SectionUsers'
import Banner from '../components/Banner'
//import Footer from '../components/Footer'
import '../styles/Message.css'

function Message() {
  return (
    <div className="group-message">
      <Banner></Banner>
      <div className="group-message-contenu">
        <SectionMessage></SectionMessage>
        <SectionUsers></SectionUsers>
      </div>
    </div>
  )
}

export default Message
