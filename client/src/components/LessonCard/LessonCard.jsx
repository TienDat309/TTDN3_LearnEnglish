import React from "react";
import { Link } from "react-router-dom";
import styles from "./LessonCard.module.css";
export default function LessonCard(props) {
  return (
    <div
      className={styles.viewRow}
      key={props._id}
      style={{ margin: "40px 0 0 0" }}
    >
      <div className={styles.imageFile}>
        <img src={props?.image} alt="" />
      </div>
      <div className={styles.textView}>
        <Link to={props?.slug || " "}>
          <h2>{props?.name}</h2>
        </Link>
        <p style={{marginLeft: 'auto'}} dangerouslySetInnerHTML={{__html: props?.content?.substring(0, props?.content.indexOf("</p>") + 4)}}>
        </p>
      </div>
    </div>
  );
}
