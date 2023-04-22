import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import PaypalButton from './Paypal';
import styles from './BookingMeeting.module.css';
import { FaSearch } from 'react-icons/fa';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SKILLS, SKILL_LEVELS } from '../../common/constant';

const MeetingGrid = (props) => {
  const [meetings, setMeetings] = useState(props.dataBooking);
  const [state, setState] = useState({
    search: '',
    sort: '',
    prices: [0, 10000],
    skill: Object.values(SKILLS).map(() => false),
    level: Object.values(SKILL_LEVELS).map(() => false),
  });

  useEffect(() => {
    getData();
  }, [state]);

  const getData = async () => {
    let result = await axios.get('http://localhost:5000/api/getbookmeeting', {
      params: {
        ...state,
      },
    });

    if (result.data) {
      result = result.data.filter(
        (meeting) => !props.paidMeetingIds.includes(meeting._id)
      );
      setMeetings(result);
    }
  };

  const handleChangePrice = (event, newValue) => {
    setState({ ...state, prices: newValue });
  };

  return (
    <>
      <div class='side-bar col-md-3'>
        <div class='search-hotel'>
          <h3 class='agileits-sear-head'>Search</h3>
          <form style={{display: 'flex'}}>
            <input
              type='search'
              onChange={(e) => setState({ ...state, search: e.target.value })}
              placeholder='Type a keyword...'
              id='productSearch'
            />
            <div id='cd-search' class='cd-search'>
              <div class='icon-search'>
                <FaSearch />
              </div>
            </div>
          </form>
        </div>
        <div class='form-group' style={{ marginTop: '10px' }}>
          <h3 class='agileits-sear-head'>Sort</h3>
          <select
            onChange={(e) => setState({ ...state, sort: e.target.value })}
            class='form-control select2'
            style={{ width: '100%' }}
          >
            <option disabled selected hidden>
              Select an option
            </option>
            <option value='{"costTopic":1}'>Price: Ascending</option>
            <option value='{"costTopic":-1}'>Price: Descending</option>
            <option value='{"nameTopic":1}'>Name: A - Z</option>
            <option value='{"nameTopic":-1}'>Name: Z - A</option>
            <option value='{"dayCreate":1}'>Newest</option>
            <option value='{"dayCreate":-1}'>Oldest</option>
          </select>
        </div>
        <div class='range'>
          <h3 class='agileits-sear-head'>Price</h3>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={state.prices}
            onChange={handleChangePrice}
            valueLabelDisplay='auto'
            style={{ marginLeft: '5px' }}
            max={10000}
          />
        </div>
        <div class='left-side'>
          <h3 class='agileits-sear-head'>Skill</h3>
          <ul>
            {Object.values(SKILLS).map((skill, index) => (
              <li>
                <input
                  type='checkbox'
                  class='categoryChecked'
                  name='skill'
                  value={skill}
                  checked={state.skill[index]}
                  onChange={() => {
                    const arr = state.skill;
                    arr[index] = !arr[index];
                    setState({ ...state, skill: arr });
                  }}
                />
                <span class='span'>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        <div class='left-side'>
          <h3 class='agileits-sear-head'>Level</h3>
          <ul>
            {Object.values(SKILL_LEVELS).map((level, index) => (
              <li>
                <input
                  type='checkbox'
                  class='categoryChecked'
                  name='skill'
                  value={level}
                  checked={state.level[index]}
                  onChange={() => {
                    const arr = state.level;
                    arr[index] = !arr[index];
                    setState({ ...state, level: arr });
                  }}
                />
                <span class='span'>{level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.schedule}>
        {meetings
          .filter(
            (tp) => tp.dayCreate >= new Date().toISOString().split('T')[0]
          )
          .map((items, index) => (
            <div className={styles.containImage} key={index}>
              <img
                src={
                  'https://images.unsplash.com/photo-1615412704911-55d589229864?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80'
                }
                alt=''
              />
              <div className={styles.BoxText}>
                <p>
                  <Link to={''} className={styles.text}>
                    {items?.nameTopic}
                  </Link>
                </p>
                <p>Teacher: {items?.nameLectures}</p>
                <p>
                  Category: {items?.nameSkills?.substring(0, 1).toUpperCase()}
                  {items?.nameSkills?.substring(1)}
                </p>
                <p>Level: {items?.levelSkill}</p>
                <p>Date: {items?.dayCreate}</p>
                <p>
                  Time: {items?.hourCreate} - {items?.endTime}
                </p>
                <p>Cost: {items?.costTopic}$</p>
              </div>

              {items.costTopic === 0 ? (
                <div className={styles.payment}>
                  <Button
                    onClick={() => props.tranSuccess('', items)}
                    variant='contained'
                    color='info'
                    style={{ marginTop: '30px' }}
                  >
                    Join for free
                  </Button>
                </div>
              ) : (
                <div className={styles.payment}>
                  <PaypalButton
                    total={parseInt(items?.costTopic)}
                    tranSuccess={props.tranSuccess}
                    meeting={items}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default MeetingGrid;
