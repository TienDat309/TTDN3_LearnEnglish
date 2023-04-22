import React, { useEffect } from 'react';
import { useState } from 'react';
import { Accordion } from 'react-accessible-accordion';
import { Link } from 'react-router-dom';
import LevelRightItem from '../../../RightItem/LevelRightItem/LevelRightItem';
import RightItem from '../../../RightItem/RightItem';
import MultipleChoiceTask from '../../../Task/MultipleChoiceTask';
import TrueFalseTask from '../../../Task/TrueFalseTask';
import ArrangementTask from '../../../Task/ArrangementTask';
import Task from '../../../Task/Task';
import TaskLesson from '../../../TaskLesson/TaskLesson';

import styles from './../VocabularySkills.module.css';
import style from './VocabularyLesson.module.css';

export default function VocabularyLesson(props) {
  console.log(props.data);
  const [data, setData] = useState(props.data);

  if (!data) return <div>Loading</div>;

  return (
    <div className='grid wide'>
      <div className='row'>
        <div className='col l-9 m-12 c-12'>
          <div className={styles.heading}>
            <p className={styles.depthLink}>
              <Link to='/voccabulary'>Vocabulary</Link>
              <span> {'>'} </span>
              <span>{data?.levelSlug}</span>
              <span> {'>'} </span>
              <span>{data?.name}</span>
            </p>
            <div className={styles.line}></div>
            <h1
              style={{ color: '#23085A', margin: '30px 0 0 0', fontSize: 36 }}
            >
              {data?.name}
            </h1>
          </div>
          <div className={style.imageFiled}>
            <img src={data?.image} alt='' />
          </div>
          <div className={style.colorMain}>
            <div className={style.blockColor1}></div>
            <div className={style.blockColor2}>
              <p>Are you looking for a face-to-face English course near you?</p>
              <button>
                <Link
                  className={style.textMeeting}
                  to={'/meeting'}
                  target={'_blank'}
                >
                  Meeting
                </Link>
              </button>
            </div>
            <div className={style.blockColor3}></div>
          </div>
          <div className={style.textIntro}>
            <p dangerouslySetInnerHTML={{ __html: data?.content }}></p>
          </div>
          <div className={style.taskContainer}>
            <div name='task' style={{ marginTop: 10 }}>
              <Accordion allowZeroExpanded>
                {data.task.map((task, index) => {
                  return (
                    (task.type === '0' && (
                      <TrueFalseTask {...task} key={index} />
                    )) ||
                    (task.type === '1' && (
                      <MultipleChoiceTask {...task} key={index} />
                    )) ||
                    (task.type === '2' && <Task {...task} key={index} />) ||
                    (task.type === '3' && <Task {...task} key={index} />) ||
                    (task.type === '4' && (
                      <ArrangementTask {...task} key={index} />
                    )) ||
                    (task.type === '5' && <Task {...task} key={index} />)
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
        <div className='col l-3 m-12 c-12' style={{ marginTop: 230 }}>
          <LevelRightItem
            level1={'Beginner to pre-intermediate'}
            level2={'Intermediate to upper intermediate'}
            level3={'English grammar reference'}
            sluglevel1={'beginner-to-pre-intermediate'}
            sluglevel2={'intermediate-to-upper-intermediate'}
            sluglevel3={'english-grammar-reference'}
          />
          <RightItem />
        </div>
      </div>
    </div>
  );
}
