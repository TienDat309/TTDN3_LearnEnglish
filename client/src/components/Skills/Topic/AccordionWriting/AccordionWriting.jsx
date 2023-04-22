import { React, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import styles from '../AccordionListening/Accordion.module.css';
import Task from '../../../Task/Task';
import ArrangementTask from '../../../Task/ArrangementTask';
import TrueFalseTask from '../../../Task/TrueFalseTask';
import Translates from '../Translates/Translates';
import style from './AccordionWriting.module.css';
import MultipleChoiceTask from '../../../Task/MultipleChoiceTask';

export default function AccordionWriting(props) {
  const { data } = props;
  const [dataTranslates, setdataTranslates] = useState([]);
  const [showTranslate, setShowTranslate] = useState(false);
  const [valueInput, setvalueInput] = useState('');
  const [dataCorrect, setdataCorrect] = useState('');
  const [checkData, setcheckData] = useState(false);

  // const [data, setdata] = useState(props.data.topic.readingText.split('\n\n'));
  // const [dataTask, setdataTask] = useState(props.data.topic.task[0].task1);

  useEffect(() => {
    dataCorrect.data !== undefined ? setcheckData(true) : setcheckData(false);
  }, [dataCorrect]);

  // useEffect(() => {
  //   setdata(props.data.topic.readingText.split('\n\n'));
  //   setdatatips(props.data.topic.tips.split('\n'));
  //   setdataTask(props.data.topic.task[0].task1);
  // }, [props]);

  const event = async () => {
    let array = [];
    let temp = document.getSelection().toString();
    temp.trim();
    array.push(temp);

    if (temp !== '') {
      await fetch('/api1/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
      });

      await fetch('/api1/translate')
        .then((res) => res.json())
        .then((datas) => {
          array.push(datas);
        });
      setdataTranslates(array);
      setShowTranslate(true);
    }
  };

  const eventGetData = (e) => {
    setvalueInput(e.target.value);
    setdataCorrect(e.target.value);
  };

  const eventSubmit = async () => {
    await fetch('/api1/gramformer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valueInput),
    });

    await fetch('/api1/gramformer')
      .then((res) => res.json())
      .then((datas) => setdataCorrect(datas));
  };

  return (
    <Accordion allowZeroExpanded className={styles.accordion}>
      <AccordionItem className={styles.item} style={{ marginLeft: -15 }}>
        <AccordionItemHeading className={styles.headerTranscript}>
          <AccordionItemButton className={styles.transcript}>
            Reading Text
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={styles.panelText}>
          {showTranslate ? (
            <Translates
              data={dataTranslates}
              setShowTranslate={setShowTranslate}
            />
          ) : null}
          <p
            dangerouslySetInnerHTML={{ __html: data.readingText }}
            onMouseUp={event}
          ></p>
        </AccordionItemPanel>
      </AccordionItem>

      <div className={style.tips}>
        <h2>Tips</h2>
        <p dangerouslySetInnerHTML={{ __html: data.tips }}></p>
        {/* {data.tips?.split('\n').map((item, index) => (
          <p key={index}>
            {index + 1}. {item}
          </p>
        ))} */}
      </div>
      <AccordionItem className={styles.item} style={{ marginLeft: -15 }}>
        <AccordionItemHeading className={styles.headerTranscript}>
          <AccordionItemButton className={styles.transcript}>
            Writing Text
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={styles.panelText}>
          <div className={style.blockText}>
            {checkData ? (
              <textarea
                className={style.textAr}
                spellCheck='false'
                value={dataCorrect.data}
                onChange={eventGetData}
              />
            ) : (
              <textarea
                className={style.textAr}
                spellCheck='false'
                onChange={eventGetData}
              />
            )}
            <button className={style.btnCheck} onClick={eventSubmit}>
              <span>Check your text</span>
            </button>
          </div>
        </AccordionItemPanel>
      </AccordionItem>

      <div style={{ marginLeft: -15 }}>
        {data.task.map((task, index) => {
          console.log(task);
          return (
            (task.type === '0' && <TrueFalseTask {...task} key={index} />) ||
            (task.type === '1' && (
              <MultipleChoiceTask {...task} key={index} />
            )) ||
            (task.type === '2' && <Task {...task} key={index} />) ||
            (task.type === '3' && <Task {...task} key={index} />) ||
            (task.type === '4' && <ArrangementTask {...task} key={index} />) ||
            (task.type === '5' && <Task {...task} key={index} />)
          );
        })}
      </div>
    </Accordion>
  );
}
