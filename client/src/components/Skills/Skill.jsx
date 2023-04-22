import { React } from "react";
import ListItem from "../ListItem/ListItem";
import LevelRightItem from "../RightItem/LevelRightItem/LevelRightItem";
import RightItem from "../RightItem/RightItem";
import styles from "./skill.module.css";
const Skill = () => {
  return (
    <div className="grid wide" style={{marginTop:60}}>
      <div className="row">
        <div className="col l-9 m-12 c-12">
          <p className={styles.intro}>
            Here you can find practice materials and activities to improve your
            English speaking, listening, reading and writing
            <br />
            skills. Improving your skills will help you use English more
            effectively so that you can do well in your studies, get
            <br />
            ahead at work and confidently communicate in English in your free
            time.
          </p>
          <div className={styles.elementTwo}>
            <h1>How to improve your English proficiency</h1>
            <p>
              To build your vocabulary and develop your English communication
              skills, practice and study are essential.
              <br />
              Working through practice activities and regularly reviewing the
              new language you learn can help you accelerate
              <br />
              your knowledge and understanding of English.
            </p>
          </div>
          <div className={styles.elementThrre}>
            <h1>Take a self-study course online</h1>
            <p>
              You can get unlimited access to helpful learning materials and
              activities when you subscribe to LearnEnglish
              <br />
              Select - a flexible, online way of learning English.
            </p>
            <ul className={styles.listItem}>
              <li>Study at your own pace.</li>
              <li>
                Access lessons whenever and wherever you want, for as long as
                you like.
              </li>
              <li>Receive exclusive new content every month.</li>
              <li>
                Improve your business English proficiency for new career
                opportunities.
              </li>
            </ul>
            <p>
              To fast-track your English language education, simply select a
              plan and subscribe today.
            </p>
          </div>
          <div className={styles.elementFour}>
            <h1>Choose the skill you want to practise</h1>
            <p>
              The self-study lessons in these sections are written and organised
              according to the levels of the Common
              <br />
              European Framework of Reference for languages (CEFR). There are
              different types of texts, recordings and
              <br />
              videos with interactive exercises and worksheets that practise the
              skills you need.
            </p>
            <p>
              Choose the skill you want to practise today and improve your
              English at your own speed, whenever it's
              <br />
              convenient for you.
            </p>
          </div>
          <div className={styles.contain}>
            <ListItem />
          </div>
        </div>
        <div className="col l-3 m-12 c-12">
          <LevelRightItem
            level1={"Listening"}
            level2={"Reading"}
            level3={"Writing"}
            level4={"Speaking"}
            sluglevel1={"/skill/listening"}
            sluglevel2={"/skill/reading"}
            sluglevel3={"/skill/writing"}
            sluglevel4={"/skill/speaking"}
          />
          <RightItem />
        </div>
      </div>
    </div>
  );
};

export default Skill;
