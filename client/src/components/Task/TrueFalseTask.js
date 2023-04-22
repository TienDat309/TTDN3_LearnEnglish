import { React, useDebugValue, useEffect, useState } from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCheck, FaFlag, FaSync, FaThList, FaTimes } from 'react-icons/fa';
import { HiEyeOff } from 'react-icons/hi';
import { VscFeedback } from 'react-icons/vsc';
import { RandomFuntion } from './RandomFuntion';
import styles from './Task.module.css';

export default function TrueFalseTask(props) {
  const [showAnswer, setshowAnswer] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [dataTask, setdataTask] = useState(RandomFuntion(Object.values(props.data)));
  const [radioValue, setRadioValue] = useState([]);
  const [numberCorrect, setnumberCorrect] = useState(0);
  const [colorTask, setcolorTask] = useState(false);

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
      const answer = dataTask[i].substring(dataTask[i].indexOf('-') + 1);
      if (answer === radioValue[i]) {
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
    // setRadioValue([]);
    // window.location.reload();
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

  const backgroundColor = (answer, index, bool) => {
    if (colorTask) {
      if (answer.substring(answer.indexOf('-') + 1) === bool) {
        return '#70cce4';
      }
    } else {
      if (showAnswer) {
        if (radioValue[index] === bool) {
          if (answer.substring(answer.indexOf('-') + 1) === bool) {
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
          {dialog ? (
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
          ) : (
            ''
          )}

          <div>
            <p className={styles.subtitle}>Are the sentences true or false?</p>
            <p className={styles.remaining}>
              {dataTask.length - radioValue.filter(Boolean).length} items
              remaining
            </p>
          </div>

          <div className={styles.blockMutipleChoise}>
            {dataTask.map((item, index) =>
              item !== '' ? (
                <div key={index}>
                  <div className={styles.ItemChoise} style={{ width: 530 }}>
                    <p className={styles.textTranform}>
                      {index+1}. {item.substring(0, item.indexOf('-'))}
                    </p>
                  </div>

                  <div className={styles.ItemChoise}>
                    <form style={{ display: 'flex' }}>
                      <div
                        className={styles.boolItem}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: backgroundColor(item, index, '1'),
                          // colorTask
                          //   ? parseInt(
                          //       item.substring(item.indexOf('-') + 1)
                          //     ) === 1
                          //     ? '#70cce4'
                          //     : '#fff'
                          //   : '#fff',
                        }}
                      >
                        <input
                          type='radio'
                          name={`radio-${index}`}
                          value={`${index}-1`}
                          onChange={onChange}
                          checked={
                            radioValue[index] && radioValue[index] === '1'
                          }
                        />
                        <span>True</span>
                        {backgroundColor(item, index, '1') === '#b8ecbc' && (
                          <FaCheck color='green' />
                        )}
                        {backgroundColor(item, index, '1') === '#fac8c1' && (
                          <FaTimes color='red' />
                        )}
                      </div>
                      <div
                        className={styles.boolItem}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: backgroundColor(item, index, '0'),
                          // colorTask
                          //   ? parseInt(
                          //       item.substring(item.indexOf('-') + 1)
                          //     ) === 0
                          //     ? '#70cce4'
                          //     : '#fff'
                          //   : '#fff',
                        }}
                      >
                        <input
                          type='radio'
                          name={`radio-${index}`}
                          value={`${index}-0`}
                          onChange={onChange}
                          checked={
                            radioValue[index] && radioValue[index] === '0'
                          }
                        />
                        <span>False</span>
                        {backgroundColor(item, index, '0') === '#b8ecbc' && (
                          <FaCheck color='green' />
                        )}
                        {backgroundColor(item, index, '0') === '#fac8c1' && (
                          <FaTimes color='red' />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                ''
              )
            )}
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
