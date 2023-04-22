import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const TypeForm = (props) => {
  const { slug } = useParams();
  const [state, setState] = useState({
    name: '',
    slug: '',
    image: '',
    content: '',
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(`http://localhost:5000/api/types/${slug}`);
    console.log(data);

    setState({
      ...state,
      name: data.data.name,
      slug: data.data.slug,
      image: data.data.image,
      content: data.data.content,
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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

      const res = await axios.post('/admin/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setState({ ...state, image: res.data.image });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: 'put',
        url: `http://localhost:5000/api/types/${slug}`,
        data: state,
      });
      alert('Update Successfully!');

      setTimeout(() => {
        window.location.replace(`/types`);
      }, 2000);
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
              <label>Content</label>
              <div className={styles.textEditor}>
                <Editor
                  value={state.content}
                  onEditorChange={(e) =>
                    {
                    setState({ ...state, content: e })}
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
            <div className={styles.buttonContainer}>
              <button className={styles.addProductButton}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TypeForm;
