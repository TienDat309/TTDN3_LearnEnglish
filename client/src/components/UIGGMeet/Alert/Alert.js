import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./Alert.module.scss";

const Alert = ({ messageAlert }) => {
  return (
    <div className={styles.messageAlertPopup}>
      <div className={styles.alertHeader}>
        <FontAwesomeIcon className={styles.icon} icon={faCommentAlt} />
        <h3>{messageAlert.payload.user}</h3>
      </div> 
      <p className={styles.alertMsg}>{messageAlert.payload.msg}</p>
    </div>
  );
};

export default Alert;
