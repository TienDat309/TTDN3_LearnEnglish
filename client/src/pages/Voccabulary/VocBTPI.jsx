import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Headers/Header';
import VocabularySkills from '../../components/Voccabulary/VocabularySkills/VocabularySkills';
import { GlobalState } from '../../GlobalState';
import { formatData } from '../Skills/DetailTopic/utils';

export default function VocBTPI() {
  const { levelSlug } = useParams();
  const state = useContext(GlobalState);
  const location = useLocation();
  const [data, setdata] = useState(null);
  const [dataLevelVoc] = state.vocabularyApi.vocData;

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/types/vocabulary/levels/${levelSlug}`
    );

    if (res.data) {
      setdata(res.data);
    }
  };

  useEffect(() => {
    getData();
    // setdata(formatData(location.pathname, dataLevelVoc));
  }, []);

  return (
    <Fragment>
      <Header />
      {data && <VocabularySkills data={data} />}
      <Footer />
    </Fragment>
  );
}
