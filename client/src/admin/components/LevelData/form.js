import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const LevelForm = (props) => {
  const { slug, typeSlug } = useParams();
  const [state, setState] = useState({
    name: '',
    slug: '',
    image: '',
    content: '',
    typeSlug,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(
      `http://localhost:5000/api/types/${typeSlug}/levels/${slug}`
    );
    console.log(data);

    setState({
      ...state,
      name: data.data?.name,
      slug: data.data?.slug,
      image: data.data?.image,
      content: data.data?.content,
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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
    }
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (slug === 'create') {
        await axios({
          method: 'post',
          url: `http://localhost:5000/api/types/${typeSlug}/levels`,
          data: state,
        });
        alert('Create Successfully!');
      } else {
        await axios({
          method: 'put',
          url: `http://localhost:5000/api/types/${typeSlug}/levels/${slug}`,
          data: state,
        });
        alert('Update Successfully!');
      }

      setTimeout(() => {
        window.location.replace(`/types/${typeSlug}/levels`);
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

export default LevelForm;
