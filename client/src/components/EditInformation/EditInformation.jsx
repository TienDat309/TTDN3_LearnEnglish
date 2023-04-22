import axios from 'axios';
import { React, useContext, useEffect, useState } from 'react';
import {
  MdOutlineLocalPhone,
  MdOutlineCreditCard,
  MdOutlineHome,
  MdOutlineFlag,
  MdOutlinePassword,
  MdOutlinePeopleOutline,
  MdOutlineCameraAlt,
} from 'react-icons/md';
import { GlobalState } from '../../GlobalState';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification';
import {
  isEmail,
  isEmpty,
  isLength,
  isMatchHashPassword,
} from '../../utils/Validation';
import styles from './EditInformation.module.css';

const EditInformation = () => {
  const state = useContext(GlobalState);
  const data = state.userApi.user[0];
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    password: '',
    address: '',
    nationality: '',
    phonenumber: '',
    bank: '',
    avatar:
      'https://res.cloudinary.com/djkdp3bew/image/upload/v1646378355/Website_Learning/143086968_2856368904622192_1959732218791162458_n_wbaxvf.png',
    err: '',
    success: '',
  });

  useEffect(() => {
    setUser({
      ...user,
      _id: data?._id || '',
      firstname: data?.firstname || '',
      lastname: data?.lastname || '',
      address: data?.address || '',
      nationality: data?.nationality || '',
      phonenumber: data?.phonenumber || '',
      bank: data?.bank || '',
      avatar: data?.avatar || '',
    });
  }, [data]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
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
      console.log(res);
      setUser({ ...user, avatar: res.data.image });
      setIsLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (isEmpty(user.firstname) || isEmpty(user.lastname))
      return setUser({
        ...user,
        err: 'Please fill in all required fields',
        success: '',
      });

    if (!isMatchHashPassword(user.password, data.password))
      return setUser({ ...user, err: 'Password did not match.', success: '' });

    try {
      const res = await axios.put('http://localhost:5000/user/update', {
        ...user,
        password: '',
      });
      setUser({ ...user, err: '', success: res.data.msg });
      alert('Successfully');
      window.location.replace('/');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className={styles.containerRegister}>
      <section className={styles.register}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.registerWrapper}>
              <div id='login' className={styles.userBox}>
                <h1 className={styles.accountTitle}>Edit Profile</h1>
                <div style={{ marginBottom: 10 }}>
                  {user.err && showErrMsg(user.err)}
                  {user.success && showSuccessMsg(user.success)}
                </div>
                <form onSubmit={handleSubmission} style={{textAlign: 'center'}}>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlinePeopleOutline />
                    </label>
                    <input
                      className={styles.text}
                      type='text'
                      id='last_name'
                      name='firstname'
                      placeholder='First Name...'
                      size='32'
                      value={user?.firstname}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlinePeopleOutline />
                    </label>
                    <input
                      className={styles.text}
                      type='text'
                      id='fisrt_name'
                      name='lastname'
                      placeholder='Last Name...'
                      size='32'
                      value={user?.lastname}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlineCameraAlt />
                    </label>
                    <input
                      className={styles.text}
                      type='file'
                      id='file'
                      placeholder='Avatar...'
                      size='32'
                      onChange={handleUpload}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlineLocalPhone />
                    </label>
                    <input
                      className={styles.text}
                      type='text'
                      name='phonenumber'
                      placeholder='Phone number...'
                      size='32'
                      value={user.phonenumber}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlineCreditCard />
                    </label>
                    <input
                      className={styles.text}
                      type='text'
                      name='bank'
                      placeholder='Paypal number...'
                      size='32'
                      value={user.bank}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlineHome />
                    </label>
                    <input
                      className={styles.text}
                      type='text'
                      name='address'
                      placeholder='Address...'
                      size='32'
                      value={user.address}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlineFlag />
                    </label>
                    <input
                      className={styles.text}
                      type='text'
                      name='nationality'
                      placeholder='Nationality...'
                      size='32'
                      value={user.nationality}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlinePassword />
                    </label>
                    <input
                      className={styles.text}
                      type='password'
                      id='password-user'
                      name='password'
                      placeholder='Please type password to confirm...'
                      size='32'
                      autoComplete='off'
                      value={user.password}
                      onChange={onChangeInput}
                    />
                  </div>
                  {isLoading ? (
                    <img
                      alt='loading'
                      src={require('../../images/MnyxU.gif')}
                      style={{ width: '5%', height: '5%', }}
                    />
                  ) : (
                    <input
                      type='submit'
                      value='Save'
                      className={styles.btnSignin}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditInformation;
