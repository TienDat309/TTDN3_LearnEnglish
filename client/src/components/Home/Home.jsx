import { Fragment } from "react";
import CheckGrByText from "../CheckGrammarByText/CheckGrammarByText";
import Header from "../../components/Headers/Header";
import Footer from "../../components/Footer/Footer"
import MoreGrammarChecker from '.././MoreGrammarChecker/MoreGrammarChecker'
import CheckGrammarByImage from '.././CheckGrammarByImage/CheckGrammarByImage'

const Home = () => {
  return (
    <Fragment>
      <Header/>
       <CheckGrByText/>
       <CheckGrammarByImage/>
       <MoreGrammarChecker/>
      <Footer/>
    </Fragment>
  );
};

export default Home;
