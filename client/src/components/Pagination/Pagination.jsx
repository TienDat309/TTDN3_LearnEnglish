import { React, useEffect, useContext, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { GlobalState } from "../../GlobalState";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const state = useContext(GlobalState);
  const [currentPageListening, setcurrentPageListening] =
    state.listeningApi.currentPageListening;
  const [pageNumber, setpageNumber] = useState([]);
  const [total, settotal] = useState(0);

  useEffect(() => {
    //Get post current
    settotal(Math.ceil(props.data.length / 1));
    let page = [];
    for (let i = 1; i <= total; i++) {
      page.push(i);
    }
    setpageNumber(page);
  }, [props.data.length, total]);

  const eventPrev = () => {
    setcurrentPageListening(currentPageListening - 1);
  };
  const eventRight = () => {
    setcurrentPageListening(currentPageListening + 1);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.itemWrapper}>
        <ul className={styles.items}>
          {pageNumber.map((item, index) => (
            <li className={styles.item} key={index}>
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.buttonMove}>
          <button
            className={styles.buttonPrev}
            onClick={eventPrev}
            disabled={currentPageListening <= 1}
          >
            <FaAngleLeft />
          </button>
          <button
            className={styles.buttonNext}
            onClick={eventRight}
            disabled={currentPageListening >= total}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
