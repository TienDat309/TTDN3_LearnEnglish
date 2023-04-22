import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setuser] = useState(null);
  const [iduser, setiduser] = useState([]);
  const [dataLoginMedia, setdataLoginMedia] = useState({
    isLogin: false,
    objectLogin: "",
  });
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:5000/user/infor", {
            headers: { Authorization: token },
          });
          // console.log(res.data)
          setuser(res.data);
          setIsLogged(true);
          setiduser(res.data._id);
        } catch (err) {
          console.log(err);
        }
      };

      getUser();
    }
  }, [token]);

  return {
    user: [user, setuser],
    isLogged: [isLogged, setIsLogged],
    iduser: [iduser, setiduser],
    dataLoginMedia:[dataLoginMedia, setdataLoginMedia]
  };
}

export default UserAPI;
