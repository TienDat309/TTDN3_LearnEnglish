import React, { useContext, useEffect } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import {
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaUserPlus,
} from 'react-icons/fa';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
import styles from './RightContent.module.css';
import { GlobalState } from '../../../GlobalState';
import { useState } from 'react';
import axios from 'axios';

const RightContent = () => {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const state = useContext(GlobalState);
  const [dataUser] = state.userTotalApi.dataUser;

  const [topicData, setTopicData] = useState({
    data: [],
    skills: 0,
    grammars: 0,
    vocabularies: 0,
  });

  const getTopicData = async () => {
    const res = await axios.get('http://localhost:5000/api/topics/dashboard');

    if (res.data) {
      console.log(res.data);
      let skills = 0;
      let grammars = 0;
      let vocabularies = 0;
      let topics = [];

      res.data.forEach((type) => {
        if (type._id === 'grammar') {
          grammars += type.count;
        } else if (type._id === 'vocabulary') {
          vocabularies += type.count;
        } else {
          skills += type.count;
        }
        topics = [...topics, ...type.topic];
      });

      topics.sort((a, b) => {
        return new Date(b.dateCreate) - new Date(a.dateCreate);
      });
      setTopicData({
        data: topics,
        skills,
        grammars,
        vocabularies,
      });
    }
  };

  useEffect(() => {
    getTopicData();
  }, []);

  if (!dataUser.length) {
    return <div></div>;
  }

  return (
    <div>
      <HeaderSideBar />
      <div className={styles.widgetMain}>
        <div className={styles.widget}>
          <div
            className={styles.widgetMini}
            style={{ backgroundColor: '#30344c' }}
          >
            <FaUserPlus />
          </div>
          <div className={styles.information}>
            <span>Followers</span>
            <h2>+{dataUser && dataUser.length}</h2>
          </div>
          <div className={styles.line}></div>
          <div className={styles.textInfor}>
            <span>Just updated</span>
          </div>
        </div>

        <div className={styles.widget}>
          <div
            className={styles.widgetMini}
            style={{ backgroundColor: '#44a0f0' }}
          >
            <FaChartArea />
          </div>
          <div className={styles.information}>
            <span>Skills</span>
            <h2>+{topicData.skills}</h2>
          </div>
          <div className={styles.line}></div>
          <div className={styles.textInfor}>
            <span>Just updated</span>
          </div>
        </div>

        <div className={styles.widget}>
          <div
            className={styles.widgetMini}
            style={{ backgroundColor: '#60b464' }}
          >
            <FaChartBar />
          </div>
          <div className={styles.information}>
            <span>Grammars</span>
            <h2>+{topicData.grammars}</h2>
          </div>
          <div className={styles.line}></div>
          <div className={styles.textInfor}>
            <span>Just updated</span>
          </div>
        </div>

        <div className={styles.widget}>
          <div
            className={styles.widgetMini}
            style={{ backgroundColor: '#f03c74' }}
          >
            <FaChartLine />
          </div>
          <div className={styles.information}>
            <span>Vocabulary</span>
            <h2>+{topicData.vocabularies}</h2>
          </div>
          <div className={styles.line}></div>
          <div className={styles.textInfor}>
            <span>Just updated</span>

            {/* <span>
              <strong style={{ color: "#68bc64" }}>+3%</strong> than last month
            </span> */}
          </div>
        </div>
      </div>

      <div className={styles.widgetTopic}>
        {topicData.data.slice(0, 3).map((item, index) => (
          <div className={styles.widgetTopicMini} key={index}>
            <div className={styles.widgetMini}>
              <img src={item.image} alt='' />
            </div>
            <div className={styles.information}>
              <h4>{item.name}</h4>
              <span>{item.typeSlug}</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.textInfor}>
              <span>
                <AiOutlineClockCircle />{' '}
                {new Date(item.dateCreate).toLocaleDateString('en-US', options)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.widgetTopicSecond}>
        {topicData.data.slice(3, 6).map((item, index) => (
          <div className={styles.widgetTopicMini} key={index}>
            <div className={styles.widgetMini}>
              <img src={item.image} alt='' />
            </div>
            <div className={styles.information}>
              <h4>{item.name}</h4>
              <span>{item.typeSlug}</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.textInfor}>
              <span>
                <AiOutlineClockCircle />{' '}
                {new Date(item.dateCreate).toLocaleDateString('en-US', options)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightContent;
