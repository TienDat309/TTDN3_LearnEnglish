import { Fragment, React, useContext, useState, useEffect } from 'react';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Headers/Header';
import DetailTopic from '../../../components/Skills/DetailTopic/DetailTopic';
import { GlobalState } from '../../../GlobalState';
import { useLocation, useParams } from 'react-router-dom';
import { formatData } from './utils';
import axios from 'axios';

const DetailLevelReading = () => {
  const { levelSlug } = useParams();
  const state = useContext(GlobalState);
  const [data, setdata] = useState(null);
  const location = useLocation();
  const [dataReading] = state.readingApi.dataReading;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/types/reading/levels/${levelSlug}`
    );

    if (res.data) {
      setdata(res.data);
    }
  };

  return (
    <Fragment>
      <Header />
      {data && <DetailTopic data={data} />}
      <Footer />
    </Fragment>
  );
};

export default DetailLevelReading;
