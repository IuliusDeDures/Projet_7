import logo from "../assets/icon-left-font-rogner.png";
import "../styles/Banner.css";

function Banner() {
  return (
    <div>
      <div className="group-header">
        <img src={logo} alt="logo-groupomania" className="group-logo" />
        <div className="group-header-button">
          <button className="group-login">Connection</button>
          <button className="group-signUp">Créer un compte</button>
          <button className="group-deleteUser">Supprimer un compte</button>
        </div>
      </div>
      <div className="group-form">
        <form
          className="form-login"
          method="post"
          action="http://127.0.0.1:3000/api/auth/login"
        >
          <p className="form-title">
            Connection :
            <br />
            <label for="email" className="label-email">
              Votre adresse email :{" "}
            </label>
            <input type="text" className="email" />
            <br />
            <label for="pseudo" className="label-pseudo">
              Votre pseudo :{" "}
            </label>
            <input type="text" className="pseudo" />
            <br />
            <label for="password" className="label-password">
              Votre password :{" "}
            </label>
            <input type="password" className="password" />
            <br />
            <button className="form-send">Connection</button>
          </p>
        </form>
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
        <form className="form-deleteUser">
          <p className="form-title">
            Supprimer un compte :
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
            <button className="form-send">Supprimer le compte</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Banner;
