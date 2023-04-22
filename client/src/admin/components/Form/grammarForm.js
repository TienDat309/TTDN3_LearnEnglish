import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const GrammarForm = (props) => {
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
        <label>Grammars Explantion Introduction</label>
        <div className={styles.textEditor}>
          <Editor
            value={state.grammarExplanation}
            onEditorChange={(e) =>
              setState({ ...state, grammarExplanation: e })
            }
          />
        </div>
      </div>

      {/* <div className={styles.typeInput}>
        <label>Elements</label>
        <select
          name='select'
          className={styles.typeInputValues}
          onChange={onChangeElement}
        >
          <option value=''>Select element</option>
          <option value='1'>Element 1</option>
          <option value='2'>Element 2</option>
          <option value='3'>Element 3</option>
          <option value='4'>Element 4</option>
          <option value='5'>Element 5</option>
        </select>
      </div>
      {element &&
        Array.from(Array(3), (e, i) => {
          return (
            <div>
              <div className={styles.typeInput}>
                <label>
                  Title Element {element}.{i}
                </label>
                <input
                  spellCheck='false'
                  name={`grammarExplanation.element_${element}.${i}.title`}
                  onChange={onChangeInput}
                  value={
                    state.grammarExplanation[`element_${element}`] &&
                    state.grammarExplanation[`element_${element}`][i]?.title
                  }
                  className={styles.typeInputValues}
                  placeholder='Please type content...'
                />
              </div>
              <div className={styles.typeInput}>
                <label>
                  Explantion Element {element}.{i}
                </label>
                <input
                  spellCheck='false'
                  name='explanation1A'
                  onChange={onChangeInput}
                  value={
                    state.grammarExplanation[`element_${element}`] &&
                    state.grammarExplanation[`element_${element}`][i]
                      ?.explanation
                  }
                  className={styles.typeInputValues}
                  placeholder='Please type content...'
                />
              </div>
              <div className={styles.typeInput}>
                <label>
                  Example Element {element}.{i}
                </label>
                <textarea
                  name='example1A'
                  onChange={onChangeInput}
                  value={
                    state.grammarExplanation[`element_${element}`] &&
                    state.grammarExplanation[`element_${element}`][i]?.example
                  }
                  spellCheck='false'
                  className={styles.typeInputValues}
                  placeholder='Please type content...'
                />
              </div>
            </div>
          );
        })} */}

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
      </div>
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

export default GrammarForm;
