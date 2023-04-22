import React from "react";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import styles from "./TaskLesson.module.css";
export default function TaskLesson(props) {
  return (
      <AccordionItem className={styles.item}>
        <AccordionItemHeading className={styles.headerTranscript}>
          <AccordionItemButton className={styles.transcript}>
            {props?.taskName}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={styles.panelText} >
          <div dangerouslySetInnerHTML={{ __html: props?.data }}></div>
        </AccordionItemPanel>
      </AccordionItem>
  );
}
