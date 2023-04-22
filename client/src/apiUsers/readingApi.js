import { useState, useEffect } from "react";
import axios from "axios";

function ReadingApi() {
  const [dataReading, setdataReading] = useState(null);

  useEffect(() => {
    const readingApi = async () => {
      const data = await axios.get("http://localhost:5000/api/types/reading");
      setdataReading(data.data);
    };
    readingApi();
  }, []);

  return {
    dataReading: [dataReading, setdataReading],
  };
}
export default ReadingApi;
