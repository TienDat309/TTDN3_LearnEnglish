import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const WritingForm = (props) => {
  const { state, setState } = props;

  const [stateTask, setStateTask] = useState('');

  const [element, setElement] = useState('');

  const onChangeTask = (e) => {
    setStateTask(e.target.value);
  };

  const onChangeElement = (e) => {
    setElement(e.target.value);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state);
  };

  return (
    <div>
      <div className={styles.typeInput}>
        <label>Reading Text</label>
        <div className={styles.textEditor}>
          <Editor
            value={state.readingText}
            onEditorChange={(e) => setState({ ...state, readingText: e })}
          />
        </div>
      </div>

      <div className={styles.typeInput}>
        <label>Tips</label>
        <div className={styles.textEditor}>
          <Editor
            value={state.tips}
            onEditorChange={(e) => setState({ ...state, tips: e })}
          />
        </div>
      </div>

      {/* task in topic */}
      {/* <div className={styles.typeInput}>
        <label>Tasks</label>
        <select
          name='select'
          className={styles.typeInputValues}
          onChange={onChangeTask}
        >
          <option value=''>Select task</option>
          <option value='1'>Task1</option>
          <option value='2'>Task2</option>
        </select>
      </div> */}
      {/* task1 in topic */}
      {/* {stateTask && (
        <div>
          <div className={styles.typeInput}>
            <label>Data Task {stateTask}</label>
            <input
              spellCheck='false'
              name='dataTask1'
              onChange={onChangeInput}
              value={state.task[`${stateTask - 1}`]?.data}
              className={styles.typeInputValues}
              placeholder='Please type content...'
            />
          </div>
          <div className={styles.typeInput}>
            <label>Task Name</label>
            <input
              spellCheck='false'
              name='taskName1'
              onChange={onChangeInput}
              value={state.task[`${stateTask - 1}`]?.taskName}
              className={styles.typeInputValues}
              placeholder='Please type content...'
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default WritingForm;
