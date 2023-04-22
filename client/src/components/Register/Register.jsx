import axios from "axios";
import { React, useRef, useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/notification";
import { isEmail, isEmpty, isLength, isMatch } from "../../utils/Validation";
import styles from "./Register.module.css";

const Register = () => {
  const capchaRef = useRef();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirm_password: "",
    password: "",
    address: "",
    nationality: "",
    phonenumber: "",
    position: "",
    avatar:
      "https://res.cloudinary.com/djkdp3bew/image/upload/v1646378355/Website_Learning/143086968_2856368904622192_1959732218791162458_n_wbaxvf.png",
    err: "",
    success: "",
  });
  const { email, confirm_password, password, position, err, success } = user;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password) || isEmpty(position))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, confirm_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });
    try {
      const res = await axios.post("http://localhost:5000/user/register", {
        ...user,
      });
      setUser({ ...user, err: "", success: res.data.msg });
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
              <div id="login" className={styles.userBox}>
                <h1 className={styles.accountTitle}>Register</h1>
                <div style={{ marginBottom: 10 }}>
                  {err && showErrMsg(err)}
                  {success && showSuccessMsg(success)}
                </div>
                <form
                  action="/Register"
                  id={styles.customerRegister}
                  name="form-Register"
                  onSubmit={registerSubmit}
                >
                  <div className={`${styles.input}`}>
                    <label htmlFor="" className={styles.iconField}>
                      <MdDriveFileRenameOutline />
                    </label>
                    <input
                      className={styles.text}
                      type="text"
                      id="last_name"
                      name="firstname"
                      placeholder="First Name..."
                      size="32"
                      value={user.firstname}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor="" className={styles.iconField}>
                      <MdDriveFileRenameOutline />
                    </label>
                    <input
                      className={styles.text}
                      type="text"
                      id="fisrt_name"
                      name="lastname"
                      placeholder="Last Name..."
                      size="32"
                      value={user.lastname}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor="" className={styles.iconField}>
                      <MdDriveFileRenameOutline />
                    </label>
                    <input
                      type="email"
                      id="email-user"
                      className={styles.text}
                      name="email"
                      placeholder="Email..."
                      size="32"
                      value={user.email}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor="" className={styles.iconField}>
                      <MdDriveFileRenameOutline />
                    </label>
                    <input
                      className={styles.text}
                      type="password"
                      id="password-user"
                      name="password"
                      placeholder="PassWord..."
                      size="32"
                      autoComplete="on"
                      value={user.password}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor="" className={styles.iconField}>
                      <MdDriveFileRenameOutline />
                    </label>
                    <input
                      className={styles.text}
                      type="password"
                      id="password-user"
                      name="confirm_password"
                      placeholder="Confirm PassWord ..."
                      size="32"
                      autoComplete="on"
                      value={user.confirm_password}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className={`${styles.input}`}>
                    <label htmlFor="" className={styles.iconField}>
                      <MdDriveFileRenameOutline />
                    </label>
                    <select
                      style={{ width: 240 }}
                      name="position"
                      className={styles.text}
                      value={user.position}
                      onChange={onChangeInput}
                    >
                      <option value="">Options: </option>
                      <option value="lecturers">Lecturers</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <input
                    type="submit"
                    value="Register"
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

export default Register;
