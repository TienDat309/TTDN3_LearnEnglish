import React from "react";
import styles from "../Header.module.css";

const IntroByDictionnary = () => {
  return (
    <div>
      <h1>
        Dictionnary Online & <br />
        <span>Meanings</span> <br /> Audio
      </h1>
      <p className={styles.par}>
      Dictionary is the world's leading online source for English definitions, <br />
      synonyms, word origins and etymologies, audio pronunciations,<br />
      example sentences.
      </p>
    </div>
  );
};

export default IntroByDictionnary;
