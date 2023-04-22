import axios from 'axios';
import { Fragment, React, useContext, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Button } from '@mui/material';
import { GlobalState } from '../../GlobalState';
import styles from './BookingMeeting.module.css';
import Schedule from '../Schedule/Schedule';
import './filter.css';
import MeetingForm from './MeetingForm';
import MeetingGrid from './MeetingGrid';

const BookingMeeting = () => {
  const state = useContext(GlobalState);
  const [user] = state.userApi.user;

  const [changeState, setchangeState] = useState(true);
  const [dataBooking, setdataBooking] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [createmeeting, setcreatemeeting] = useState({
    lecturerId: '',
    email: '',
    nameLectures: '',
    nameSkills: '',
    levelSkill: '',
    nameTopic: '',
    dayCreate: '',
    hourCreate: '',
    endTime: '',
    message: 'Have a good study session !',
    costTopic: '',
    linkMeeting: '',
  });
  const [paidMeetingIds, setPaidMeetingIds] = useState([]);

  useEffect(() => {
    if (user) {
      setcreatemeeting({
        ...createmeeting,
        lecturerId: user?._id,
        email: user?.email,
        nameLectures: user?.firstname + ' ' + user?.lastname,
      });

      if (user.position === 'lecturers') {
        getLecturerData();
      } else {
        getStudentData();
      }
    }
  }, [user]);

  const getLecturerData = async () => {
    const data = await axios.get(
      'http://localhost:5000/api/getbookmeeting?lecturerId=' + user._id
    );

    console.log(data);

    setdataBooking(data.data);
    setchangeState(true);
  };

  const getStudentData = async () => {
    const payment = await axios.get(
      'http://localhost:5000/api/getpayment?studentId=' + user._id
    );

    if (payment.data) {
      setPaymentHistory(payment.data);
    }

    let data = await axios.get('http://localhost:5000/api/getbookmeeting');
    const paidMeetingId = payment.data.map((paid) => paid.meetingId);
    data = data.data.filter((meeting) => !paidMeetingId.includes(meeting._id));

    setdataBooking(data);
    setPaidMeetingIds(paidMeetingId);
    setchangeState(false);
  };

  const eventChange = () => {
    setchangeState(!changeState);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setcreatemeeting({ ...createmeeting, [name]: value });
    console.log(name, value);
  };

  const NewTopicSubmit = async (e) => {
    e.preventDefault();

    if (createmeeting.costTopic !== '0' && !user.bank) {
      return alert('You must have an account number to transfer money');
    }

    if (createmeeting.hourCreate >= createmeeting.endTime) {
      return alert('Invalid start and end time');
    }

    console.log(createmeeting);
    try {
      await axios.post('http://localhost:5000/api/bookingmeeting', {
        ...createmeeting,
      });

      alert('Create Successfully!');
      setcreatemeeting({
        ...createmeeting,
        nameSkills: '',
        levelSkill: '',
        nameTopic: '',
        dayCreate: '',
        hourCreate: '',
        endTime: '',
        message: 'Have a good study session !',
        costTopic: '',
        linkMeeting: '',
      });

      getLecturerData();
    } catch (err) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const tranSuccess = async (paymentID, meeting) => {
    try {
      await axios.post('http://localhost:5000/api/payment', {
        studentId: user?._id,
        meetingId: meeting._id,
      });

      await axios.post('http://localhost:5000/mail/mail-lecture', {
        ...meeting,
        nameStudent: `${user.firstname} ${user.lastname}`,
        studentEmail: user.email,
      });

      getStudentData();
      alert('Successfully!');
    } catch (err) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', height: '50px', marginTop: '3%' }}>
        You must login to see this content
      </div>
    );
  }

  return (
    <Fragment>
      <div className='grid wide' style={{ marginTop: 60 }}>
        <div className='row'>
          <div className='col l-9 m-12 c-12'>
            <div className={styles.container}>
              {changeState ? (
                user?.position === 'lecturers' ? (
                  <MeetingForm
                    NewTopicSubmit={NewTopicSubmit}
                    createmeeting={createmeeting}
                    onChangeInput={onChangeInput}
                    eventChange={eventChange}
                    user={user}
                  />
                ) : (
                  <>
                    <div>
                      <Button
                        onClick={eventChange}
                        style={{ marginBottom: '50px' }}
                        variant='contained'
                        color='info'
                      >
                        <IoIosArrowBack />
                        View Schedule
                      </Button>
                    </div>

                    {dataBooking.filter(
                      (tp) =>
                        tp.dayCreate >= new Date().toISOString().split('T')[0]
                    ).length ? (
                      <MeetingGrid
                        dataBooking={dataBooking}
                        tranSuccess={tranSuccess}
                        paidMeetingIds={paidMeetingIds}
                      />
                    ) : (
                      <div>Oops! There are currently no courses available</div>
                    )}
                  </>
                )
              ) : (
                <>
                  <Button
                    onClick={eventChange}
                    style={{ marginBottom: '50px' }}
                    variant='contained'
                    color='info'
                  >
                    <IoIosArrowBack />
                    {user?.position === 'lecturers'
                      ? 'Create meeing'
                      : 'Join a meeting'}
                  </Button>

                  <Schedule
                    data={
                      user?.position === 'lecturers'
                        ? dataBooking
                        : paymentHistory.map((payment) => payment.meeting)
                    }
                    position={user?.position}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookingMeeting;
