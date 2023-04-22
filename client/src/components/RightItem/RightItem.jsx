import React from "react";
import styles from "./RightItem.module.css";
import Image1 from "../../images/EST-LE-productpage-newyear-jan22-1280x500.jpg";
import Image2 from "../../images/RS5969_459929141-low_1.jpg";
import Image3 from "../../images/RS8751_GettyImages-1072206958.jpg";
import { Link } from "react-router-dom";

const RightItem = () => {
  return (
    <div style={{width:'100%'}}>
      
      <div className={styles.containImage}>
        <img src={Image3} alt="" />
        <div className={styles.BoxText}>
          <Link to={""} className={styles.text}>
            Self-study online
            <br /> courses
          </Link>
        </div>
      </div>

      <div className={styles.containImage}>
        <img src={Image2} alt="" />
        <div className={styles.BoxText}>
          <Link to={""} className={styles.text}>
            Live online classes
          </Link>
        </div>
      </div>

      <div className={styles.containImage}>
        <img src={Image1} alt="" />
        <div className={styles.BoxText}>
          <Link to={""} className={styles.text}>
            Personal online tutoring
          </Link>
        </div>
      </div>

      <div className={styles.containOur}>
        <h2>Our websites</h2>
        <ul className={styles.items}>
          <li>
            <Link to={""} className={styles.textLink}>
              LearnEnglish Kids for children aged 5 to 12
            </Link>
          </li>
          <li>
            <Link to={""} className={styles.textLink}>
              LearnEnglish Teens for children aged 13 to 17
            </Link>
          </li>
          <li>
            <Link to={""} className={styles.textLink}>
              TeachingEnglish for teachers and teacher educators
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.containHelp}>
        <h2>Help</h2>
        <ul className={styles.items}>
          <li>
            <Link to={""} className={styles.textLink}>
              Discover your English level
            </Link>
          </li>
          <li>
            <Link to={""} className={styles.textLink}>
              Frequently asked questions
            </Link>
          </li>
          <li>
            <Link to={""} className={styles.textLink}>
              Getting started with our free resources
            </Link>
          </li>
          <li>
            <Link to={""} className={styles.textLink}>
              House rules
            </Link>
          </li>
          <li>
            <Link to={""} className={styles.textLink}>
              Sign up for our newsletter
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightItem;
