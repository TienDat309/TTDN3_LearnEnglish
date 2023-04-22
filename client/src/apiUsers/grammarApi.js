import { useState, useEffect } from "react";
import axios from "axios";

function GrammarApi() {
  const [dataGrammar, setdataGrammar] = useState(null);

  useEffect(() => {
    const grammarApi = async () => {
      const data = await axios.get("http://localhost:5000/api/types/grammar");
      // const data = await axios.get("http://localhost:5000/api/grammar");
      setdataGrammar(data.data);
    };
    grammarApi();
  }, []);

  return {
    dataGrammar: [dataGrammar, setdataGrammar],
  };
}
export default GrammarApi;
