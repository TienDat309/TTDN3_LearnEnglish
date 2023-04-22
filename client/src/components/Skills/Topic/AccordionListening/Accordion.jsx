import { React, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import styles from './Accordion.module.css';
import Task from '../../../Task/Task';
import ArrangementTask from '../../../Task/ArrangementTask';
import TrueFalseTask from '../../../Task/TrueFalseTask';
import Translates from '../Translates/Translates';
import MultipleChoiceTask from '../../../Task/MultipleChoiceTask';
import GapFilingTask from '../../../Task/GapFillingTask';

export default function Accordions(props) {
  const { data } = props;
  const [dataTranslates, setdataTranslates] = useState([]);
  const [showTranslate, setShowTranslate] = useState(false);

  // const [dataTask1, setdataTask1] = useState(props.data.topic.task[0].task1);
  // const [dataTask2, setdataTask2] = useState(
  //   Object.values(props.data.topic.task[1].task2)
  // );
  // const [dataTask3, setdataTask3] = useState(props.data.topic.task[2].task3);

  // useEffect(() => {
  //   setdata(props.data.topic.tranScript.split('\n\n'));
  //   setdataTask1(props.data.topic.task[0].task1);
  //   setdataTask2(Object.values(props.data.topic.task[1].task2));
  //   setdataTask3(props.data.topic.task[2].task3);
  // }, [props.data]);

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
  // console.log(dataTask1?.taskName);

  return (
    <Accordion allowZeroExpanded className={styles.accordion}>
      <AccordionItem className={styles.item} style={{ marginLeft: -15 }}>
        <AccordionItemHeading className={styles.headerTranscript}>
          <AccordionItemButton className={styles.transcript}>
            Transcript
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
            dangerouslySetInnerHTML={{ __html: data.tranScript }}
            onMouseUp={event}
          ></p>
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
            (task.type === '2' && <GapFilingTask {...task} key={index} />) ||
            (task.type === '3' && <Task {...task} key={index} />) ||
            (task.type === '4' && <ArrangementTask {...task} key={index} />) ||
            (task.type === '5' && <Task {...task} key={index} />)
          );
        })}
        {/* {dataTask1?.taskName === ''
          ? ''
          : [dataTask1].map((item, index) => <Task1 {...item} key={index} />)}

        {dataTask2[0] === '' ? '' : <Task2 data={props} />}

        {dataTask3?.text1 === ''
          ? ''
          : [dataTask3].map((item, index) => (
              <Task3 data={props.data} key={index} />
            ))} */}
      </div>
    </Accordion>
  );
}
