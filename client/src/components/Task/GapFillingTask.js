import { React, useDebugValue, useEffect, useState } from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFlag, FaSync, FaThList, FaCheck, FaTimes } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HiEyeOff } from 'react-icons/hi';
import { VscFeedback } from 'react-icons/vsc';
import styles from './Task.module.css';
import { RandomFuntion } from './RandomFuntion';

export default function GapFilingTask(props) {
  const [showAnswer, setshowAnswer] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [dataTask, setdataTask] = useState(RandomFuntion(Object.values(props.data)));
  const [answers, setAnswers] = useState([]);
  const [numberCorrect, setnumberCorrect] = useState(0);
  const [colorTask, setcolorTask] = useState(false);

  useEffect(() => {
    if (!showAnswer) {
      const newData = [];
      dataTask.map((task) => {
        newData.push('');
      });
      setAnswers(newData);
    }
  }, [showAnswer]);

  const eventFinish = () => {
    let sum = 0;

    for (let i = 0; i < dataTask.length; i++) {
      if (answers[i] === dataTask[i].substring(dataTask[i].indexOf('=>') + 2)) {
        sum++;
      }
    }

    setnumberCorrect(sum);
    setdialog(true);
    setshowAnswer(true);
  };

  const eventTry = () => {
    setdialog(false);
    setshowAnswer(false);
    setcolorTask(false);
    setdataTask(RandomFuntion(Object.values(props.data)))
  };

  const eventShowAnswer = () => {
    setdialog(false);
    setcolorTask(!colorTask);
  };

  const showFeedback = () => {
    setdialog(!dialog);
  };

  const onChange = (e, i) => {
    if (!showAnswer) {
      const newValue = [...answers];
      newValue[i] = e.target.value;
      setAnswers(newValue);
    }
  };

  const backgroundColor = (index) => {
    if (colorTask) {
      return '#70cce4';
    } else {
      if (showAnswer) {
        if (
          dataTask[index].substring(dataTask[index].indexOf('=>') + 2) ===
          answers[index]
        ) {
          return '#b8ecbc';
        } else {
          return '#fac8c1';
        }
      }
    }

    return '#dedae6';
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
            <p className={styles.subtitle}>
              Write correct answer to complete the sentences.
            </p>
            <p className={styles.remaining}>
              {dataTask.length - answers.filter(Boolean).length} items remaining
            </p>
          </div>

          <div className={styles.blockMutipleChoise}>
            <div>
              <div className={styles.ItemChoise} style={{ width: '100%' }}>
                <form>
                  {dataTask.map((text, i) => (
                    <div key={i} style={{ display: 'block' }}>
                      <div
                        className={styles.boolItem}
                        style={{ display: 'inline' }}
                      >
                        <span>{i + 1}. </span>
                        <span>{text.substring(0, text.indexOf('__'))}</span>
                        <div style={{ display: 'inline-block' }}>
                          <div
                            style={{
                              position: 'relative',
                              display: 'inline-block',
                            }}
                          >
                            <input
                              className={styles.textBox}
                              style={
                                { backgroundColor: backgroundColor(i) }
                                // colorTask
                                //   ? {
                                //       color: '#333',
                                //       backgroundColor: backgroundColor(i),
                                //       borderColor: '#5ebed6',
                                //       boxShadow: 'none',
                                //       borderWidth: '0 1px 4px 1px',
                                //     }
                                //   : {}
                              }
                              type='text'
                              value={
                                colorTask
                                  ? text.substring(text.indexOf('=>') + 2)
                                  : answers[i]
                              }
                              spellCheck={false}
                              onChange={(e) => onChange(e, i)}
                            />
                            <span className={styles.checkIcon}>
                              {backgroundColor(i) === '#b8ecbc' && (
                                <FaCheck color='green' />
                              )}
                              {backgroundColor(i) === '#fac8c1' && (
                                <FaTimes color='red' />
                              )}
                            </span>
                          </div>
                        </div>
                        <span>
                          {text.substring(
                            text.indexOf('__') + 2,
                            text.indexOf('=>')
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </form>
              </div>
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
