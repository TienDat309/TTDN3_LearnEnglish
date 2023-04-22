import { React, Fragment, useContext } from 'react';
import Header from '../../components/Headers/Header';
import Footer from '../../components/Footer/Footer';
import Vocabulary from '../../components/Voccabulary/Vocabulary';
import { GlobalState } from '../../GlobalState';

const Voc = () => {
  const state = useContext(GlobalState);
  return (
    <Fragment>
      <Header />
      {state.vocabularyApi.vocData[0] && (
        <Vocabulary data={state.vocabularyApi.vocData} />
      )}
      <Footer />
    </Fragment>
  );
};

export default Voc;
