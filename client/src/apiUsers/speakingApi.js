import { useState, useEffect } from "react";
import axios from "axios";

function ReadingApi() {
    const [dataSpeaking, setdataSpeaking] = useState(null);

  useEffect(() => {
    const speakingApi = async () => {
      const data = await axios.get("http://localhost:5000/api/types/speaking");
      setdataSpeaking(data.data);
    };
    speakingApi();
  }, []);

  return {
    dataSpeaking: [dataSpeaking, setdataSpeaking] 
  };
}
export default ReadingApi;
