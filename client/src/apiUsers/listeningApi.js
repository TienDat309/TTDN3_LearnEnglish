import { useState, useEffect } from "react";
import axios from "axios";

function ListeningApi() {
  const [dataListening, setdataListening] = useState(null);
  const [currentPageListening, setcurrentPageListening] = useState(1);
  const [postsPerPageListening] = useState(1);
  const [stateTranslate, setstateTranslate] = useState(false);
  const [dataTranslate, setdataTranslate] = useState([]);

  //get data skill listening
  useEffect(() => {
    const listeningApi = async () => {
      const data = await axios.get("http://localhost:5000/api/types/listening");
      setdataListening(data.data);
    };
    listeningApi();
  }, []);
  
  return {
    dataListening: [dataListening, setdataListening],
    currentPageListening: [currentPageListening, setcurrentPageListening],
    postsPerPageListening: [postsPerPageListening],
    stateTranslate: [stateTranslate, setstateTranslate],
    dataTranslate: [dataTranslate, setdataTranslate],
  };
}
export default ListeningApi;
