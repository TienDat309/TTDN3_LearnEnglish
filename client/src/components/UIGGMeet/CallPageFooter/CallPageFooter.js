import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faPhone,
  faAngleUp,
  faClosedCaptioning,
  faDesktop,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./CallPageFooter.module.scss";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  isCame,
  toggleCame,
  disconnectCall,
}) => {
  return (
    <div className={styles.footerItem}>
      <div className={styles.leftItem}>
        <div className={styles.iconBlock}>
          Meeting details
          <FontAwesomeIcon className={styles.icon} icon={faAngleUp} />
        </div>
      </div>
      <div className={styles.centerItem}>
        <div
          className={`${styles.iconBlock} ${!isAudio ? `${styles.redBg}` : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={isAudio ? faMicrophone : faMicrophoneSlash}
          />
        </div>
        <div className={styles.iconBlock} onClick={disconnectCall}>
          <FontAwesomeIcon className={`${styles.icon} ${styles.redBg}`} icon={faPhone} />
        </div>
        <div className={`${styles.iconBlock} ${!isCame ? `${styles.redBg}` : null}`}
        onClick={() => toggleCame(!isCame)}>
          <FontAwesomeIcon className={styles.icon}
          icon={isCame ? faVideo : faVideoSlash} />
        </div>
      </div>
      
      <div className={styles.rightItem}>
        <div className={styles.iconBlock}>
          <FontAwesomeIcon className={`${styles.icon} ${styles.redBg}`} icon={faClosedCaptioning} />
          <p className={styles.title}>Turn on captions</p>
        </div>

        {isPresenting ? (
          <div className={styles.iconBlock} onClick={stopScreenShare}>
            <FontAwesomeIcon className={`${styles.icon} ${styles.redBg}`} icon={faDesktop} />
            <p className={styles.title}>Stop presenting</p>
          </div>
        ) : (
          <div className={styles.iconBlock} onClick={screenShare}>
            <FontAwesomeIcon className={`${styles.icon} ${styles.redBg}`} icon={faDesktop} />
            <p className={styles.title}>Present now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPageFooter;
