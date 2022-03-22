import logo from "../assets/icon-left-font-rogner.png";
import "../styles/Inscription.css";


function Inscription() {
  return (
    <div>
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />        
      </div>
      <div className="group-form">
        <form className="form-signUp">
          <p className="form-title">
            Créer un compte :
            <br />
            <label for="text" className="label-email">
              Votre adresse email :{" "}
            </label>
            <input type="text" className="email" />
            <br />
            <label for="text" className="label-pseudo">
              Votre pseudo :{" "}
            </label>
            <input type="text" className="pseudo" />
            <br />
            <label for="email" className="label-password">
              Votre password :{" "}
            </label>
            <input type="password" className="password" />
            <br />
            <button className="form-send">Créer le compte</button>
          </p>
        </form>       
      </div>
    </div>
  );
}

export default Inscription;
