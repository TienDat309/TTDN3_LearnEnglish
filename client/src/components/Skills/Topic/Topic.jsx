import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RightItem from "../../RightItem/RightItem";
import Accordion from "./AccordionListening/Accordion";
import AccordionReading from "./AccordionReading/AccordionReading";
import AccordionSpeaking from "./AccordionSpeaking/AccordionSpeaking";
import AccordionWriting from "./AccordionWriting/AccordionWriting";
import ReactPlayer from "react-player";
import styles from "./Topic.module.css";
import style from "../DetailSkills/DetailSkills.module.css";

const Topic = (props) => {
  const {data} = props;
  const [isListening, setisListening] = useState(false);
  const [isReading, setisReading] = useState(false);
  const [isSpeaking, setisSpeaking] = useState(false);
  const [isWriting, setisWriting] = useState(false);
  // const [dataIntroText, setdataIntroText] = useState([]);
  const [dataVideo, setdataVideo] = useState([]);

  useEffect(() => {
    if (data) {
      setdataVideo(data.video);
      // setdataIntroText(data.content.split("\n\n"));
      if (data.typeSlug === "listening") setisListening(true);
      else if (data.typeSlug === "reading") setisReading(true);
      else if (data.typeSlug === "speaking") setisSpeaking(true);
      else if (data.typeSlug === "writing") setisWriting(true);
    }
  }, [data]);

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-9 m-12 c-12">
          <div className={style.heading}>
            <p className={style.depthLink}>
              <Link to="/skill">Skills</Link>
              <span> {">"} </span>
              <span>{data?.typeSlug}</span>
              <span> {">"} </span>
              <span>{data?.levelSlug}</span>
              <span> {">"} </span>
              <span>{data?.name}</span>
            </p>
            <div className={style.line}></div>
            <h1
              style={{ color: "#23085A", margin: "30px 0 0 0", fontSize: 36 }}
            >
              {data?.name}
            </h1>
          </div>

          {isSpeaking ? (
            <div>
              <ReactPlayer url={dataVideo} width="910px" height="500px" />
            </div>
          ) : (
            <img
              src={data?.image}
              alt="s"
              style={{ width: "100%" }}
            />
          )}
          <div className={styles.colorMain}>
            <div className={styles.blockColor1}></div>
            <div className={styles.blockColor2}>
              <p>Are you looking for a face-to-face English course near you?</p>
              <button>
                <Link
                  className={styles.textMeeting}
                  to={"/meeting"}
                  target={"_blank"}
                >
                  Meeting
                </Link>
              </button>
            </div>
            <div className={styles.blockColor3}></div>
          </div>

          <div className={styles.textIntro}>
            <p dangerouslySetInnerHTML={{__html: data?.content}}></p>
          </div>
          {isListening ? (
            <div className={styles.sessionMutipleChoise}>
              <div className={styles.audioLoad}>
                <audio src={data?.radio} controls />
              </div>
              <div>
                <Accordion data={data} />
              </div>
            </div>
          ) : (
            ""
          )}
          {isReading ? (
            <div className={styles.sessionMutipleChoise}>
              <div>
                <AccordionReading data={data} />
              </div>
            </div>
          ) : (
            ""
          )}
          {isSpeaking ? (
            <div className={styles.sessionMutipleChoise}>
              <div>
                <AccordionSpeaking data={data} />
              </div>
            </div>
          ) : (
            ""
          )}
          {isWriting ? (
            <div className={styles.sessionMutipleChoise}>
              <div>
                <AccordionWriting data={data} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col l-3 m-12 c-12" style={{ marginTop: 180 }}>
          <RightItem />
        </div>
      </div>
    </div>
  );
};

export default Topic;
