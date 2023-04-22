import React, { useEffect, useState } from 'react';
import styles from '../UpdateTopic.module.css';
import axios from 'axios';
import { SKILLS, SKILL_LEVELS } from '../../../../common/constant';

const UpdateListening = (props) => {
  const [dataListening, setDataListening] = useState(null);

  const [stateTask1, setstateTask1] = useState(false);
  const [stateTask2, setstateTask2] = useState(false);
  const [stateTask3, setstateTask3] = useState(false);

  const getData = async () => {
    const data = await axios.get(
      `http://localhost:5000/admin/getTopic?type=listening&_id=${props.topicId}`
    );

    if (data.data.err) {
      setDataListening(null);
      return;
    }
    console.log(data.data);

    setDataListening(data.data);
  };

  useEffect(() => {
    getData();
  }, [props.topicId]);

  const onChangeTask = (e) => {
    let temp = e.target.value;
    if (temp === 'task1') {
      setstateTask1(true);
      setstateTask2(false);
      setstateTask3(false);
    } else if (temp === 'task2') {
      setstateTask2(true);
      setstateTask1(false);
      setstateTask3(false);
    } else if (temp === 'task3') {
      setstateTask3(true);
      setstateTask1(false);
      setstateTask2(false);
    } else {
      setstateTask1(false);
      setstateTask2(false);
      setstateTask3(false);
    }
  };

  const [listeningTopic, setlisteningTopic] = useState({
    contentType: '',
    imageType: '',
    type: 'Listening',
    slug: 'listening',
    dateCreate: new Date(),
    nameLevel: '',
    slugLevel: '',
    contentLevel: '',
    images: '',
    topicCode: '',
    nameTopic: '',
    slugTopic: '',
    contentTopic: '',
    imageTopic: '',
    radio: '',
    tranScript: '',
    dataTask1: '',
    taskName1: '',
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    text5: '',
    text6: '',
    task3text1: '',
    task3text2: '',
    task3text3: '',
    task3text4: '',
    task3text5: '',
    task3text6: '',
  });

  useEffect(() => {
    if (dataListening) {
      setlisteningTopic({
        ...listeningTopic,
        contentType: dataListening.contentType,
        imageType: dataListening.imageType,
        dateCreate: new Date(),
        nameLevel: dataListening.level.nameLevel,
        slugLevel: dataListening.level.slugLevel,
        contentLevel: dataListening.level.contentLevel,
        images: dataListening.level.images,
        topicCode: dataListening.level.topic.topicCode,
        nameTopic: dataListening.level.topic.nameTopic,
        slugTopic: dataListening.level.topic.slugTopic,
        contentTopic: dataListening.level.topic.contentTopic,
        imageTopic: dataListening.level.topic.imageTopic,
        radio: dataListening.level.topic.radio,
        tranScript: dataListening.level.topic.tranScript,
        dataTask1: dataListening.level.topic.task[0].task1.data,
        taskName1: dataListening.level.topic.task[0].task1.taskName,
        text1: dataListening.level.topic.task[1].task2.text1,
        text2: dataListening.level.topic.task[1].task2.text2,
        text3: dataListening.level.topic.task[1].task2.text3,
        text4: dataListening.level.topic.task[1].task2.text4,
        text5: dataListening.level.topic.task[1].task2.text5,
        text6: dataListening.level.topic.task[1].task2.text6,
        task3text1: dataListening.level.topic.task[2].task3.text1,
        task3text2: dataListening.level.topic.task[2].task3.text2,
        task3text3: dataListening.level.topic.task[2].task3.text3,
        task3text4: dataListening.level.topic.task[2].task3.text4,
        task3text5: dataListening.level.topic.task[2].task3.text5,
        task3text6: dataListening.level.topic.task[2].task3.text6,
      });
    } else {
      setlisteningTopic({
        ...listeningTopic,
        contentType: '',
        imageType: '',
        dateCreate: new Date(),
        nameLevel: '',
        slugLevel: '',
        contentLevel: '',
        images: '',
        topicCode: '',
        nameTopic: '',
        slugTopic: '',
        contentTopic: '',
        imageTopic: '',
        radio: '',
        tranScript: '',
        dataTask1: '',
        taskName1: '',
        text1: '',
        text2: '',
        text3: '',
        text4: '',
        text5: '',
        text6: '',
        task3text1: '',
        task3text2: '',
        task3text3: '',
        task3text4: '',
        task3text5: '',
        task3text6: '',
      });
    }
  }, [dataListening]);

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

      const res = await axios.post('/admin/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setlisteningTopic({ ...listeningTopic, imageType: res.data.image });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleUpload1 = async (e) => {
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

      const res = await axios.post('/admin/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setlisteningTopic({ ...listeningTopic, images: res.data.image });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleUpload2 = async (e) => {
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

      const res = await axios.post('/admin/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setlisteningTopic({ ...listeningTopic, imageTopic: res.data.image });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setlisteningTopic({ ...listeningTopic, [name]: value });
    if (name === 'nameLevel') {
      const level = Object.values(SKILL_LEVELS).find(
        (level) => level.name === value
      );
      if (level) {
        setlisteningTopic({
          ...listeningTopic,
          [name]: value,
          slugLevel: level.slug,
        });
      }
    }

    if (name === 'nameTopic') {
      setlisteningTopic({
        ...listeningTopic,
        [name]: value,
        slugTopic: value
          .trim()
          .toLowerCase()
          .replace(/\s{2,}/g, ' ')
          .replace(' ', '-'),
      });
    }
  };

  const NewTopicSubmit = async (e) => {
    e.preventDefault();
    try {
      if (dataListening) {
        await axios.put('http://localhost:5000/admin/updateTopicListening', {
          ...listeningTopic,
          _id: dataListening._id,
        });
        alert('Update Successfully!');
      } else {
        await axios.post('http://localhost:5000/admin/createTopicListening', {
          ...listeningTopic,
        });
        alert('Create Successfully!');
      }
      setTimeout(() => {
        window.location.href = '/update';
      }, 2000);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const deleteTopic = async (e) => {
    e.preventDefault();
    if (window.confirm('Delete the topic?')) {
      try {
        await axios.delete(
          `http://localhost:5000/admin/deleteTopicListening?_id=${props.topicId}`
        );
        alert('Delete Successfully!');
        setTimeout(() => {
          window.location.href = '/update';
        }, 2000);
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  // if (!dataListening.length) {
  //   return <div></div>;
  // }

  return (
    <div>
      <form onSubmit={NewTopicSubmit}>
        {/* section skill */}
        <div className={styles.typeInput}>
          <label>Content Skills</label>
          <textarea
            style={{ height: 150 }}
            value={listeningTopic.contentType}
            name='contentType'
            onChange={onChangeInput}
            spellCheck='false'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>
        <div className={styles.typeInput}>
          <label>Images Skills</label>
          <input
            type='file'
            id='file'
            onChange={handleUpload}
            spellCheck='false'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>
        {/* section skill */}

        {/* section level skill */}
        <div className={styles.typeInput}>
          <label>Content Level Skills</label>
          <textarea
            value={listeningTopic.contentLevel}
            name='contentLevel'
            onChange={onChangeInput}
            spellCheck='false'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>
        <div className={styles.typeInput}>
          <label>Images Level Skills</label>
          <input
            onChange={handleUpload1}
            type='file'
            id='file'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>

        <div className={styles.typeInput}>
          <label>Level Type Skills</label>
          <select
            value={listeningTopic.nameLevel}
            name='nameLevel'
            onChange={onChangeInput}
            className={styles.typeInputValues}
            placeholder='Please type content...'
          >
            <option value='' disabled>
              Select level
            </option>
            {Object.values(SKILL_LEVELS).map((level) => (
              <option value={level.name}>{level.name}</option>
            ))}
          </select>
        </div>
        {/* section level skill */}

        {/* section topic skill */}
        <div className={styles.typeInput}>
          <label>Content Topic</label>
          <textarea
            value={listeningTopic.contentTopic}
            onChange={onChangeInput}
            name='contentTopic'
            spellCheck='false'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>
        <div className={styles.typeInput}>
          <label>Images Topic</label>
          <input
            onChange={handleUpload2}
            type='file'
            id='file'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>

        <div className={styles.typeInput}>
          <label>Radio Topic</label>
          <input
            value={listeningTopic.radio}
            onChange={onChangeInput}
            spellCheck='false'
            name='radio'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>

        <div className={styles.typeInput}>
          <label>Transcript Topic</label>
          <textarea
            value={listeningTopic.tranScript}
            onChange={onChangeInput}
            spellCheck='false'
            name='tranScript'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>

        <div className={styles.typeInput}>
          <label>Topic Code</label>
          <input
            value={listeningTopic.topicCode}
            onChange={onChangeInput}
            spellCheck='false'
            name='topicCode'
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>

        <div className={styles.typeInput}>
          <label>Name Topic</label>
          <input
            onChange={onChangeInput}
            name='nameTopic'
            spellCheck='false'
            value={listeningTopic.nameTopic}
            className={styles.typeInputValues}
            placeholder='Please type content...'
          />
        </div>

        {/* section topic skill */}

        {/* task in topic */}
        <div className={styles.typeInput}>
          <label>Task</label>
          <select
            name='select'
            className={styles.typeInputValues}
            onChange={onChangeTask}
          >
            <option value=''>Select task</option>
            <option value='task1'>Task1</option>
            <option value='task2'>Task2</option>
            <option value='task3'>Task3</option>
          </select>
        </div>
        {/* task1 in topic */}
        {stateTask1 ? (
          <div>
            <div className={styles.typeInput}>
              <label>Data Task1</label>
              <input
                spellCheck='false'
                name='dataTask1'
                onChange={onChangeInput}
                value={listeningTopic.dataTask1}
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
                value={listeningTopic.taskName1}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
          </div>
        ) : (
          ''
        )}

        {/* task1 in topic */}

        {/* task2 in topic */}
        {stateTask2 ? (
          <div>
            <div className={styles.typeInput}>
              <label>Data Text1 Task2</label>
              <input
                spellCheck='false'
                name='text1'
                value={listeningTopic.text1}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text2 Task2</label>
              <input
                spellCheck='false'
                name='text2'
                value={listeningTopic.text2}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text3 Task2</label>
              <input
                spellCheck='false'
                name='text3'
                value={listeningTopic.text3}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text4 Task2</label>
              <input
                spellCheck='false'
                name='text4'
                value={listeningTopic.text4}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text5 Task2</label>
              <input
                spellCheck='false'
                name='text5'
                value={listeningTopic.text5}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text6 Task2</label>
              <input
                spellCheck='false'
                name='text6'
                value={listeningTopic.text6}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
          </div>
        ) : (
          ''
        )}

        {/* task2 in topic */}

        {/* task3 in topic */}
        {stateTask3 ? (
          <div>
            <div className={styles.typeInput}>
              <label>Data Text1 Task3</label>
              <input
                spellCheck='false'
                name='task3text1'
                value={listeningTopic.task3text1}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text2 Task3</label>
              <input
                spellCheck='false'
                name='task3text2'
                value={listeningTopic.task3text2}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text3 Task3</label>
              <input
                spellCheck='false'
                name='task3text3'
                value={listeningTopic.task3text3}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text4 Task3</label>
              <input
                spellCheck='false'
                name='task3text4'
                value={listeningTopic.task3text4}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text5 Task3</label>
              <input
                spellCheck='false'
                name='task3text5'
                value={listeningTopic.task3text5}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
            <div className={styles.typeInput}>
              <label>Data Text6 Task3</label>
              <input
                spellCheck='false'
                name='task3text6'
                value={listeningTopic.task3text6}
                onChange={onChangeInput}
                className={styles.typeInputValues}
                placeholder='Please type content...'
              />
            </div>
          </div>
        ) : (
          // <div>
          //   <div className={styles.typeInput}>
          //     <label>Data Task3</label>
          //     <input
          //       spellCheck="false"
          //       name="dataTask3"
          //       value={listeningTopic.dataTask3}
          //       onChange={onChangeInput}
          //       className={styles.typeInputValues}
          //       placeholder="Please type content..."
          //     />
          //   </div>
          //   <div className={styles.typeInput}>
          //     <label>Task Name</label>
          //     <input
          //       spellCheck="false"
          //       name="taskName3"
          //       value={listeningTopic.taskName3}
          //       onChange={onChangeInput}
          //       className={styles.typeInputValues}
          //       placeholder="Please type content..."
          //     />
          //   </div>
          // </div>
          ''
        )}

        {/* task3 in topic */}
        {/* task in topic */}
        <div className={styles.buttonContainer}>
          <button className={styles.addProductButton}>
            {dataListening ? 'Update' : 'Create'}
          </button>

          {dataListening ? (
            <button onClick={deleteTopic} className={styles.addProductButton}>
              Delete
            </button>
          ) : (
            ''
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateListening;
