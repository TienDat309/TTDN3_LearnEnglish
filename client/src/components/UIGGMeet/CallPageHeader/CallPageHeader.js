import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCommentAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./CallPageHeader.module.scss";
import { formatDate } from "../../../utils/helpers";

const CallPageHeader = ({
  isMessenger,
  setIsMessenger,
  messageAlert,
  setMessageAlert,
}) => {
  let interval = null;
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.frameHeader}>
      <div className={`${styles.headerItems} ${styles.iconBlock}`}>
        <FontAwesomeIcon className={styles.icon} icon={faUserFriends} />
      </div>
      <div
        className={`${styles.headerItems} ${styles.iconBlock}`}
        onClick={() => {
          setIsMessenger(true);
          setMessageAlert({});
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faCommentAlt} />
        {!isMessenger && messageAlert.alert && (
          <span className={styles.alertCircleIcon}></span>
         )}
      </div>
      <div className={`${styles.headerItems} ${styles.dateBlock}`}>{currentTime}</div>
      <div className={`${styles.headerItems} ${styles.iconBlock}`}>
        <FontAwesomeIcon className={`${styles.icon} ${styles.profile}`} icon={faUserCircle} />
      </div>
    </div>
  );
};

export default CallPageHeader;
