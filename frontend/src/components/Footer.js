import "../styles/Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
library.add(faThumbsUp, faImage);

function Footer() {
  return (
    <div className="group-footer">
      <FontAwesomeIcon icon="fa-regular fa-image" className="icon-photo" />
      
      <FontAwesomeIcon icon="fa-solid fa-thumbs-up" className="icon-like" />
    </div>
  );
}

export default Footer;
