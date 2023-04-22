import { Fragment, React, useEffect, useState } from 'react';
import LessonCard from '../LessonCard/LessonCard';
import LevelRightItem from '../RightItem/LevelRightItem/LevelRightItem';
import RightItem from '../RightItem/RightItem';
import styles from './Vocabulary.module.css';

const Vocabulary = (props) => {
  const [data, setdata] = useState(props.data);
  console.log(data);

  useEffect(() => {
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
            <p className={styles.textIntro} dangerouslySetInnerHTML={{ __html: data[0].content }}>
              {/* Do you need to learn new words to understand and express yourself
              clearly in English? <br />
              <br />
              In this section you will find activities to help you learn the
              meaning, pronunciation and spelling of new words. Learning
              vocabulary will help you improve your language level and
              communicate in English confidently and effectively. The pages are
              organised by topic and include interactive exercises to help you
              learn and remember the new words. */}
            </p>
            <div className={styles.listItem}>
              <h1>Choose your level to practise your vocabulary</h1>
              <div className={styles.contain}>
                {data[0].levels.map((item, index) => (
                  <LessonCard {...item} key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className='col l-3 c-12 m-12'>
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

export default Vocabulary;
