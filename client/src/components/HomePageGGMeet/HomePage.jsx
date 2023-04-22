import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faKeyboard,
  faCalendarAlt,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import shortid from 'shortid';
import styles from './HomePage.module.scss';
import HeaderHomeGGMeet from '../UIGGMeet/HeaderHomeGGMeet/HeaderHomeGGMeet';

const HomePage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = React.useState('');
  const [code, setCode] = React.useState('');

  const startCall = () => {
    const uid = shortid.generate();
    // navigate(`/meeting/${uid}`);
    navigate(`/meeting-room`, { state: { roomId: uid } });
  };

  const joinRoom = () => {
    // navigate(`/meeting/${code}`);
    navigate(`/meeting-room`, { state: { roomId: code } });
  };

  return (
    <div className={styles.home}>
      <HeaderHomeGGMeet />
      <div className={styles.body}>
        <div className={styles.leftSide}>
          <div className={styles.content}>
            <h2>Premium video meetings. Now free for everyone.</h2>
            <p>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </p>
            <div className={styles.actionBtn}>
              <Popup
                trigger={
                  <button className={`${styles.btn} ${styles.green}`}>
                    <FontAwesomeIcon
                      className={styles.iconBlock}
                      icon={faVideo}
                    />
                    New Meeting
                  </button>
                }
                position='bottom left'
                nested
              >
                <ul className={styles.menu}>
                  <li onClick={startCall} className={styles.menuItem}>
                    <FontAwesomeIcon
                      className={styles.iconBlock}
                      style={{ marginRight: 20 }}
                      icon={faVideo}
                    />
                    Start an instant meeting
                  </li>
                  <Popup
                    trigger={
                      <li className={styles.menuItem}>
                        <FontAwesomeIcon
                          className={styles.iconBlock}
                          style={{ marginRight: 20 }}
                          icon={faCalendarAlt}
                        />
                        Create a meeting for later
                      </li>
                    }
                    modal
                    onOpen={() => {
                      setUrl(shortid.generate());
                    }}
                  >
                    <div className={styles.MeetingInfoBlock}>
                      <p className={styles.inforText}>
                        Share this meeting link with others you want in the
                        meeting
                      </p>
                      <div className={styles.meetLink}>
                        <span>{url}</span>
                        <FontAwesomeIcon
                          className={styles.icon}
                          icon={faCopy}
                          onClick={() => navigator.clipboard.writeText(url)}
                        />
                      </div>
                    </div>
                  </Popup>
                </ul>
              </Popup>
              <div className={styles.inputBlock}>
                <div className={styles.inputSection}>
                  <FontAwesomeIcon
                    className={styles.iconBlock}
                    icon={faKeyboard}
                  />
                  <input
                    placeholder='Enter a code or link'
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <button className={styles.btn} onClick={joinRoom}>
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className={styles.helpText}>
            <a href=''>Learn more</a> about Google Meet
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <img
              src='https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
