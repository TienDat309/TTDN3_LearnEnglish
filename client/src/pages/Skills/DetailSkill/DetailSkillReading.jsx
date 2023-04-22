import { React, Fragment, useContext } from 'react';
import Header from '../../../components/Headers/Header';
import Footer from '../../../components/Footer/Footer';
import DetailSkills from '../../../components/Skills/DetailSkills/DetailSkills';
import { GlobalState } from '../../../GlobalState';

const DetailSkillReading = () => {
  const state = useContext(GlobalState);

  return (
    <Fragment>
      <Header />
      {state.readingApi.dataReading[0] && (
        <DetailSkills data={state.readingApi.dataReading} />
      )}
      <Footer />
    </Fragment>
  );
};

export default DetailSkillReading;
