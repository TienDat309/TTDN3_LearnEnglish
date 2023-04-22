import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footerCol}>
              <h4>Grammar</h4>
              <ul>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Beginner to pre-intermediate
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Intermediate to upper intermediate
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    English grammar reference
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Personal online tutoring
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Skills</h4>
              <ul>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Reading With Topic
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Writing With Topic
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Listening With Video
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Speaking With Video
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Vocabulary</h4>
              <ul>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Beginner to pre-intermediate
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Intermediate to upper intermediate
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    English grammar reference
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkFooter} to={""}>
                    Personal online tutoring
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Follow Us</h4>
              <div className={styles.socialLinks}>
                <Link className={styles.linkFooter} to={""}>
                  <FaFacebook />
                </Link>
                <Link className={styles.linkFooter} to={""}>
                  <FaYoutube />
                </Link>
                <Link className={styles.linkFooter} to={""}>
                  <FaTwitter />
                </Link>
                <Link className={styles.linkFooter} to={""}>
                  <FaTwitch />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
