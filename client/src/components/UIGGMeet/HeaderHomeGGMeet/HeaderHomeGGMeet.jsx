import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faExclamationCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import styles from './HeaderHomeGGMeet.module.scss';

const HeaderHomeGGMeet = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png" />
        <span className={styles.helpText}>Meet</span>
      </div>
      <div className={styles.actionBtn}>
        <FontAwesomeIcon className={styles.iconBlock} icon={faQuestionCircle} />
        <FontAwesomeIcon className={styles.iconBlock} icon={faExclamationCircle} />
        <FontAwesomeIcon className={styles.iconBlock} icon={faCog} />
      </div>
    </div>
  );
};
export default HeaderHomeGGMeet;
