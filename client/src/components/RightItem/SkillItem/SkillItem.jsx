import { React, useState, useEffect } from "react";
import styles from "./SkillItem.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

var num = 1;
const SkillItem = () => {
  const [dataMenu, setdataMenu] = useState(num);
  const [link, setlink] = useState(num);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let temp = location.pathname.split("/");
    setlink(`/${temp[1]}/${temp[2]}`);
  }, []);
  const handleChange = (e) => {
    let temp = e.target.title.split("-");
    num = parseInt(temp[0]);
    setdataMenu(num);
    navigate(`/skill/${temp[1]}`);
  };
  const list = (
    <div>
      <li>
        <Link to={`${link}/beginnera1`} className={styles.item}>
          Beginner A1
        </Link>
      </li>
      <li>
        <Link
          to={`${link}/pre-intermediate-a2`}
          className={styles.item}
        >
          Pre-intermediate A2
        </Link>
      </li>
      <li>
        <Link
          to={`${link}/Intermediate-B1`}
          className={styles.item}
        >
          Intermediate B1
        </Link>
      </li>
      <li>
        <Link
          to={`${link}/Upper-intermediate-B2`}
          className={styles.item}
        >
          Upper intermediate B2
        </Link>
      </li>
      <li>
        <Link to={`${link}/Advanced-C1`} className={styles.item}>
          Advanced C1
        </Link>
      </li>
    </div>
  );
  return (
    <div className={styles.containList}>
      <ul className={styles.items}>
        <p onClick={(e) => handleChange(e)} title="1-listening">
          Listening
        </p>
        {dataMenu === 1 ? list : ""}
      </ul>
      <ul className={styles.items}>
        <p onClick={(e) => handleChange(e)} title="2-reading">
          Reading
        </p>
        {dataMenu === 2 ? list : ""}
      </ul>
      <ul className={styles.items}>
        <p onClick={(e) => handleChange(e)} title="3-writing">
          Writing
        </p>
        {dataMenu === 3 ? list : ""}
      </ul>
      <ul className={styles.items}>
        <p onClick={(e) => handleChange(e)} title="4-speaking">
          Speaking
        </p>
        {dataMenu === 4 ? list : ""}
      </ul>
    </div>
  );
};

export default SkillItem;
