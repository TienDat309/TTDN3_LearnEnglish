import React from "react";
import { AiFillSetting, AiTwotoneBell } from "react-icons/ai";
import { FaHome, FaUserCircle } from "react-icons/fa";
import styles from "./HeaderSideBar.module.css";
import { useLocation } from "react-router-dom";

const HeaderSideBar = () => {
  const location = useLocation();

  return (
    <div className={styles.headerRight}>
      <div className={styles.leftItem}>
        <div>
          <FaHome style={{ color: "#a8a4ac", fontSize: 15 }} />
          {"  "}
          <span>/ {location.pathname.substring(1)}</span>
        </div>
      </div>
      <div className={styles.rightItem}>
        <div>
          <input placeholder="Search here" />
        </div>
        <div className={styles.iconRightItem}>
          <span>
            <FaUserCircle style={{ fontSize: 19 }} />
          </span>
          <span>
            <AiFillSetting />
          </span>
          <span>
            <AiTwotoneBell />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderSideBar;
