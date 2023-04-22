import { Fragment, React, useEffect, useState } from 'react';
import { Accordion } from 'react-accessible-accordion';
import { Link } from 'react-router-dom';
import LevelRightItem from '../../RightItem/LevelRightItem/LevelRightItem';
import RightItem from '../../RightItem/RightItem';
import ArrangementTask from '../../Task/ArrangementTask';
import MultipleChoiceTask from '../../Task/MultipleChoiceTask';
import Task from '../../Task/Task';
import TrueFalseTask from '../../Task/TrueFalseTask';
import TaskLession from '../../TaskLesson/TaskLesson';
import styles from './DetailTopic.module.css';

const DetailTopic = (props) => {
  const [data, setdata] = useState(props.data);
  const [datalevel, setdatalevel] = useState([]);
  const [dataexample, setdataexample] = useState([]);
  const [dataexplan, setdataexplan] = useState([]);
  const [Grammarexplanation, setGrammarexplanation] = useState([]);
  const [dataTask, setdataTask] = useState([]);
  console.log(data[0]?.level?.topic?.slug);

  useEffect(() => {
    setdata(props.data);
    if (props.data.length) {
      setdataTask(props.data[0].level.topic.task);
      let temp = props.data[0].level.topic.contentTopic;
      let array = [];
      let explan = props.data[0].level.topic.grammarExplanation;
      setdatalevel(temp.substring(0, temp.indexOf('.')).split('\n\n'));
      setdataexample(temp.substring(temp.indexOf('.') + 3).split('\n'));
      setdataexplan(
        props.data[0].level.topic.grammarExplanation.intro.split('\n')
      );
      for (let element in explan) {
        array.push(explan[element]);
      }
      setGrammarexplanation(array);
    }
  }, [props.data]);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <Fragment>
      <div className='grid wide'>
        <div className='row'>
          <div className='col l-9 m-12 c-12'>
            <div className={styles.title}>
              <div className={styles.heading}>
                <p className={styles.depthLink}>
                  <Link to='/grammar'>Grammar</Link>
                  <span> {'>'} </span>
                  <span>{data.levelSlug}</span>
                  <span> {'>'} </span>
                  <span>{data.slug}</span>
                </p>
                <div className={styles.line}></div>
              </div>

              <h2>{data.name}</h2>
            </div>
            <div className={styles.imageFiled}>
              <img src={data.image} alt='' />
            </div>
            <div className={styles.colorMain}>
              <div className={styles.blockColor1}></div>
              <div className={styles.blockColor2}>
                <p>
                  Are you looking for a face-to-face English course near you?
                </p>
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
              <p dangerouslySetInnerHTML={{ __html: data.content }}></p>

              {/* <div className={styles.textExample}>
                <div className={styles.line}></div>
                <div style={{ marginLeft: 15 }}>
                  {dataexample.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div> */}
            </div>

            <div className={styles.accordion}>
              {/* <Accordion allowZeroExpanded style={{ marginLeft: 1 }}>
                {dataTask.map((items, index) =>
                  index === 0 ? <TaskLession {...items} key={index} /> : ''
                )}
              </Accordion> */}
              <p className={styles.text}>Read the explanation to learn more.</p>
            </div>

            <div className={styles.grammarExplan}>
              <h2>Grammar explanation</h2>
              <p dangerouslySetInnerHTML={{__html: data.grammarExplanation}}>
              </p>
              {/* <div>
                {dataexplan.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>

              {Grammarexplanation.slice(1).map((item, index) => (
                <div className={styles.element} key={index}>
                  <h2>{item[0].title}</h2>

                  {item.map((item1, index1) => (
                    <div key={index1}>
                      <p>{item1.explanation}</p>

                      <div className={styles.textExample}>
                        <div className={styles.line}></div>
                        <div style={{ marginLeft: 15 }}>
                          {item1.example
                            .split('\n')
                            .map((item2, index2) =>
                              item2 ? <p key={index2}>{item2}</p> : ''
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))} */}
            </div>

            <div className={styles.accordion1}>
              <p className={styles.text}>
                Try these exercises to test your grammar.
              </p>
              <div>
                <Accordion allowZeroExpanded style={{ marginLeft: 1 }}>
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
          <div className='col l-3 m-12 c-12' style={{ marginTop: 185 }}>
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

export default DetailTopic;
