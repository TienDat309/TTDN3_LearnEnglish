import { React, Fragment, useContext } from 'react';
import Header from '../../../components/Headers/Header';
import Footer from '../../../components/Footer/Footer';
import DetailSkills from '../../../components/Skills/DetailSkills/DetailSkills';
import { GlobalState } from '../../../GlobalState';

const DetailSkillListening = () => {
  const state = useContext(GlobalState);

  return (
    <Fragment>
      <Header />
      {state.listeningApi.dataListening[0] && (
        <DetailSkills data={state.listeningApi.dataListening} />
      )}
      <Footer />
    </Fragment>
  );
};

export default DetailSkillListening;
