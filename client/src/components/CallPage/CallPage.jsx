import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { Helmet } from 'react-helmet';
import MessageListReducer from '../../reducers/MessageListReducer';
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from '../../utils/apiEndpoints';
import Alert from '../UIGGMeet/Alert/Alert';
import CallPageFooter from '../UIGGMeet/CallPageFooter/CallPageFooter';
import CallPageHeader from '../UIGGMeet/CallPageHeader/CallPageHeader';
import MeetingInfo from '../UIGGMeet/MeetingInfo/MeetingInfo';
import Messenger from '../UIGGMeet/Messenger/Messenger';
import styles from './CallPage.module.scss';

let peer = null;
// const socket = io.connect(process.env.REACT_APP_BASE_URL);
const socket = io.connect('http://localhost:5000');
const initialState = [];

const CallPage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const isAdmin = window.location.hash === '#init' ? true : false;
  const url = `${window.location.origin}${window.location.pathname}`;
  let alertTimeout = null;

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  const [isCame, setIsCame] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
    }
    initWebRTC();
    socket.on('code', (data) => {
      if (data.url === url) {
        peer.signal(data.code);
      }
    });
  }, []);

  const getRecieverCode = () => {
    axios({
      method: 'get',
      url: `${BASE_URL}${GET_CALL_ID}${id}`,
    }).then(function (response) {
      if (response.data[0].payload.signalData) {
        peer.signal(response.data[0].payload.signalData);
      }
    });
  };

  const initWebRTC = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStreamObj(stream);

        peer = new window.SimplePeer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });

        if (!isAdmin) {
          getRecieverCode();
        }

        peer.on('signal', (data) => {
          if (isAdmin) {
            let payload = {
              id,
              signalData: data,
            };
            axios({
              method: 'post',
              url: `${BASE_URL}${SAVE_CALL_ID}`,
              data: {
                payload,
              },
            });
          } else {
            socket.emit('code', { code: data, url }, (cbData) => {
              console.log('code sent');
            });
          }
        });
        peer.on('connect', () => {
          // console.log("connected to peer")
        });

        peer.on('stream', (stream) => {
          var video = document.querySelector('video');

          if ('srcObject' in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }

          video.play();
        });

        peer.on('data', (data) => {
          clearTimeout(alertTimeout);
          messageListReducer({
            type: 'addMessage',
            payload: {
              user: 'Other',
              msg: data.toString(),
              time: Date.now(),
            },
          });

          setMessageAlert({
            alert: true,
            isPopup: true,
            payload: {
              user: 'Other',
              msg: data.toString(),
            },
          });

          alertTimeout = setTimeout(() => {
            setMessageAlert({
              ...messageAlert,
              isPopup: false,
              payload: {},
            });
          }, 10000);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendMsg = (msg) => {
    peer.send(msg);
    messageListReducer({
      type: 'addMessage',
      payload: {
        user: 'You',
        msg: msg,
        time: Date.now(),
      },
    });
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
          );
        };
        setIsPresenting(true);
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const toggleCame = (value) => {
    streamObj.getVideoTracks()[0].enabled = value;
    setIsCame(value);
  };

  const disconnectCall = () => {
    peer.destroy();
    navigate('/meeting');
    window.location.reload();
  };

  return (
    <div className={styles.callpageContainer}>
      <Helmet>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/simple-peer/9.11.1/simplepeer.min.js'></script>
      </Helmet>
      <video className={styles.videoContainer} src='' controls></video>
      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      <CallPageFooter
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        isCame={isCame}
        toggleCame={toggleCame}
        disconnectCall={disconnectCall}
      />
      {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}
      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};

export default CallPage;
