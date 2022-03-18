import "../styles/AllUsers.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

library.add(faFaceSmile);

function AllUsers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:3000/api/auth/users");
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="allUsers">
      {data.map((info) => (
        <div className="users">
          <p className="users-contenu" key={info.pseudo}>
            <FontAwesomeIcon
              icon="fa-solid fa-face-smile"
              className="icon-smile"
            />
            {info.pseudo}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AllUsers;
