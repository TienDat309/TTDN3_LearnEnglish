import { useState } from "react";
import styles from "./Messenger.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserFriends,
  faCommentAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../utils/helpers";

const Messenger = ({ setIsMessenger, sendMsg, messageList, roomSize }) => {
  const [msg, setMsg] = useState("");

  const handleChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = () => {
    sendMsg(msg);
    setMsg("");
  };

  return (
    <div className={styles.messengerContainer}>
      <div className={styles.messengerHeader}>
        <h3>Meeting chat</h3>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTimes}
          onClick={() => {
            setIsMessenger(false);
          }}
        />
      </div>

      <div className={styles.messengerHeaderTabs}>
        <div className={styles.tab}>
          <FontAwesomeIcon className={styles.icon} icon={faUserFriends} />
          <p>People ({roomSize})</p>
        </div>
        <div className={`${styles.tab} ${styles.active}`}>
          <FontAwesomeIcon className={styles.icon} icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>

      <div className={styles.chatSection}>
        {messageList.map((item) => (
          <div key={item.time} className={styles.chatBlock}>
            <div className={styles.sender}>
            {item.user} <small>{formatDate(item.time)}</small>
            </div>
            <p className={styles.msg}>{item.msg}</p>
          </div>
                ))}
      </div>

      <div className={styles.sendMsgSection}>
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={(e) => handleChangeMsg(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={faPaperPlane}
          onClick={handleSendMsg}
        />
      </div>
    </div>
  );
};

export default Messenger;
