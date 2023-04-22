import * as React from 'react';
import Popup from 'reactjs-popup';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from '@syncfusion/ej2-react-schedule';
import './schedule.css';
// import './bootstrap.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import { IoMailSharp } from 'react-icons/io5';
import { useContext } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GlobalState } from '../../GlobalState';

const eventTemplate = (props) => {
  return (
    <div class='template-wrap' style={{ whiteSpace: 'pre-line' }}>
      <h3>{props.Subject}</h3>
      <br />
      {props.Skill} - {props.Level}
    </div>
  );
};

const Schedule = (props) => {
  const state = useContext(GlobalState);
  const [user] = state.userApi.user;

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [suggestedStudents, setSuggestedStudents] = useState([]);
  const [invitedStudent, setInvitedStudent] = useState([]);
  const [studentInput, setStudentInput] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const array = [];
    props.data?.forEach((meeting, index) => {
      if(meeting){
        array.push({
          Id: meeting?._id,
          Subject: meeting?.nameTopic,
          Level: meeting?.levelSkill,
          Skill: meeting?.nameSkills,
          StartTime: new Date(`${meeting.dayCreate} ${meeting.hourCreate}`),
          EndTime: new Date(`${meeting.dayCreate} ${meeting.endTime}`),
          Link: meeting?.linkMeeting,
          Students: meeting.payments?.map((payment) => payment.student),
          Lecturer: `${meeting.nameLectures}`,
          StudentCount: meeting?.paymentsCount,
          hourCreate: meeting?.hourCreate,
          dayCreate: meeting?.dayCreate,
        }); 
      }
    });
    setData(array);
  };

  const getSuggestionStudents = async (meetingId) => {
    const result = await axios.get(
      `http://localhost:5000/api/suggestion-students?lecturerId=${user?._id}&meetingId=${meetingId}`
    );

    if (!result.err) {
      result.data = [{ email: 'Select all' }].concat(result.data);
      setSuggestedStudents(result.data);
    }
  };

  const invite = async () => {
    try {
      invitedStudent.push({ email: studentInput });
      invitedStudent.forEach((student) => {
        axios.post('http://localhost:5000/mail/mail-student', {
          email: student.email,
          nameLectures: selectedMeeting.Lecturer,
          nameSkills: selectedMeeting.Skill,
          levelSkill: selectedMeeting.Level,
          nameTopic: selectedMeeting.Subject,
          dayCreate: selectedMeeting.dayCreate,
          hourCreate: selectedMeeting.hourCreate,
        });
      });

      alert('Invite successfully!');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <Popup open={open} onClose={closeModal} closeOnDocumentClick={false}>
        <div class='student-list'>
          <a className='close' onClick={closeModal}>
            &times;
          </a>
          <h3 style={{ color: 'white' }}>Student List</h3>
          <List dense sx={{ width: '100%', bgcolor: '#f4f4f4' }}>
            {students.map((student) => (
              <ListItem>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${student.firstname} ${student.lastname}`}
                      src={student.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${student.firstname} ${student.lastname}`}
                    secondary={student.email}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <div class='invite-form'>
            <Autocomplete
              className='invite-input'
              freeSolo
              inputProps
              multiple
              disableCloseOnSelect
              options={suggestedStudents}
              value={invitedStudent}
              getOptionLabel={(option) => `${option.email}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Mail'
                  color='info'
                  placeholder='Below are students who recently took your meeting'
                />
              )}
              onChange={(event, newValue) => {
                if (newValue.find((value) => value.email === 'Select all')) {
                  const all = [...suggestedStudents];
                  all.splice(0, 1);
                  setInvitedStudent(all);
                } else {
                  setInvitedStudent(newValue);
                }
              }}
              onInputChange={(event, newInputValue) => {
                setStudentInput(newInputValue);
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.email === 'Select all' ? (
                    <>Select All</>
                  ) : (
                    <div class='option-label'>
                      {`${option.firstname} ${option.lastname}`}
                      <br />
                      <i class='option-email'>{option.email}</i>
                    </div>
                  )}
                </li>
              )}
            />
            <Button variant='contained' color='info' onClick={invite}>
              Invite <IoMailSharp style={{ marginLeft: '5px' }} size={16} />
            </Button>
          </div>
        </div>
      </Popup>
      <ScheduleComponent
        width='100%'
        height='550px'
        readonly='true'
        eventSettings={{
          dataSource: data,
          template: eventTemplate,
        }}
        popupOpen={(args) => {
          if (args.type !== 'Editor') {
            const header = args.element.querySelector('.e-subject-wrap');
            let div = document.createElement('div');
            div.className = 'e-subject e-text-ellipsis';
            div.textContent = `${args.data.Skill} - ${args.data.Level}`;
            div.style.fontSize = '13px';
            header.appendChild(div);

            const content = args.element.querySelector('.e-popup-content');

            if (props.position === 'lecturers') {
              div = content.querySelector('.e-date-time').cloneNode(true);
              div.querySelector('.e-date-time-icon').className =
                'e-resource-icon e-icons';

              const a = document.createElement('a');
              // a.href = 'http://localhost:3000/meeting-room';
              a.onclick = () => {
                setOpen((o) => !o);
                setStudents(args.data.Students);
                getSuggestionStudents(args.data.Id);
                setSelectedMeeting({ ...args.data });
              };
              a.text = args.data.StudentCount;
              a.className = 'a-hover';

              div.querySelector(
                '.e-date-time-wrapper .e-date-time-details'
              ).textContent = '';

              div
                .querySelector('.e-date-time-wrapper .e-date-time-details')
                .appendChild(a);
              content.appendChild(div);
            }

            div = content.querySelector('.e-date-time').cloneNode(true);
            div.querySelector('.e-date-time-icon').className =
              'e-description-icon e-icons';
            const a = document.createElement('a');
            // a.href = 'http://localhost:3000/meeting-room';
            a.onclick = () => {
              navigate(`/meeting-room`, {
                state: { roomId: args.data.linkMeeting },
              });
            };
            a.text = 'Join';
            a.className = 'a-hover';

            div.querySelector(
              '.e-date-time-wrapper .e-date-time-details'
            ).textContent = '';
            div
              .querySelector('.e-date-time-wrapper .e-date-time-details')
              .appendChild(a);
            content.appendChild(div);
          }
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </>
  );
};
export default Schedule;
