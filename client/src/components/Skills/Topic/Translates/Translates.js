import React from 'react';
import styles from './Translates.module.css';
import { AiFillSound, AiOutlineClose } from 'react-icons/ai';
import fileAudio from '../../../../utils/speech.mp3';

const Translates = (props) => {
  let audio = new Audio(fileAudio);

  const start = () => {
    audio.play();
  };

  if (!props.data.length) {
    return <div></div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <AiOutlineClose
          style={{
            float: 'right',
            fontSize: 13,
            marginTop: -7,
            marginRight: 7,
            cursor: 'pointer',
          }}
          onClick={() => props.setShowTranslate(false)}
        />
        <div>
          <select className={styles.selectLanguage} readonly='readonly'>
            <option>ANH</option>
          </select>
          <p className={styles.textTranslate}>
            <AiFillSound
              style={{ color: '#a1a1a1', cursor: 'pointer' }}
              onClick={start}
            />
            {'   '}
            {props.data[0]}
          </p>
        </div>
        <div>
          <span className={styles.typeTextTranslate}>VIỆT</span>
          <p className={styles.textTranslate} style={{ paddingBottom: 15 }}>
            <AiFillSound style={{ color: '#a1a1a1', cursor: 'pointer' }} />
            {'   '}
            {props.data[1].data}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Translates;
