import { Fragment, React, useEffect } from "react";
import styles from "./Header.module.css";
import IntroByDictionnary from "./IntroByDictionnary/IntroByDictionnary";
import IntroByGrammar from "./IntroByGrammar/IntroByGrammar";
import IntroByHome from "./IntroByHome/IntroByHome";
import IntroBySkill from "./IntroBySkills/IntroBySkills";
import IntroByVoc from "./IntroByVocbulary/IntroByVocbulary";
import Navbar from "./Navbar/Navbar";
import TwoItems from "./TwoItemsLogin&Regis/MenuLoginRegis";

const Header = () => {
  const url = `${window.location.pathname}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var str = "/";
  for (let i = 1; i < url.length; i++) {
    if (url[i] === "/") break;
    str += url[i];
  }
  const isHome = str === "/" ? true : false;
  const isSkill = str === "/skill" ? true : false;
  const isGrammar = str === "/grammar" ? true : false;
  const isVocabulary = str === "/vocabulary" ? true : false;
  const isDictionnary = str === "/dictionnary" ? true : false;
  const isLogin = str === "/Login" ? true : false;
  const isRegister = str === "/Register" ? true : false;
  const isSearch = str === "/search" ? true : false;
  const isBooking = str === "/booking" ? true : false;


  return (
    <Fragment>
      <div className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          {/* {isHome ? <TwoItems /> : ""} */}
          {isHome || isLogin || isRegister || isSearch ||isBooking ? <IntroByHome /> : ""}
          {isSkill ? <IntroBySkill /> : ""}
          {isGrammar ? <IntroByGrammar /> : ""}
          {isVocabulary ? <IntroByVoc /> : ""}
          {isDictionnary ? <IntroByDictionnary /> : ""}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
