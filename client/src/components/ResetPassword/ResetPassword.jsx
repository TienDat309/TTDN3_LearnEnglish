import axios from 'axios';
import { React, useContext, useEffect, useRef, useState } from 'react';
import { MdOutlinePassword } from 'react-icons/md';
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
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  const state = useContext(GlobalState);
  const data = state.userApi.user[0];
  const [user, setUser] = useState({
    _id: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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
    if (
      isEmpty(user.oldPassword) ||
      isEmpty(user.newPassword) ||
      isEmpty(user.confirmPassword)
    )
      return setUser({
        ...user,
        err: 'Please fill in all fields',
        success: '',
      });

    if (!isMatchHashPassword(user.oldPassword, data.password))
      return setUser({
        ...user,
        err: 'Password is not correct.',
        success: '',
      });

    if (!isMatch(user.newPassword, user.confirmPassword))
      return setUser({ ...user, err: 'Password did not match.', success: '' });

    if (isMatch(user.newPassword, user.oldPassword))
      return setUser({ ...user, err: 'The new password is the same as the old password.', success: '' });

    try {
      const res = await axios.put('http://localhost:5000/user/update', {
        ...user,
        password: user.newPassword,
      });
      setUser({ ...user, err: '', success: res.data.msg });
      alert('Successfully');
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
                <h1 className={styles.accountTitle}>Reset Password</h1>
                <div style={{ marginBottom: 10 }}>
                  {user.err && showErrMsg(user.err)}
                  {user.success && showSuccessMsg(user.success)}
                </div>
                <form onSubmit={handleSubmission}>
                  <div className={`${styles.input}`}>
                    <label htmlFor='' className={styles.iconField}>
                      <MdOutlinePassword />
                    </label>
                    <input
                      className={styles.text}
                      type='password'
                      name='oldPassword'
                      placeholder='Old password...'
                      size='32'
                      autoComplete='off'
                      value={user.oldPassword}
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
                      name='newPassword'
                      placeholder='New password...'
                      size='32'
                      autoComplete='off'
                      value={user.newPassword}
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
                      name='confirmPassword'
                      placeholder='Confirm password...'
                      size='32'
                      autoComplete='off'
                      value={user.confirmPassword}
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

export default ResetPassword;
