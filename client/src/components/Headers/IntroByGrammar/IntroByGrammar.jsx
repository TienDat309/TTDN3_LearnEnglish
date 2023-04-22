import React from "react";
import styles from "../Header.module.css";

const IntroByGrammar = () => {
  return (
    <div>
      <h1>
        Grammar Online & <br />
        <span>Improve</span> <br /> Language Level
      </h1>
      <p className={styles.par}>
        Revise and practise your grammar to help you increase your confidence{" "}
        <br />
        and improve your language level.Practise your English grammar
        <br />
        with clear grammar explanations.
      </p>
    </div>
  );
};

export default IntroByGrammar;
