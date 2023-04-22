import axios from "axios";
import { React, useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import styles from "./Translate.module.css";

const Translate = (props) => {
  const [data] = useState(props.data);
  const state = useContext(GlobalState);
  const [stateTranslate, setstateTranslate] = state.listeningApi.stateTranslate;
  const [dataTranslate, setdataTranslate] = state.listeningApi.dataTranslate;

  const translatedata = async (str) => {
    let temp = "";
    const params = new URLSearchParams();
    params.append("q", str);
    params.append("source", "en");
    params.append("target", "vi");
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    await axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        temp = res.data.translatedText;
      });
    return temp;
  };

  const eventTranslate = async () => {
    if (dataTranslate.length === 0) {
      let arayDataEnglish;
      let datas = data.split("\n\n");
      let arrayCutData = [];
      let temp = "";
      let tempstr = "";
      arayDataEnglish = datas.join(" ").split(" ");

      for (let i = 0; i < arayDataEnglish.length; i++) {
        if (temp.split(" ").length > 80) {
          arrayCutData.push(temp);
          temp = "";
        } else if (i === arayDataEnglish.length - 1) {
          temp += arayDataEnglish[i];
          arrayCutData.push(temp);
          break;
        }
        temp += arayDataEnglish[i] + " ";
      }
      for (let i = 0; i < arrayCutData.length; i++) {
        tempstr += await translatedata(arrayCutData[i]);
      }
      setdataTranslate(tempstr);
      setstateTranslate(true);
    } else {
      setstateTranslate(true);
    }
  };

  const eventTranslateEng = () => {
    setstateTranslate(false);
  };

  return (
    <div className={styles.blockButton}>
      <button onClick={(e) => eventTranslate()}>VietNamese</button>
      <button onClick={(e) => eventTranslateEng()}>English</button>
    </div>
  );
};

export default Translate;
