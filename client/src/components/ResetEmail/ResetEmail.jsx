import axios from 'axios';
import { React, useContext, useEffect, useRef, useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { GlobalState } from '../../GlobalState';
import {
  showErrMsg,
  showSuccessMsg,
} from '../../utils/notification/notification';
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
  isMatchHashPassword,
} from '../../utils/Validation';
import styles from './ResetEmail.module.css';

const ResetEmail = () => {
  const state = useContext(GlobalState);
  const data = state.userApi.user[0];
  const [user, setUser] = useState({
    _id: '',
    email: '',
    password: '',
    err: '',
    success: '',
  });

  useEffect(() => {
    setUser({
      ...user,
      _id: data?._id || '',
    });
  }, [data]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (isEmpty(user.email) || isEmpty(user.password))
      return setUser({
        ...user,
        err: 'Please fill in all fields',
        success: '',
      });

    if (!isEmail(user.email))
      return setUser({ ...user, err: 'Invalid emails.', success: '' });

    console.log(user.password);

    if (!isMatchHashPassword(user.password, data.password))
      return setUser({
        ...user,
        err: 'Password did not correct.',
        success: '',
      });

    if (isMatch(user.email, data.email))
      return setUser({
        ...user,
        err: 'The new email is the same as the old one.',
        success: '',
      });

    try {
      const res = await axios.put('http://localhost:5000/user/update', {
        ...user,
        password: '',
      });
      setUser({ ...user, err: '', success: res.data.msg });
      alert('Successfully! Please activate your new email to finish.');
      await axios.get('/user/logout');
      localStorage.removeItem('firstLogin');
      window.location.replace('/login');
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
                <h1 className={styles.accountTitle}>Reset Email</h1>
                <div style={{ marginBottom: 10 }}>
                  {user.err && showErrMsg(user.err)}
                  {user.success && showSuccessMsg(user.success)}
                </div>
                <form onSubmit={handleSubmission}>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlineEmail />
                    </label>
                    <input
                      type='email'
                      id='email-user'
                      className={styles.text}
                      name='email'
                      placeholder='New email...'
                      size='32'
                      value={user.email}
                      onChange={onChangeInput}
                      autoComplete='off'
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlineEmail />
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
                  <input
                    type='submit'
                    value='Save'
                    className={styles.btnSignin}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetEmail;
