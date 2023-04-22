import { Fragment, React, useContext } from 'react';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Headers/Header';
import DetailSkills from '../../../components/Skills/DetailSkills/DetailSkills';
import { GlobalState } from '../../../GlobalState';

const DetailSkill = () => {
  const state = useContext(GlobalState);

  return (
    <Fragment>
      <Header />
      {state.writingApi.dataWriting[0] && (
        <DetailSkills data={state.writingApi.dataWriting} />
      )}
      <Footer />
    </Fragment>
  );
};

export default DetailSkill;
