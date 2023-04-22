import { React, useState, useEffect } from "react";
import styles from "./AssistantGrammar.module.css";
import Image1 from "../../images/close.jpg";
import Image2 from "../../images/dragHandle.jpg";
import Image3 from "../../images/goals.jpg";
import Image4 from "../../images/settings.jpg";
import Image5 from "../../images/images.jpg";
import { FaRegTrashAlt, FaEllipsisV } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";

const AssistantGrammar = (props) => {
  const [data, setdata] = useState([]);
  const [check, setcheck] = useState(!props.data);

  useEffect(() => {
    setdata([props]);
    props.array1.length === 0 ? setcheck(true) : setcheck(false);
  }, [props]);


  if (!data.length) {
    return <div>loading</div>;
  }
  return (
    <div className={styles.contain}>
      <div className={styles.header}>
        <div className={styles.grabImage}>
          <img src={Image2} alt="" />
        </div>
        <div className={styles.buttonImage}>
          <img className={styles.setting} src={Image1} alt="" />
          <img className={styles.goal} src={Image4} alt="" />
          <img className={styles.close} src={Image3} alt="" />
        </div>
      </div>

      <div className={styles.body}>
        {check ? (
          <div className={styles.background}>
            <img src={Image5} alt="" />
            <p>
              Grammarly ran hundreds of checks on your text and found no writing
              issues.
            </p>
          </div>
        ) : (
          <div className={styles.areaText}>
            {data[0].array1.map((item, index) => (
              <div className={styles.item} key={index} data-id={index}>
                <p>Replace the word</p>
                <div className={styles.textChange}>
                  <p className={styles.beforeChange}>{item}</p>
                  <p className={styles.affterChange}>
                    {data[0].array2.find((item,indexs) => index === indexs)}
                  </p>
                </div>

                <div className={styles.infor}>
                  <AiFillQuestionCircle className={styles.iconAi} />
                  <p>Learn more</p>

                  <div className={styles.icon}>
                    <FaRegTrashAlt />
                    <FaEllipsisV />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantGrammar;
