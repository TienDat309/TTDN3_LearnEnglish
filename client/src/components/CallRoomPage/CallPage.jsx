import { useEffect, useReducer, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './CallPage.module.scss';
import CallPageHeader from '../UIGGMeet/CallPageHeader/CallPageHeader';
import CallPageFooter from '../UIGGMeet/CallPageFooter/CallPageFooter';
import MeetingInfo from '../UIGGMeet/MeetingInfo/MeetingInfo';
import Messenger from '../UIGGMeet/Messenger/Messenger';
import Alert from '../UIGGMeet/Alert/Alert';
import MessageListReducer from '../../reducers/MessageListReducer';

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video playsInline autoPlay ref={ref} className={styles.video} />
  );
};

const Room = (props) => {
  const navigate = useNavigate();
  const [peers, setPeers] = useState([]);
  const [state, setState] = useState({
    cameraOn: true,
    audioOn: true,
    isPresenting: false,
    isPopup: true,
    isMessenger: false,
    roomSize: 0,
  });
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const location = useLocation();
  const { roomId } = location.state;
  // const { roomId } = useParams();
  let alertTimeout = null;
  const [messageList, messageListReducer] = useReducer(MessageListReducer, []);
  const [messageAlert, setMessageAlert] = useState({});

  useEffect(() => {
    setState({ ...state, roomSize: peers.length + 1 });
    console.log(peers)
  }, [peers]);

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5000');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit('join room', roomId);
        socketRef.current.on('all users', (users) => {
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, socketRef.current.id, stream);
            peersRef.current.push({ peerId: userId, peer });
            peers.push({ peerId: userId, peer });
          });
          setPeers(peers);
        });

        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerId, stream);
          peersRef.current.push({
            peerId: payload.callerId,
            peer,
          });

          const peerObj = {
            peer,
            peerId: payload.callerId,
          };

          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerId === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on('user left', (id) => {
          const peerObj = peersRef.current.find((p) => p.peerId === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }

          const peers = peersRef.current.filter((p) => p.peerId !== id);
          peersRef.current = peers;
          setPeers(peers);
        });
      });
  }, []);

  const createPeer = (userToSignal, callerId, stream) => {
    const peer = new window.SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerId,
        signal,
      });
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

    return peer;
  };

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new window.SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', {
        signal,
        callerId,
      });
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

    peer.signal(incomingSignal);

    return peer;
  };

  const toggleCamera = (value) => {
    userVideo.current.srcObject.getVideoTracks()[0].enabled = value;
    setState({ ...state, cameraOn: value });
  };

  const toggleAudio = (value) => {
    userVideo.current.srcObject.getAudioTracks()[0].enabled = value;
    setState({ ...state, audioOn: value });
  };

  const disconnectCall = () => {
    socketRef.current.disconnect();
    navigate('/meeting');
    window.location.reload();
  };

  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getVideoTracks()[0];
      const peers = peersRef.current.filter(
        (p) => p.peerId !== socketRef.current.id
      );

      peers.map((peer) => {
        peer.peer.replaceTrack(
          userVideo.current.srcObject.getVideoTracks()[0],
          screenTrack,
          userVideo.current.srcObject
        );
      });

      screenTrack.onended = () => {
        peers.map((peer) => {
          peer.peer.replaceTrack(
            screenTrack,
            userVideo.current.srcObject.getVideoTracks()[0],
            userVideo.current.srcObject
          );
        });
      };

      setState({ ...state, isPresenting: true });
    });
  };

  const stopSharingScreen = () => {
    setState({ ...state, isPresenting: false });
  };

  const setMeetInfoPopup = (value) => {
    setState({ ...state, isPopup: value });
  };

  const setIsMessenger = (value) => {
    setState({ ...state, isMessenger: value });
  };

  const sendMsg = (msg) => {
    peersRef.current.forEach((peer) => {
      peer.peer.send(msg);
    });

    messageListReducer({
      type: 'addMessage',
      payload: {
        user: 'You',
        msg: msg,
        time: Date.now(),
      },
    });
  };

  return (
    <div style={{ flex: 1, flexDirection: 'row' }}>
      <Helmet>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/simple-peer/9.11.1/simplepeer.min.js'></script>
      </Helmet>
      <div className={styles[`videoContainer-${state.roomSize}`]}>
        <video
          muted
          ref={userVideo}
          autoPlay
          playsInline
          className={styles.video}
        />
        {peers.map((peer) => {
          return <Video key={peer.peerId} peer={peer.peer} />;
        })}
      </div>
      <CallPageFooter
        isPresenting={state.isPresenting}
        stopScreenShare={stopSharingScreen}
        screenShare={shareScreen}
        isAudio={state.audioOn}
        toggleAudio={toggleAudio}
        isCame={state.cameraOn}
        toggleCame={toggleCamera}
        disconnectCall={disconnectCall}
      />
      {/* {state.isPopup && (
        <MeetingInfo
          setMeetInfoPopup={setMeetInfoPopup}
          url={`${window.location.origin}${window.location.pathname}`}
        />
      )} */}
      <CallPageHeader
        isMessenger={state.isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />

      {state.isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
          roomSize={state.roomSize}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};

export default Room;
