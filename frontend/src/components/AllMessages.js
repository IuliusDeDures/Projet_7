import "../styles/AllMessages.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

library.add(faThumbsUp);

function AllMessage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:8000/api/messages/");
      setData(result.data);
    };
    fetchData();
  }, []);  


  return (
    <div className="allMessages">
      {data.map((data) => (
        <div>
          <p className="message-pseudoUser" key={data.userPseudo}>
            {data.userPseudo}
          </p>
          <div className="message">
            <p className="message-contenu">
              {data.text}
              <FontAwesomeIcon
                icon="fa-solid fa-thumbs-up"
                className="icon-like"
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllMessage;
