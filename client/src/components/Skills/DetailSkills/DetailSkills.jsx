import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RightItem from '../../RightItem/RightItem';
import SkillItem from '../../RightItem/SkillItem/SkillItem';
import styles from './DetailSkills.module.css';
import style from '../../LessonCard/LessonCard.module.css';
import LessonCard from '../../LessonCard/LessonCard';

const DetailSkills = (props) => {
  const [data, setdata] = useState(props.data);
  console.log(data);
  const [dataContentType, setdataContentType] = useState([]);
  const [dataLevel, setdataLevel] = useState([]);

  const formatData = (str) => {
    let strTemp = str;
    let data = strTemp[str.length - 1] + strTemp[str.length - 2];
    return data.split('').reverse().join('');
  };

  function compare(a, b) {
    if (formatData(a.level.nameLevel) < formatData(b.level.nameLevel)) {
      return -1;
    }
    if (formatData(a.level.nameLevel) > formatData(b.level.nameLevel)) {
      return 1;
    }
    return 0;
  }

  // useEffect(() => {
  //   setdata(props.data);
  //   if (props.data[0].length !== 0) {
  //     setdataContentType(props.data[0][0].contentType.split('\n\n'));
  //     const arrayUniqueByKey = [
  //       ...new Map(
  //         data[0].map((item) => [item.level.nameLevel, item])
  //       ).values(),
  //     ];
  //     arrayUniqueByKey.sort(compare);
  //     setdataLevel(arrayUniqueByKey);
  //   }
  // }, [props.data, data]);

  if (!data[0]) {
    return <div>Loading</div>;
  }

  return (
    <div className='grid wide'>
      <div className='row'>
        <div className='col l-9 m-12 c-12'>
          <div className={styles.heading}>
            <p className={styles.depthLink}>
              <Link to='/skill'>Skills</Link>
              <span> {'>'} </span>
              <span>{data[0]?.name}</span>
            </p>
            <div className={styles.line}></div>
            <h1
              style={{ color: '#23085A', margin: '30px 0 0 0', fontSize: 36 }}
            >
              {data[0]?.name}
            </h1>
          </div>
          <img
            src={data[0]?.image}
            alt={data[0]?.name}
            style={{ width: '100%' }}
          />

          <div className={styles.colorMain}>
            <div className={styles.blockColor1}></div>
            <div className={styles.blockColor2}>
              <p>Are you looking for a face-to-face English course near you?</p>
              <button>
                <Link
                  className={styles.textMeeting}
                  to={'/meeting'}
                  target={'_blank'}
                >
                  Meeting
                </Link>
              </button>
            </div>
            <div className={styles.blockColor3}></div>
          </div>

          <div className={styles.textIntro}>
            <p dangerouslySetInnerHTML={{ __html: data[0]?.content }}></p>
            <h2>
              Choose your level to practise your {(data[0]?.name).toLowerCase()}
            </h2>
          </div>

          <div className={styles.containerLesson}>
            {data[0]?.levels.map((item, index) => (
              <LessonCard key={index} {...item} />
            ))}
          </div>

          {/* <div className={styles.contain}>
            {dataLevel.map((item, index) => (
              <div
                className={style.viewRow}
                key={index}
                style={{ margin: "40px 0 0 0" }}
              >
                <div className={style.imageFile}>
                  <img src={item?.level?.images} alt="" />
                </div>
                <div className={style.textView}>
                  <Link to={item?.level?.slugLevel || " "}>
                    <h2>{item?.level?.nameLevel}</h2>
                  </Link>
                  <p>
                    {item?.level?.contentLevel.substring(
                      0,
                      item?.level?.contentLevel.indexOf(".") + 1
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <div className='col l-3 m-12 c-12' style={{ marginTop: 193 }}>
          <SkillItem />
          <RightItem />
        </div>
      </div>
    </div>
  );
};

export default DetailSkills;
