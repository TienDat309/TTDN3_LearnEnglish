import { React, Fragment, useContext } from 'react';
import Header from '../../components/Headers/Header';
import Footer from '../../components/Footer/Footer';
import Grammar from '../../components/Grammar/Grammar';
import { GlobalState } from '../../GlobalState';

const Grammars = () => {
  const state = useContext(GlobalState);
  return (
    <Fragment>
      <Header />
      {state.grammarApi.dataGrammar[0] && (
        <Grammar data={state.grammarApi.dataGrammar} />
      )}
      <Footer />
    </Fragment>
  );
};

export default Grammars;
