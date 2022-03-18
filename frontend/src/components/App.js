import "../styles/App.css";
import Banner from "./Banner";
import AllMessage from "./AllMessages";
import AllUsers from "./AllUsers";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Banner></Banner>
      <div className="main">
        <AllUsers></AllUsers>
        <AllMessage></AllMessage>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
