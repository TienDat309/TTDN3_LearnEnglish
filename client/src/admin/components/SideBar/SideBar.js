import React from "react";
import styles from "./SideBar.module.css";
import {
  FaMicrosoft,
  FaUser,
  FaSignInAlt,
  FaOutdent,
  FaRegListAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  const eventLogout = () => {
    localStorage.removeItem("AdminLogin");
    window.location.href = "/admin";
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>ADMIN CONTROL</div>
        <div className={styles.line}></div>
        <div className={styles.items}>
          <ul className={styles.item}>
            <li className={styles.active}>
              <div className={styles.elementItem}>
                <FaMicrosoft className={styles.iconLeft} />
                <Link to={"/dashboard"} className={styles.element}>
                  Dashboard
                </Link>
              </div>
            </li>
            <li>
              <div className={styles.elementItem}>
                <FaRegListAlt className={styles.iconLeft} />{" "}
                <Link to={"/types"} className={styles.element}>
                  Data
                </Link>
              </div>
            </li>
            <li>
              <div className={styles.elementItem}>
                <FaUser className={styles.iconLeft} />{" "}
                <Link to={""} className={styles.element}>
                  Profile
                </Link>
              </div>
            </li>
            <li>
              <div className={styles.elementItem}>
                <FaOutdent className={styles.iconLeft} />{" "}
                <Link
                  to={"/logoutadmin"}
                  className={styles.element}
                  onClick={eventLogout}
                >
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
