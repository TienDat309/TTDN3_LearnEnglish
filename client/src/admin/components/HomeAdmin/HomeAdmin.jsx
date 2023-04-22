import React from "react";
import RightContent from "../RightContent/RightContent";
import SideBar from "../SideBar/SideBar";
import styles from "./HomeAdmin.module.css";

const HomeAdmin = () => {
  return (
    <div className={styles.home}>
      <div className={styles.leftContent}>
        <SideBar />
      </div>
      <div className={styles.rightContent}>
        <RightContent />
      </div>
    </div>
  );
};

export default HomeAdmin;
