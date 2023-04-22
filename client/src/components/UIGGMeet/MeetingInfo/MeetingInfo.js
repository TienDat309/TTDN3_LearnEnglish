import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,
  faUser,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./MeetingInfo.module.scss";

const MeetingInfo = ({setMeetInfoPopup,url}) => {
  return (
    <div className={styles.MeetingInfoBlock}>
      <div className={styles.meetingHeader}>
        <h3>Your meeting's ready</h3>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>
      <button className={styles.addPeopleBtn}>
        <FontAwesomeIcon className={styles.icon}icon={faUser} />
        Add Others
      </button>
      <p className={styles.inforText}>
        Or share this meeting link with others you want in the meeting
      </p>
      <div className={styles.meetLink}>
      <span>{url}</span>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faCopy}
          onClick={() => navigator.clipboard.writeText(url)}
        />
      </div>
      <div className={styles.permissionText}>
        <FontAwesomeIcon className={`${styles.icon} ${styles.red}`} icon={faShieldAlt} />
        <p className={styles.smallText}>
          People who use this meeting link must get your permission before they
          can join.
        </p>
      </div>
    </div>
  );
};

export default MeetingInfo;
