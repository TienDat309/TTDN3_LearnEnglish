import { React, useState, useEffect } from 'react';
import styles from './CheckGrammarByImage.module.css';
import { createWorker } from 'tesseract.js';
import { FilePond, registerPlugin } from 'react-filepond';
import { FaSyncAlt } from 'react-icons/fa';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CheckGrammarByImage = () => {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState({ ocrText: '', pctg: '0.00' });
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const eventChangeData = () => {
    setData('');
  };

  const worker = createWorker({
    logger: (m) => updateProgressAndLog(m),
  });

  const updateProgressAndLog = (m) => {
    var MAX_PARCENTAGE = 1;
    var DECIMAL_COUNT = 2;

    if (m.status === 'recognizing text') {
      var pctg = (m.progress / MAX_PARCENTAGE) * 100;
      setText({
        pctg: pctg.toFixed(DECIMAL_COUNT),
      });
    }
  };

  const doOCR = async (file) => {
    setText({
      ocrText: '',
      pctg: '0.00',
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(file.file);

    let temp = text.split(' ').join('');
    let check = false;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].charCodeAt() >= 33 && temp[i].charCodeAt() <= 45) {
        check = true;
        break;
      }
    }
    if (!check) {
      setData({
        data: 'The image should contain the character!',
      });
    }

    setText({
      ocrText: text,
      pctg: 100.0,
    });
  };

  const eventLoad = async () => {
    if (text.ocrText === '') {
      setData({
        data: 'Empty!!!',
      });
    }

    setIsLoading(true);

    await fetch('/api1/gramformer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(text.ocrText.trim()),
    });

    fetch('/api1/gramformer')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Grammar Check By Image</h1>
        <div className={styles.subtitle}>
          We present an online OCR (Optical Character Recognition) service to
          extract text from image.
          <br />
          Check your English text for grammar, spelling, and punctuation errors
          with
          <br />
          Grammarly’s free grammar checker.
        </div>
      </div>

      <div className={styles.blockContent}>
        <div className={styles.leftContent}>
          <FilePond
            className={styles.filePondUp}
            files={files}
            allowReorder={true}
            allowMultiple={false}
            onupdatefiles={setFiles}
            onaddfile={(err, file) => {
              doOCR(file);
            }}
            onremovefile={(err, file) => {
              setFiles([]);
              setText({
                ocrText: '',
                pctg: '0.00',
              });
              setData({
                data: 'Empty!!!',
              });
            }}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          <div className={styles.async}>
            <div>
              <FaSyncAlt className={styles.iconSync} />
            </div>
            <div className={styles.percent}>
              <p>{text.pctg}%</p>
            </div>
          </div>
          {text.ocrText ? (
            isLoading ? (
              <div style={{ height: '50px', marginLeft: '210px' }}>
                <img
                  alt='loading'
                  src={require('../../images/MnyxU.gif')}
                  style={{ height: '100%' }}
                />
              </div>
            ) : (
              <button className={styles.btnCheck} onClick={eventLoad}>
                <span>Check your text</span>
              </button>
            )
          ) : (
            ''
          )}
        </div>
        <div className={styles.rightContent}>
          <div className={styles.blockText}>
            <textarea
              className={styles.textAr}
              spellCheck='false'
              placeholder='Result of image !!!'
              value={data.data}
              onChange={eventChangeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckGrammarByImage;
