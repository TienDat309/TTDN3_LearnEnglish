import { Fragment, React, useContext, useState, useEffect } from 'react';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Headers/Header';
import TopicGrammar from '../../../components/Grammar/Topic/TopicGrammar';
import { GlobalState } from '../../../GlobalState';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Topic = () => {
  const state = useContext(GlobalState);
  const [data, setdata] = useState(null);
  const location = useLocation();
  const { levelSlug } = useParams();
  const [dataGrammar] = state.grammarApi.dataGrammar;

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/types/grammar/levels/${levelSlug}`
    );

    if (res.data) {
      setdata(res.data);
    }
  };

  useEffect(() => {
    getData()
    // let str = '';
    // let temp = '';
    // let array = [];
    // for (let i = location.pathname.length - 1; i >= 0; i--) {
    //   if (location.pathname[i] === '/') break;
    //   str += location.pathname[i];
    // }
    // temp = str.split('').reverse().join('');
    // for (let i = 0; i < dataGrammar.length; i++) {
    //   if (dataGrammar[i].level.slugLevel === temp) {
    //     array.push(dataGrammar[i]);
    //   }
    // }
    // setdata(array);
  }, []);

  return (
    <Fragment>
      <Header />
      {data && <TopicGrammar data={data} />}
      <Footer />
    </Fragment>
  );
};

export default Topic;
