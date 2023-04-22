import { Fragment, React, useContext, useState, useEffect } from 'react';
import Topics from '../../../components/Skills/Topic/Topic';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Headers/Header';
import { GlobalState } from '../../../GlobalState';
import { useLocation, useParams } from 'react-router-dom';
import { formatData } from './utilsTopic';
import axios from 'axios';

const Topic = () => {
  const { levelSlug, topicSlug } = useParams();
  const state = useContext(GlobalState);
  const [data, setdata] = useState(null);
  const location = useLocation();
  const [dataLevelListen] = state.listeningApi.dataListening;

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/types/listening/levels/${levelSlug}/topics/${topicSlug}`
    );

    if (res.data) {
      setdata(res.data);
    }
  };

  useEffect(() => {
    // setdata(formatData(location.pathname, dataLevelListen));
    getData();
  }, []);

  return (
    <Fragment>
      <Header />
      {data && <Topics data={data} />}
      <Footer />
    </Fragment>
  );
};

export default Topic;
