import { useState, useEffect } from 'react';
import styles from './CheckGrammarByText.module.css';
import Image1 from '../../images/grammar_check.jpg';
import Image2 from '../../images/misused_words.jpg';
import Image3 from '../../images/punctuation_check.jpg';
import Image4 from '../../images/spelling_check.jpg';
import AssistantGrammar from '../AssistantGrammar/AssistantGrammar';

const CheckGrammarByText = () => {
  const [valueInput, setvalueInput] = useState('');
  const [data, setData] = useState('');
  const [checkData, setcheckData] = useState(false);
  const [array1, setarray1] = useState([]);
  const [array2, setarray2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    data.data !== undefined ? setcheckData(true) : setcheckData(false);
  }, [data]);

  const eventGetData = (e) => {
    setvalueInput(e.target.value);
    setData(e.target.value);
  };

  const eventSubmit = async () => {
    setarray1([]);
    setarray2([]);

    setIsLoading(true);
    console.log(JSON.stringify(valueInput.trim()))

    await fetch('/api1/gramformer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valueInput.trim()),
    });

    await fetch('/api1/gramformer')
      .then((res) => res.json())
      .then((datas) => {
        setIsLoading(false);
        console.log(datas);
        setData(datas);
        let str1 = valueInput.trim().replace(/\s+/g, ' ');
        let str2 = datas.data;

        if (
          str1.split(' ').length < str2.split(' ').length ||
          str1.split(' ').length > str2.split(' ').length
        ) {
          for (let i = 0; i < str1.split(' ').length; i++) {
            setarray1((prev) => [...prev, str1.split(' ')[i]]);
            setarray2((prev) => [...prev, str2.split(' ')[i]]);
          }
        } else {
          for (let i = 0; i < str1.split(' ').length; i++) {
            if (str1.split(' ')[i] !== str2.split(' ')[i]) {
              setarray1((prev) => [...prev, str1.split(' ')[i]]);
              setarray2((prev) => [...prev, str2.split(' ')[i]]);
            }
          }
        }
      });
  };
  return (
    <div className={styles.containChecking}>
      <div className={styles.content}>
        <h1 className={styles.title}>Grammar Check</h1>
        <div className={styles.subtitle}>
          Check your English text for grammar, spelling, and punctuation
          <br />
          errors with Grammarly’s free grammar checker.
        </div>
      </div>
      <div className={styles.checkBlock}>
        <div className={styles.column1}>
          <div className={styles.items}>
            <img className={styles.image1} src={Image1} alt='' />
            <br />
            <span className={styles.imageTitle}>
              Grammatical <br />
              Errors
            </span>
          </div>
          <div className={styles.items}>
            <img className={styles.image1} src={Image4} alt='' />
            <br />
            <span className={styles.imageTitle}>
              Spelling <br />
              Errors
            </span>
          </div>
        </div>

        <div className={styles.blockText}>
          {checkData ? (
            <textarea
              className={styles.textAr}
              spellCheck='false'
              placeholder='Start writing here...'
              value={data.data}
              onChange={eventGetData}
            />
          ) : (
            <textarea
              className={styles.textAr}
              spellCheck='false'
              placeholder='Start writing here...'
              onChange={eventGetData}
            />
          )}
          {isLoading ? (
            <div style={{ height: '50px' }}>
              <img
                alt='loading'
                src={require('../../images/MnyxU.gif')}
                style={{ height: '100%' }}
              />
            </div>
          ) : (
            <button className={styles.btnCheck} onClick={eventSubmit}>
              <span>Check your text</span>
            </button>
          )}
        </div>

        <div className={styles.column2}>
          <div className={styles.items}>
            <img className={styles.image1} src={Image3} alt='' />
            <br />
            <span className={styles.imageTitle}>
              Incorrect <br />
              Punctuation
            </span>
          </div>
          <div className={styles.items}>
            <img className={styles.image1} src={Image2} alt='' />
            <br />
            <span className={styles.imageTitle}>
              Misused <br />
              Words
            </span>
          </div>
        </div>
      </div>
      {checkData ? (
        <AssistantGrammar data={true} array1={array1} array2={array2} />
      ) : (
        ''
      )}
    </div>
  );
};

export default CheckGrammarByText;
