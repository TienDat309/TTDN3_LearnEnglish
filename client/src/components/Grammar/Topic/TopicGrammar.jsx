import { Fragment, React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LevelRightItem from "../../RightItem/LevelRightItem/LevelRightItem";
import RightItem from "../../RightItem/RightItem";
import styles from "../../Voccabulary/VocabularySkills/VocabularySkills.module.css";
import LessonCard from "../../LessonCard/LessonCard";
import style from "../../Skills/DetailSkills/DetailSkills.module.css";

const TopicGrammar = (props) => {
  const [data, setdata] = useState(props.data);
  const [dataTopic, setdataTopic] = useState([]);
  const [datalevel, setdatalevel] = useState([]);

  console.log(data)

  // useEffect(() => {
  //   let array = [];
  //   setdata(props.data);
  //   if (props.data.length) {
  //     setdatalevel(props.data[0].level.contentLevel.split("\n\n"));
  //     for (let i = 0; i < props.data.length; i++) {
  //       array.push(props.data[i].level.topic);
  //     }
  //   }
  //   setdataTopic(array);
  // }, [props.data]);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <Fragment>
      <div className="grid wide">
        <div className="row">
          <div className="col l-9 m-12 c-12">
            <div className={styles.heading}>
              <p className={styles.depthLink}>
                <Link to="/grammar">Grammar</Link>

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
            <img
              src={data.image}
              alt={data.name}
              style={{ width: "100%" }}
            />
            <div className={styles.contactBox}>
              <p dangerouslySetInnerHTML={{__html: data.content}}></p>
            </div>

            <div className={style.colorMain} style={{ marginLeft: 1 }}>
              <div className={style.blockColor1}></div>
              <div className={style.blockColor2}>
                <p>
                  Are you looking for a face-to-face English course near you?
                </p>
                <button>
                  <Link
                    className={style.textMeeting}
                    to={"/meeting"}
                    target={"_blank"}
                  >
                    Meeting
                  </Link>
                </button>
              </div>
              <div className={style.blockColor3}></div>
            </div>

            <h2
              style={{ color: "#23085A", margin: "30px 0 0 0", fontSize: 36 }}
            >
              Choose a grammar lesson
            </h2>

            <div className={styles.containerLesson}>
              {data.topics.map((item, index) => (
                <LessonCard key={index} {...item} />
              ))}
            </div>
          </div>
          <div className="col l-3 m-12 c-12" style={{ marginTop: 193 }}>
            <LevelRightItem
              level1={"Beginner to pre-intermediate"}
              level2={"Intermediate to upper intermediate"}
              level3={"English grammar reference"}
              sluglevel1={"beginner-to-pre-intermediate"}
              sluglevel2={"intermediate-to-upper-intermediate"}
              sluglevel3={"english-grammar-reference"}
            />
            <RightItem />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopicGrammar;
