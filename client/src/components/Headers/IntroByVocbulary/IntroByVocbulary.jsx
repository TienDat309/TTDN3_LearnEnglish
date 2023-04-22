import React from "react";
import styles from "../Header.module.css";

const IntroByVocbulary = () => {
  return (
    <div>
      <h1>
        Vocabulary Test & <br />
        <span>Learn New Words</span> <br /> Audio
      </h1>
      <p className={styles.par}>
        Do you need to learn new words to understand and express yourself
        clearly in English? <br />
        In this section you will find activities to help you learn the meaning,
        <br />
        pronunciation and spelling of new words.
      </p>
    </div>
  );
};

export default IntroByVocbulary;
