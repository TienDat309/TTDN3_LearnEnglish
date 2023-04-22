import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LessonCard from "../../LessonCard/LessonCard";
import RightItem from "../../RightItem/RightItem";
import SkillItem from "../../RightItem/SkillItem/SkillItem";
import styles from "../DetailSkills/DetailSkills.module.css";

const DetailTopic = (props) => {
  const [data, setdata] = useState(props.data);
  console.log(data)
  const [datalevel, setdatalevel] = useState([]);

  useEffect(() => {
    setdata(props.data);
    if (props.data.length) {
      setdatalevel(props.data[0].level.contentLevel.split("\n\n"));
    }
  }, [props.data]);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-9 c-12 m-12">
          <div className={styles.heading}>
            <p className={styles.depthLink}>
              <Link to="/skill">Skills</Link>
              <span> {">"} </span>
              <span>{data.typeSlug}</span>
              <span> {">"} </span>
              <span>{data.levelSlug}</span>
              <span> {">"} </span>
              <span>{data.name}</span>
            </p>
            <div className={styles.line}></div>
            <h1
              style={{ color: "#23085A", margin: "30px 0 0 0", fontSize: 36 }}
            >
              {data.name}
            </h1>
          </div>

          <img src={data.image} alt="s" style={{ width: "100%" }} />

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
            <p dangerouslySetInnerHTML={{__html: data.content}}></p>
            <h2>Choose a {data?.name} lesson</h2>
          </div>

          <div className={styles.containerLesson}>
            {data?.topics.map((item, index) => (
              <LessonCard key={index} {...item} />
            ))}
          </div>

          {/* <div className={styles.contain}>
            {data.map((item) => (
              // <LessonCard {...item}/>
              <div className={styles.viewRow} key={item._id}>
                <div className={styles.imageFile}>
                  <img src={item?.level?.topic?.imageTopic} alt="" />
                </div>
                <div className={styles.textView}>
                  <Link to={item?.level?.topic?.slugTopic}>
                    <h2>{item?.level?.topic?.nameTopic}</h2>
                  </Link>
                  <p>
                    {item?.level?.topic?.contentTopic.substring(
                      0,
                      item?.level?.topic?.contentTopic.indexOf(".") + 1
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <div className="col l-3 m-12 c-12" style={{ marginTop: 193 }}>
          <SkillItem />
          <RightItem />
        </div>
      </div>
    </div>
  );
};

export default DetailTopic;
