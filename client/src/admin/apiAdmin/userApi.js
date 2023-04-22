import { useState, useEffect } from "react";
import axios from "axios";

function UserTotalApi() {
  const [dataUser, setdataUser] = useState([]);

  useEffect(() => {
    const userTotalApi = async () => {
      const data = await axios.get("http://localhost:5000/admin/analysisuser");
      setdataUser(data.data);
    };
    userTotalApi();
  }, []);

  return {
    dataUser: [dataUser, setdataUser],
  };
}
export default UserTotalApi;
