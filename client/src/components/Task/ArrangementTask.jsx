import { React, useState } from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFlag, FaHandPointDown, FaSync, FaThList } from 'react-icons/fa';
import styles from './Task.module.css';
import { RandomFuntion } from './RandomFuntion';
import { HiEyeOff } from 'react-icons/hi';
import { VscFeedback } from 'react-icons/vsc';

const ArrangementTask = (props) => {
  const [dataTask, setdataTask] = useState(
    RandomFuntion(Object.values(props.data))
  );
  //set up for task2
  const [draggedItem, setdraggedItem] = useState(0);
  const [draggedIdx, setdraggedIdx] = useState(0);
  //dialog task2
  const [dialog, setdialog] = useState(false);
  const [answerCorrect, setanswerCorrect] = useState(0);
  const [showAnswer, setshowAnswer] = useState(false);
  const [colorAnswertask, setcolorAnswertask] = useState([]);
  const [colorTask, setcolorTask] = useState(false);
  const [currentOrder, setCurrentOrder] = useState([]);

  //drag and drop items on task2
  const onDragStart = (e, index) => {
    if (!showAnswer) {
      setdraggedItem(dataTask[index]);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.parentNode);
      e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    }
  };

  //drag and drop items on task2
  const onDragOver = (index) => {
    if (!showAnswer) {
      const draggedOverItem = dataTask[index];
      if (draggedItem === draggedOverItem) {
        return;
      }
      let items = dataTask.filter((item) => item !== draggedItem);
      items.splice(index, 0, draggedItem);
      setdataTask(items);
    }
  };

  //drag and drop items on task2
  const onDragEnd = () => {
    setdraggedIdx(null);
  };

  const eventFinish = () => {
    setshowAnswer(true);
    setdialog(true);
    let count = 0;
    let key = [];
    for (let i = 0; i < dataTask.length; i++) {
      const temp = parseInt(
        dataTask[i].substring(dataTask[i].indexOf('-') + 1)
      );
      if (temp === parseInt(i + 1)) {
        count++;
        key.push(i);
      }
    }
    setanswerCorrect(count);
    setcolorAnswertask(key);
  };

  const eventTry = () => {
    setdataTask(RandomFuntion(Object.values(props.data)));
    setdialog(false);
    setshowAnswer(false);
    setcolorAnswertask([]);
    setcolorTask(false);
  };

  const eventShowAnswer = () => {
    setcolorTask(!colorTask);
    setdialog(false);
    if (!colorTask) {
      let array = [];
      for (let i = 0; i < dataTask.length; i++) {
        const temp = parseInt(
          dataTask[i].substring(dataTask[i].indexOf('-') + 1)
        );
        array[temp] = dataTask[i];
      }
      setCurrentOrder(dataTask);
      setdataTask(array);
      console.log(currentOrder);
    } else {
      setdataTask(currentOrder);
    }
  };

  const showFeedback = () => {
    setdialog(!dialog);
  };

  const backgroundColor = (index) => {
    if (colorTask) {
      return '#70cce4';
    } else {
      if (showAnswer) {
        if (!colorAnswertask.includes(index)) {
          return '#fac8c1';
        } else {
          return '#b8ecbc';
        }
      } else {
        return '#dedae6';
      }
    }
  };

  return (
    <div>
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
                  Total score is {answerCorrect} out of {dataTask.length} (
                  {((answerCorrect / dataTask.length) * 100).toFixed(0)}%)
                </p>
              </div>
            ) : (
              ''
            )}

            <div>
              {/* <p className={styles.textTitle}>
                Listening{' '}
                {props.data.data.nameLevel.substring(
                  props.data.data.nameLevel.indexOf(' ')
                )}
                : {props.data.data.topic.nameTopic} – 1
              </p> */}
              <p className={styles.subtitle}>
                Drag the sentences into the correct order.
              </p>
            </div>

            <div className={styles.checkBox}>
              <div className={styles.items}>
                <ul className={styles.item}>
                  {dataTask.map((item, index) =>
                    item.includes('-') ? (
                      <li
                        key={index}
                        onDragOver={() => onDragOver(index)}
                        style={{
                          backgroundColor: backgroundColor(index),
                          // colorTask
                          //   ? '#70cce4'
                          //   : colorAnswertask.includes(index)
                          //   ? '#b8ecbc'
                          //   : '#dedae6',
                        }}
                      >
                        <div
                          className={styles.drag}
                          draggable
                          onDragStart={(e) => onDragStart(e, index)}
                          onDragEnd={onDragEnd}
                        >
                          {item.substring(0, item.indexOf('-'))}
                          <FaHandPointDown className={styles.icon} />
                        </div>
                      </li>
                    ) : (
                      ''
                    )
                  )}
                </ul>
              </div>

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
    </div>
  );
};

export default ArrangementTask;
