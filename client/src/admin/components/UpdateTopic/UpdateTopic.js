import React, { useContext, useEffect, useState } from 'react';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
import SideBar from '../SideBar/SideBar';
import styles from './UpdateTopic.module.css';
import UpdateListening from './UpdateListening/UpdateListening';
import UpdateReading from './UpdateReading/UpdateReading';
import UpdateSpeaking from './UpdateSpeaking/UpdateSpeaking';
import UpdateWriting from './UpdateWriting/UpdateWriting';
import UpdateGrammars from './UpdateGrammars/UpdateGrammars';
import UpdateVocabulary from './UpdateVocabulary/UpdateVocabulary';
import { GlobalState } from '../../../GlobalState';

const UpdateTopic = () => {
  const state = useContext(GlobalState);
  const [stateSkillsOption, setstateSkillsOption] = useState(false);
  const [stateGrammar, setstateGrammar] = useState(false);
  const [stateVoc, setstateVoc] = useState(false);

  const [stateUpdateListening, setstateUpdateListening] = useState(false);
  const [stateUpdateSpeaking, setstateUpdateSpeaking] = useState(false);
  const [stateUpdateReading, setstateUpdateReading] = useState(false);
  const [stateUpdateWriting, setstateUpdateWriting] = useState(false);

  const [stateTopic, setStateTopic] = useState(false);

  const [topicId, setTopicId] = useState('');

  const onSelectType = (e) => {
    if (e.target.value === 'skill') {
      setstateSkillsOption(true);
      setstateGrammar(false);
      setstateVoc(false);
      setStateTopic(false);
    } else if (e.target.value === 'grammar') {
      setstateGrammar(true);
      setstateSkillsOption(false);
      setstateVoc(false);
      setStateTopic(true);
    } else if (e.target.value === 'vocabulary') {
      setstateVoc(true);
      setstateSkillsOption(false);
      setstateGrammar(false);
      setStateTopic(true);
    } else {
      setstateVoc(false);
      setstateSkillsOption(false);
      setstateGrammar(false);
      setStateTopic(false);
    }
  };

  const onSelectSkill = (e) => {
    if (e.target.value === 'listening') {
      setstateUpdateListening(true);
      setstateUpdateReading(false);
      setstateUpdateSpeaking(false);
      setstateUpdateWriting(false);
      setStateTopic(true);
    } else if (e.target.value === 'reading') {
      setstateUpdateListening(false);
      setstateUpdateReading(true);
      setstateUpdateSpeaking(false);
      setstateUpdateWriting(false);
      setStateTopic(true);
    } else if (e.target.value === 'speaking') {
      setstateUpdateListening(false);
      setstateUpdateReading(false);
      setstateUpdateSpeaking(true);
      setstateUpdateWriting(false);
      setStateTopic(true);
    } else if (e.target.value === 'writing') {
      setstateUpdateListening(false);
      setstateUpdateReading(false);
      setstateUpdateSpeaking(false);
      setstateUpdateWriting(true);
      setStateTopic(true);
    } else {
      setstateUpdateListening(false);
      setstateUpdateReading(false);
      setstateUpdateSpeaking(false);
      setstateUpdateWriting(false);
      setStateTopic(false);
    }
  };

  const onSelectTopic = (e) => {
    setTopicId(e.target.value);
  };

  useEffect(() => {
    if (stateSkillsOption === false) {
      setstateUpdateListening(false);
      setstateUpdateReading(false);
      setstateUpdateSpeaking(false);
      setstateUpdateWriting(false);
    }
  }, [stateSkillsOption]);

  return (
    <div className={styles.home}>
      <div className={styles.leftContent}>
        <SideBar />
      </div>
      <div className={styles.rightContent}>
        <HeaderSideBar />

        <div className={styles.blockUpdate}>
          <div>
            <select
              name='select'
              className={styles.selectOption}
              onChange={onSelectType}
            >
              <option value=''>Options: </option>
              <option value='skill'>Update: Skills</option>
              <option value='grammar'>Update: Grammars</option>
              <option value='vocabulary'>Update: Vocabulary</option>
            </select>
          </div>
          {stateSkillsOption ? (
            <div>
              <select
                name='select'
                className={styles.selectOption}
                onChange={onSelectSkill}
              >
                <option value=''>Options: </option>
                <option value='listening'>Update: Listening</option>
                <option value='reading'>Update: Reading</option>
                <option value='speaking'>Update: Speaking</option>
                <option value='writing'>Update: Writing</option>
              </select>
            </div>
          ) : (
            ''
          )}
          {stateTopic ? (
            <div>
              <select
                name='select'
                className={styles.selectOption}
                onChange={onSelectTopic}
              >
                <option value=''>Create topic</option>
                {stateUpdateListening
                  ? state.listeningApi.dataListening[0].map((listening) => (
                      <option value={listening._id}>
                        Update topic: {listening.level.topic.nameTopic}
                      </option>
                    ))
                  : ''}
                {stateUpdateReading
                  ? state.readingApi.dataReading[0].map((reading) => (
                      <option value={reading._id}>
                        Update topic: {reading.level.topic.nameTopic}
                      </option>
                    ))
                  : ''}
                {stateUpdateWriting
                  ? state.writingApi.dataWriting[0].map((writing) => (
                      <option value={writing._id}>
                        Update topic: {writing.level.topic.nameTopic}
                      </option>
                    ))
                  : ''}
                {stateUpdateSpeaking
                  ? state.speakingApi.dataSpeaking[0].map((speaking) => (
                      <option value={speaking._id}>
                        Update topic: {speaking.level.topic.nameTopic}
                      </option>
                    ))
                  : ''}
                {stateVoc
                  ? state.vocabularyApi.vocData[0].map((voca) => (
                      <option value={voca._id}>
                        Update topic: {voca.level.topic.nameTopic}
                      </option>
                    ))
                  : ''}
                {stateGrammar
                  ? state.grammarApi.dataGrammar[0].map((grammar) => (
                      <option value={grammar._id}>
                        Update topic: {grammar.level.topic.nameTopic}
                      </option>
                    ))
                  : ''}
              </select>
            </div>
          ) : (
            ''
          )}
          {stateUpdateListening ? <UpdateListening topicId={topicId} /> : ''}
          {stateUpdateReading ? <UpdateReading topicId={topicId} /> : ''}
          {stateUpdateSpeaking ? <UpdateSpeaking topicId={topicId} /> : ''}
          {stateUpdateWriting ? <UpdateWriting topicId={topicId} /> : ''}
          {stateGrammar ? <UpdateGrammars topicId={topicId} /> : ''}
          {stateVoc ? <UpdateVocabulary topicId={topicId} /> : ''}
        </div>
      </div>
    </div>
  );
};

export default UpdateTopic;
