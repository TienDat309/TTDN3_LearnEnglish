import { React, Fragment, useContext } from 'react';
import Header from '../../../components/Headers/Header';
import Footer from '../../../components/Footer/Footer';
import DetailSkills from '../../../components/Skills/DetailSkills/DetailSkills';
import { GlobalState } from '../../../GlobalState';

const DetailSkill = () => {
  const state = useContext(GlobalState);

  return (
    <Fragment>
      <Header />
      {state.speakingApi.dataSpeaking[0] && (
        <DetailSkills data={state.speakingApi.dataSpeaking} />
      )}
      <Footer />
    </Fragment>
  );
};

export default DetailSkill;
