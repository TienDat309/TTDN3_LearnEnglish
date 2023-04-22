import axios from 'axios';
import { React, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import styles from './PaymentHistory.module.css';

const PaymentHistory = () => {
  const state = useContext(GlobalState);
  const user = state.userApi.user[0];
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const payment = await axios.get(
      'http://localhost:5000/api/getpayment?studentId=' + user._id
    );

    console.log(payment);
    if (payment.data) {
      setData(payment.data);
    }
  };

  return (
    <div className={styles.schedule}>
      {data.map((items, index) => (
        <div className={styles.containImage} key={index}>
          <img
            src={
              'https://images.unsplash.com/photo-1615412704911-55d589229864?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80'
            }
            alt=''
          />
          <div className={styles.BoxText}>
            <p>
              <Link to={''} className={styles.text}>
                {items.meeting?.nameTopic}
              </Link>
            </p>
            <p>Teacher: {items.meeting?.nameLectures}</p>
            <p>
              Category:{' '}
              {items.meeting?.nameSkills?.substring(0, 1).toUpperCase()}
              {items.meeting?.nameSkills?.substring(1)}
            </p>
            <p>Level: {items.meeting?.levelSkill}</p>
            <p>Date: {items.meeting?.dayCreate}</p>
            <p>
              Time: {items.meeting?.hourCreate} - {items?.endTime}
            </p>
            <p>Cost: {items.meeting?.costTopic}$</p>
            <p>Date of payment: {new Date(items?.time).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
