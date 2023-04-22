import React from "react";
import styles from "../Header.module.css";

const IntroBySkills = () => {
  return (
    <div>
      <h1>
        Practise Your Reading & <br />
        <span>Writing</span> <br /> Listening And Speaking
      </h1>
      <p className={styles.par}>
        Here you can find practice materials and activities to improve your
        English speaking, <br />
        listening, reading and writing skills. Improving your skills will help
        you
        <br />
        use English more effectively so that you can do well in your studies.
      </p>
    </div>
  );
};

export default IntroBySkills;
