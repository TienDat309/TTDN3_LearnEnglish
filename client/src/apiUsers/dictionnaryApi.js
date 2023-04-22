import { useState, useEffect } from 'react';
import axios from 'axios';

function DictionnaryAPI() {
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState('en');

  useEffect(() => {
    const dictionaryApi = async () => {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    };
    if (word) {
      dictionaryApi();
    }
  }, [word, category]);

  return {
    word: [word, setWord],
    meanings: [meanings, setMeanings],
    category: [category, setCategory],
  };
}
export default DictionnaryAPI;
