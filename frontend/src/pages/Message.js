import AllMessage from '../components/AllMessages'
import AllUsers from '../components/AllUsers'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import '../styles/Message.css'

function Message() {
  return (
    <div className="group-message">
      <Banner></Banner>
      <div className="group-message-contenu">
        <AllUsers></AllUsers>
        <AllMessage></AllMessage>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Message
