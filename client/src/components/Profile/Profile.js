import axios from 'axios';
import { React, useContext, useEffect, useRef, useState } from 'react';
import styles from './Profile.module.css';
import SideBar from '../SideBar/SideBar';
import EditInformation from '../EditInformation/EditInformation';
import ResetPassword from '../ResetPassword/ResetPassword';
import ResetEmail from '../ResetEmail/ResetEmail';
import PaymentHistory from '../PaymentHistory/PaymentHistory';

const Profile = () => {
  const [page, setPage] = useState('info')

  return (
    <div className={styles.containerRegister}>
      <SideBar page={page} setPage={setPage} />
      {page === 'info' && <EditInformation/>}
      {page === 'pass' && <ResetPassword/>}
      {page === 'email' && <ResetEmail/>}
      {page === 'history' && <PaymentHistory/>}
    </div>
  );
};

export default Profile;
