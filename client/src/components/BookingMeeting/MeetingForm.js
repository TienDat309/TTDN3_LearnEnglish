import styles from './BookingMeeting.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MeetingForm = (props) => {
  return (
    <div className={styles.block}>
      <div className={styles.left}>
        <h3>Create a Meeting</h3>
        <form onSubmit={props.NewTopicSubmit}>
          <div>
            <select
              style={{ marginLeft: 200, width: 200 }}
              name='nameSkills'
              className={styles.selectOption}
              value={props.createmeeting.nameSkills}
              onChange={props.onChangeInput}
            >
              <option value=''>Options: </option>
              <option value='Listening'>Listening</option>
              <option value='Reading'>Reading</option>
              <option value='Speaking'>Speaking</option>
              <option value='Writing'>Writing</option>
            </select>

            <select
              style={{ marginLeft: 5, width: 200 }}
              name='levelSkill'
              className={styles.selectOption}
              value={props.createmeeting.levelSkill}
              onChange={props.onChangeInput}
            >
              <option value=''>Options: </option>
              <option value='Beginner A1'>Beginner A1</option>
              <option value='Pre-intermediate A2'>Pre-intermediate A2</option>
              <option value='Intermediate B1'>Intermediate B1</option>
              <option value='Upper intermediate B2'>
                Upper intermediate B2
              </option>
              <option value='Advanced C1'>Advanced C1</option>
            </select>
          </div>

          <div className={styles.typeInput}>
            <input
              name='nameTopic'
              value={props.createmeeting.nameTopic}
              onChange={props.onChangeInput}
              spellCheck='false'
              className={styles.typeInputValues}
              placeholder='Please type name content...'
            />
          </div>

          <div className={styles.typeInput}>
            <input
              name='linkMeeting'
              value={props.createmeeting.linkMeeting}
              onChange={props.onChangeInput}
              spellCheck='false'
              className={styles.typeInputValues}
              placeholder='Please type link meeting...'
            />
          </div>
          <div className={styles.typeInput}>
            <input
              name='dayCreate'
              value={props.createmeeting.dayCreate}
              onChange={props.onChangeInput}
              type='date'
              id='datechoise'
              spellCheck='false'
              className={styles.typeInputValues}
            />
          </div>

          <div className={styles.typeInput}>
            <input
              name='hourCreate'
              value={props.createmeeting.hourCreate}
              onChange={props.onChangeInput}
              type='time'
              id='timechoise'
              spellCheck='false'
              className={styles.typeInputValues}
            />
          </div>

          <div className={styles.typeInput}>
            <input
              name='endTime'
              value={props.createmeeting.endTime}
              onChange={props.onChangeInput}
              type='time'
              id='endTime'
              spellCheck='false'
              className={styles.typeInputValues}
            />
          </div>

          <div className={styles.typeInput}>
            <textarea
              style={{ height: 150 }}
              name='message'
              value={props.createmeeting.message}
              onChange={props.onChangeInput}
              spellCheck='false'
              className={styles.typeInputValues}
              placeholder='Please type message...'
            />
          </div>
          <div className={styles.typeInput}>
            <input
              name='costTopic'
              value={props.createmeeting.costTopic}
              onChange={props.onChangeInput}
              spellCheck='false'
              className={styles.typeInputValues}
              placeholder='Type 0 for free...'
            />
          </div>
          <button style={{ marginTop: 30 }} className={styles.addProductButton}>
            Create a Meeting
          </button>
        </form>
        <div>
          <button
            style={{ marginTop: 5, marginBottom: 20 }}
            className={styles.addProductButton}
            onClick={props.eventChange}
          >
            View Schedule
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <img src={props.user?.avatar} alt='' />
        </div>
        <div className={styles.blockInfor}>
          <p>Gmail: {props.user?.email}</p>
          <p>
            Name: {props.user?.firstname} {props.user?.lastname}
          </p>
          <p>Phone: {props.user?.phonenumber}</p>
          <p>Paypal Number: {props.user?.bank}</p>
          <p>Address: {props.user?.address}</p>
          <p>Nationality: {props.user?.nationality}</p>
        </div>
        <Button variant='contained' color='info' style={{ left: '30%' }}>
          <Link to={'/Profile'} style={{ color: 'white' }}>
            Edit information
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MeetingForm;
