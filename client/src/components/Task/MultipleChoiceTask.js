import { React, useDebugValue, useEffect, useState } from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFlag, FaSync, FaThList, FaCheck, FaTimes } from 'react-icons/fa';
import { HiEyeOff } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { VscFeedback } from 'react-icons/vsc';
import { RandomFuntion } from './RandomFuntion';
import styles from './Task.module.css';

export default function MultipleChoiceTask(props) {
  const [showAnswer, setshowAnswer] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [dataTask, setdataTask] = useState(
    RandomFuntion(Object.values(props.data))
  );
  const [radioValue, setRadioValue] = useState([]);
  const [numberCorrect, setnumberCorrect] = useState(0);
  const [colorTask, setcolorTask] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!showAnswer) {
      const newData = [];
      dataTask.map((task) => {
        newData.push('');
      });
      setRadioValue(newData);
    }
  }, [showAnswer]);

  const eventFinish = () => {
    let sum = 0;

    for (let i = 0; i < dataTask.length; i++) {
      const data = dataTask[i]
        .substring(dataTask[i].indexOf('\n\n') + 2)
        .split('\n\n');
      const answer = data.findIndex(
        (str) => str.substring(str.indexOf('-') + 1) === '1'
      );
      if (answer === parseInt(radioValue[i])) {
        sum++;
      }
    }

    setnumberCorrect(sum);
    setdialog(true);
    setshowAnswer(true);
  };

  const eventTry = () => {
    setIndex(0);
    setdialog(false);
    setshowAnswer(false);
    setcolorTask(false);
    setdataTask(RandomFuntion(Object.values(props.data)));
  };

  const eventShowAnswer = () => {
    setdialog(false);
    setcolorTask(!colorTask);
  };

  const showFeedback = () => {
    setdialog(!dialog);
  };

  const onChange = (e) => {
    if (!showAnswer) {
      const temp = e.target.value.split('-');
      const newValue = [...radioValue];
      newValue[parseInt(temp[0])] = temp[1];
      setRadioValue(newValue);
      console.log(radioValue);
    }
  };

  const goBack = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  const goNext = () => {
    if (index !== dataTask.length - 1) {
      setIndex(index + 1);
    }
  };

  const goToIndex = (i) => {
    setIndex(i);
  };

  const backgroundColor = (answer, i) => {
    if (colorTask) {
      if (answer.substring(answer.indexOf('-') + 1) === '1') {
        return '#70cce4';
      }
    } else {
      if (showAnswer) {
        if (parseInt(radioValue[index]) === i) {
          if (answer.substring(answer.indexOf('-') + 1) === '1') {
            return '#b8ecbc';
          } else {
            return '#fac8c1';
          }
        }
      }
    }

    return '#fff';
  };

  return (
    <AccordionItem className={styles.item}>
      <AccordionItemHeading className={styles.headerTranscript}>
        <AccordionItemButton className={styles.transcript}>
          {props.taskName}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={styles.panelTextForm}>
        <div className={styles.form}>
          {dialog && (
            <div className={styles.dialogForm}>
              <p className={styles.text}>Feedback</p>
              <span className={styles.iconClose}>
                <AiOutlineClose onClick={() => setdialog(false)} />
              </span>
              <p className={styles.total}>
                Total score is {numberCorrect} out of {dataTask.length} (
                {((numberCorrect / dataTask.length) * 100).toFixed(0)}%)
              </p>
            </div>
          )}

          <div>
            <p className={styles.subtitle}>Choose the correct answer.</p>
            <p className={styles.remaining}>
              {dataTask.length - radioValue.filter(Boolean).length} items
              remaining
            </p>
          </div>

          <div className={styles.blockMutipleChoise}>
            <div key={index}>
              <div className={styles.ItemChoise} style={{ width: '100%' }}>
                <p className={styles.textTranform}>
                  {index + 1}.{' '}
                  {dataTask[index].substring(
                    0,
                    dataTask[index].indexOf('\n\n')
                  )}
                </p>
              </div>

              <div className={styles.ItemChoise} style={{ width: '100%' }}>
                <form>
                  {dataTask[index]
                    .substring(dataTask[index].indexOf('\n\n') + 2)
                    .split('\n\n')
                    .map((answer, i) => (
                      <div>
                        <div
                          className={styles.boolItem}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: backgroundColor(answer, i),
                            // colorTask
                            //   ? parseInt(
                            //       answer.substring(answer.indexOf('-') + 1)
                            //     ) === 1
                            //     ? '#70cce4'
                            //     : '#fff'
                            //   : '#fff',
                          }}
                        >
                          <input
                            type='radio'
                            name={`radio-${index}`}
                            value={`${index}-${i}`}
                            onChange={onChange}
                            checked={
                              radioValue[index] &&
                              parseInt(radioValue[index]) === i
                            }
                          />
                          <span>
                            {answer.substring(0, answer.indexOf('-'))}
                          </span>
                          {backgroundColor(answer, i) === '#b8ecbc' && (
                            <FaCheck
                              style={{ marginLeft: 'auto' }}
                              color='green'
                            />
                          )}
                          {backgroundColor(answer, i) === '#fac8c1' && (
                            <FaTimes
                              style={{ marginLeft: 'auto' }}
                              color='red'
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </form>
              </div>
            </div>
          </div>

          <div className={styles.navigator} id='ajax-pages'>
            <div className={styles.progressIndicator}>
              <ul className={styles.carouselIndicators}>
                {dataTask.map((data, i) => (
                  <li
                    id={i}
                    className={index === i ? styles.active : ''}
                    onClick={() => goToIndex(i)}
                  ></li>
                ))}
              </ul>
              <ul className={styles.pager}>
                <li
                  className={`${styles.previous} ${
                    index === 0 ? styles.disabled : ''
                  } `}
                >
                  <a onClick={goBack}>
                    <IoIosArrowBack className={styles.glyphicon} />
                  </a>
                </li>
                <li
                  className={`${styles.previous} ${
                    index === dataTask.length - 1 ? styles.disabled : ''
                  } `}
                >
                  <a onClick={goNext}>
                    <IoIosArrowForward className={styles.glyphicon} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.checkBox}>
            <div className={styles.buttonCheck}>
              {showAnswer ? (
                <>
                  <button
                    className={styles.buttonFis}
                    onClick={eventShowAnswer}
                  >
                    {colorTask ? (
                      <>
                        <HiEyeOff />
                        {'\t'}Hide answers
                      </>
                    ) : (
                      <>
                        <FaThList />
                        {'\t'}Show answers
                      </>
                    )}
                  </button>
                  <button className={styles.buttonTry} onClick={showFeedback}>
                    <VscFeedback /> Show feedback
                  </button>
                  <button className={styles.buttonTry} onClick={eventTry}>
                    <FaSync /> Try again
                  </button>
                </>
              ) : (
                <button className={styles.buttonFis} onClick={eventFinish}>
                  <FaFlag /> Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
}
