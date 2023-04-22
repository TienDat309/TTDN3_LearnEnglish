import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
//TODO
import { IoCloseCircle } from 'react-icons/io5';
import GrammarForm from '../Form/grammarForm';
import VocabularyForm from '../Form/vocabularyForm';
import SpeakingForm from '../Form/speakingForm';
import ListeningForm from '../Form/listeningForm';
import ReadingForm from '../Form/readingForm';
import WritingForm from '../Form/writingForm';
import { TASK_TYPE } from '../../../common/constant';

const TopicForm = (props) => {
  const { slug, typeSlug, levelSlug } = useParams();
  const [state, setState] = useState({
    name: '',
    slug: '',
    image: '',
    content: '',
    typeSlug,
    levelSlug,
    task: [],
    grammarExplanation: '',
    radio: '',
    video: '',
    tranScript: '',
    readingText: '',
    tips: '',
  });
  const [selectedTask, setSelectedTask] = useState('');
  const [task, setTask] = useState({
    taskName: '',
    data: [''],
    type: '0',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(
      `http://localhost:5000/api/types/${typeSlug}/levels/${levelSlug}/topics/${slug}`
    );

    if (data.data) {
      setState({
        ...state,
        name: data.data?.name,
        slug: data.data.slug,
        image: data.data.image,
        content: data.data.content,
        task: data.data.task,
        grammarExplanation: data.data.grammarExplanation,
        radio: data.data.radio,
        video: data.data.video,
        tranScript: data.data.tranScript,
        readingText: data.data.readingText,
        tips: data.data.tips,
      });
    }
  };

  const onChangeInput = (e) => {
    const { name, value, id } = e.target;
    if (name === 'name') {
      setState({
        ...state,
        [name]: value,
        slug: value
          .trim()
          .toLowerCase()
          .replace(/\s{2,}/g, ' ')
          .replace(' ', '-'),
      });
    } else if (name === 'taskName') {
      setTask({ ...task, [name]: value });
    } else if (name === 'taskType') {
      setTask({ ...task, type: value, data: [''] });
    } else if (name === 'taskData') {
      const tmp = id.split('-');
      if (task.type === '5' || task.type === '3') {
        setTask({ ...task, [name]: [value] });
      } else {
        const taskData = task.data;
        taskData[parseInt(tmp[1])] = value;
        setTask({ ...task, data: taskData });
      }
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const onChangeTask = (e) => {
    setSelectedTask(e.target.value);
    if (e.target.value && e.target.value !== 'create') {
      setTask(state.task?.at(e.target.value));
    } else {
      setTask({
        taskName: '',
        data: [''],
        type: '0',
      });
    }
  };

  const addTextData = (e) => {
    e.preventDefault();
    setTask({ ...task, data: task.data.concat(['']) });
  };

  const deleteTextData = (index) => {
    const newTextData = task.data;
    newTextData.splice(index, 1);
    setTask({ ...task, data: newTextData });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      setIsLoading(true);
      const res = await axios.post('/admin/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setState({ ...state, image: res.data.image });
      setIsLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    let newTasks = state.task;
    newTasks = newTasks.concat([task]);
    setState({ ...state, task: newTasks });
    alert('Successfully');
  };

  const updateTask = (e) => {
    e.preventDefault();
    let newTasks = state.task;
    newTasks[selectedTask] = task;
    setState({ ...state, task: newTasks });
    alert('Successfully');
  };

  const deleteTask = (e) => {
    e.preventDefault();
    if (selectedTask && window.confirm('Delete this task?')) {
      const updatedTasks = state.task;
      updatedTasks.splice(parseInt(selectedTask), 1);
      setState({ ...state, task: updatedTasks });
      setSelectedTask('');
      setTask({
        taskName: '',
        data: [''],
        type: '0',
      });
      alert('Successfully');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (slug === 'create') {
        await axios({
          method: 'post',
          url: `http://localhost:5000/api/types/${typeSlug}/levels/${levelSlug}/topics`,
          data: state,
        });
        alert('Create Successfully!');
      } else {
        await axios({
          method: 'put',
          url: `http://localhost:5000/api/types/${typeSlug}/levels/${levelSlug}/topics/${slug}`,
          data: state,
        });
        alert('Update Successfully!');
      }

      setTimeout(() => {
        window.location.replace(
          `/types/${typeSlug}/levels/${levelSlug}/topics/`
        );
      }, 1000);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.leftContent}>
        <SideBar />
      </div>
      <div className={styles.rightContent}>
        <HeaderSideBar />
        <div className={styles.blockUpdate}>
          <form onSubmit={handleSubmitForm}>
            {/* section level skill */}
            <div className={styles.typeInput}>
              <label>Name</label>
              <input
                value={state.name}
                name='name'
                onChange={onChangeInput}
                spellCheck='false'
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Content</label>
              <div className={styles.textEditor}>
                <Editor
                  value={state.content}
                  onEditorChange={(e) =>
                    setState({ ...state, content: e })
                  }
                />
              </div>
            </div>
            <div className={styles.typeInput}>
              <label>Image</label>
              <input
                onChange={handleUpload}
                type='file'
                id='file'
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            {state.name && state.typeSlug === 'grammar' && (
              <GrammarForm state={state} setState={setState} />
            )}
            {state.name && state.typeSlug === 'vocabulary' && (
              <VocabularyForm state={state} setState={setState} />
            )}
            {state.name && state.typeSlug === 'speaking' && (
              <SpeakingForm state={state} setState={setState} />
            )}
            {state.name && state.typeSlug === 'listening' && (
              <ListeningForm state={state} setState={setState} />
            )}
            {state.name && state.typeSlug === 'reading' && (
              <ReadingForm state={state} setState={setState} />
            )}
            {state.name && state.typeSlug === 'writing' && (
              <WritingForm state={state} setState={setState} />
            )}
            <div className={styles.typeInput}>
              <label>Tasks</label>
              <select
                className={styles.typeInputValues}
                onChange={onChangeTask}
                value={selectedTask}
              >
                <option value=''>Select an option</option>
                <option value='create'>Add tasks</option>
                {state.task?.map((task, index) => (
                  <option value={index}>{task.taskName}</option>
                ))}
              </select>
            </div>
            {selectedTask && (
              <div>
                <div className={styles.typeInput}>
                  <label>Task Name</label>
                  <input
                    value={task.taskName}
                    name='taskName'
                    onChange={onChangeInput}
                    spellCheck='false'
                    className={styles.typeInputValues}
                    placeholder='Please type content...'
                  />
                </div>
                <div className={styles.typeInput}>
                  <label>Type</label>
                  <select
                    name='taskType'
                    className={styles.typeInputValues}
                    onChange={onChangeInput}
                    value={task.type}
                  >
                    {Object.entries(TASK_TYPE).map((type) => (
                      <option value={type[1]}>{type[0]}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.typeInput}>
                  <label>Data</label>

                  {/* TRUE OR FALSE */}
                  {task.type === '0' &&
                    task.data.map((text, index) => (
                      <div
                        style={{
                          display: 'flex',
                          maxWidth: '470px',
                          margin: 'auto',
                        }}
                      >
                        <input
                          value={text}
                          id={`taskData-${index}`}
                          name='taskData'
                          onChange={onChangeInput}
                          spellCheck='false'
                          className={styles.typeInputValues}
                          style={{ marginBottom: '10px', width: '80%' }}
                          placeholder='<content>-<0 if false or 1 if true>'
                        />
                        <IoCloseCircle
                          size={24}
                          color='white'
                          onClick={() => deleteTextData(index)}
                        />
                      </div>
                    ))}
                  {/* TRUE OR FALSE */}

                  {/* MULTIPLE CHOICE */}
                  {task.type === '1' &&
                    task.data.map((text, index) => (
                      <div
                        style={{
                          display: 'flex',
                          maxWidth: '470px',
                          margin: 'auto',
                        }}
                      >
                        <textarea
                          value={text}
                          id={`taskData-${index}`}
                          name='taskData'
                          onChange={onChangeInput}
                          spellCheck='false'
                          className={styles.typeInputValues}
                          style={{ marginBottom: '10px', width: '80%' }}
                          placeholder={`<question>\n\n<answer1>-<0 if false or 1 if true>\n\n<answer2>-<0 if false or 1 if true>\n\n...`}
                        />
                        <IoCloseCircle
                          size={24}
                          color='white'
                          onClick={() => deleteTextData(index)}
                        />
                      </div>
                    ))}
                  {/* MULTIPLE CHOICE */}

                  {/* GAP FILLING */}
                  {task.type === '2' &&
                    task.data.map((text, index) => (
                      <div
                        style={{
                          display: 'flex',
                          maxWidth: '470px',
                          margin: 'auto',
                        }}
                      >
                        <input
                          value={text}
                          id={`taskData-${index}`}
                          name='taskData'
                          onChange={onChangeInput}
                          spellCheck='false'
                          className={styles.typeInputValues}
                          style={{ marginBottom: '10px', width: '80%' }}
                          placeholder={`<text>__<text>=><answer>`}
                        />
                        <IoCloseCircle
                          size={24}
                          color='white'
                          onClick={() => deleteTextData(index)}
                        />
                      </div>
                    ))}
                  {/* GAP FILLING */}

                  {/* MATCHING */}
                  {task.type === '3' && (
                    <input
                      value={state.task?.at(selectedTask)?.data || ''}
                      name='name'
                      onChange={onChangeInput}
                      spellCheck='false'
                      className={styles.typeInputValues}
                      placeholder='Please type content...'
                    />
                  )}
                  {/* MATCHING */}

                  {/* ARRANGEMENT */}
                  {task.type === '4' &&
                    task.data.map((text, index) => (
                      <div
                        style={{
                          display: 'flex',
                          maxWidth: '470px',
                          margin: 'auto',
                        }}
                      >
                        <input
                          value={text}
                          id={`taskData-${index}`}
                          name='taskData'
                          onChange={onChangeInput}
                          spellCheck='false'
                          className={styles.typeInputValues}
                          style={{ marginBottom: '10px', width: '80%' }}
                          placeholder='<content>-<index>'
                        />
                        <IoCloseCircle
                          size={24}
                          color='white'
                          onClick={() => deleteTextData(index)}
                        />
                      </div>
                    ))}
                  {/* ARRANGEMENT */}

                  {/* OTHERS */}
                  {task.type === '5' && (
                    <input
                      value={state.task?.at(selectedTask)?.data || ''}
                      name='name'
                      onChange={onChangeInput}
                      spellCheck='false'
                      className={styles.typeInputValues}
                      placeholder='Please type content...'
                    />
                  )}
                  {/* OTHERS */}
                </div>

                <div className={styles.buttonContainer}>
                  {(task.type === '0' ||
                    task.type === '1' ||
                    task.type === '2' ||
                    task.type === '4') && (
                    <button onClick={addTextData}>Add text data</button>
                  )}
                  {selectedTask && selectedTask !== 'create' && (
                    <>
                      <button onClick={updateTask}>Update task</button>
                      <button onClick={deleteTask}>Delete this task</button>
                    </>
                  )}
                  {selectedTask && selectedTask === 'create' && (
                    <button onClick={addTask}>Add task</button>
                  )}
                </div>
              </div>
            )}

            <div className={styles.buttonContainer}>
              {isLoading ? (
                <img
                  alt='loading'
                  src={require('../../../images/MnyxU.gif')}
                  style={{ width: '5%', height: '5%' }}
                />
              ) : (
                <button className={styles.addProductButton}>
                  {slug === 'create' ? 'Create' : 'Update'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopicForm;
