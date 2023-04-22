import { React, useState } from 'react';
import styles from './LoginAdmin.module.css';
import axios from 'axios';

const LoginAdmin = () => {
  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });
  // set admin
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };
  // post from client to server
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/login', { ...admin, withCredentials: true });
      localStorage.setItem('AdminLogin', true);
      alert('Login Successfully!');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className={styles.AdminLoginBox}>
      <form action='' onSubmit={loginSubmit}>
        <h1>Admin Login</h1>
        <input
          type='Email'
          placeholder='Please type your email !'
          required
          name='email'
          autoComplete='on'
          value={admin.email}
          onChange={onChangeInput}
        />
        <input
          type='password'
          placeholder='Please type your password !'
          required
          name='password'
          autoComplete='on'
          value={admin.password}
          onChange={onChangeInput}
        />
        <button>Login</button>
      </form>
      <h2>
        Manager Page <br />
        copyright © 2021 HKK team
      </h2>
    </div>
  );
};

export default LoginAdmin;
