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
import MultipleChoiceTask from '../../../Task/MultipleChoiceTask';

export default function AccordionReading(props) {
  const { data } = props;
  const [dataTranslates, setdataTranslates] = useState([]);
  const [showTranslate, setShowTranslate] = useState(false);

  // const [dataTask, setdataTask] = useState(props.data.topic.task[0].task1);

  // useEffect(() => {
  //   setdata(props.data.topic.readingText.split('\n\n'));
  //   setdataTask(props.data.topic.task[0].task1);
  // }, [props.data]);

  const event = async (e) => {
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
