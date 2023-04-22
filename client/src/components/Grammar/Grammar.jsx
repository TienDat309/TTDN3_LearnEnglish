import { Fragment, React, useEffect, useState } from 'react';
import LessonCard from '../LessonCard/LessonCard';
import LevelRightItem from '../RightItem/LevelRightItem/LevelRightItem';
import RightItem from '../RightItem/RightItem';
import styles from './Grammar.module.css';

const Grammar = (props) => {
  // const [data, setData] = useState([]);
  const [data, setdata] = useState(props.data);

  useEffect(() => {
    console.log(props.data);
    setdata(props.data);
  }, [props.data]);
  if (!data[0]) {
    return <div>loading</div>;
  }

  return (
    <Fragment>
      <div className='grid wide' style={{ marginTop: 60 }}>
        <div className='row'>
          <div className='col l-9 m-12 c-12'>
            <h1
              style={{ color: '#23085A', margin: '0 0 30px 0', fontSize: 36 }}
            >
              {data[0]?.name}
            </h1>
            <img
              src={data[0]?.image}
              alt={data[0]?.name}
              style={{ width: '100%' }}
            />
            <p
              className={styles.textIntro}
              dangerouslySetInnerHTML={{ __html: data[0].content }}
            >
              {/* Practise your English grammar with clear grammar explanations and
              practice exercises to test your understanding. All learners,
              whatever their level, have questions and doubts about grammar as
              they're learning English and this guide helps to explain the verb
              tenses and grammar rules in a clear and simple way.<br/><br/>
              Choose your level, from beginner to advanced, and start learning
              today by reading the explanations and doing the exercises. By
              revising and practising your grammar you will increase your
              confidence in English and improve your language level.<br/><br/>
              Decide which area of grammar you need help with today and choose a
              grammar point to work on. When you do the interactive exercises,
              you can see how well you've done.<br/><br/>
              Practising little and often is the best way to improve your
              grammar, so come back tomorrow to choose another grammar point to
              work on. Good luck! */}
            </p>
            <h1 style={{ color: '#23085a' }}>Choose a grammar section</h1>
            <div className={styles.contain}>
              {data[0].levels.map((item, index) => (
                <LessonCard {...item} key={index} />
              ))}
            </div>
          </div>

          <div className='col l-3 m-12 c-12'>
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
    </Fragment>
  );
};

export default Grammar;
