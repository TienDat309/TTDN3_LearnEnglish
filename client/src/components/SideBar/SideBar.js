import React, { useContext } from 'react';
import styles from './SideBar.module.css';
import { FaUser, FaHistory } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

const SideBar = (props) => {
  const state = useContext(GlobalState);
  const [user] = state.userApi.user;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Profile</div>
        <div className={styles.line}></div>
        <div className={styles.items}>
          <ul className={styles.item}>
            <li className={props.page === 'info' ? styles.active : ''}>
              <div className={styles.elementItem}>
                <FaUser className={styles.iconLeft} />
                <Link
                  onClick={() => props.setPage('info')}
                  className={styles.element}
                >
                  Edit Profile
                </Link>
              </div>
            </li>
            <li className={props.page === 'pass' ? styles.active : ''}>
              <div className={styles.elementItem}>
                <RiLockPasswordFill className={styles.iconLeft} />{' '}
                <Link
                  onClick={() => props.setPage('pass')}
                  className={styles.element}
                >
                  Reset Password
                </Link>
              </div>
            </li>
            <li className={props.page === 'email' ? styles.active : ''}>
              <div className={styles.elementItem}>
                <MdEmail className={styles.iconLeft} />{' '}
                <Link
                  onClick={() => props.setPage('email')}
                  className={styles.element}
                >
                  Reset Email
                </Link>
              </div>
            </li>
            {user && user.position === 'student' && (
              <li className={props.page === 'history' ? styles.active : ''}>
                <div className={styles.elementItem}>
                  <FaHistory className={styles.iconLeft} />{' '}
                  <Link
                    onClick={() => props.setPage('history')}
                    className={styles.element}
                  >
                    History
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
