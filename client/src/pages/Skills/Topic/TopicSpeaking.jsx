import { Fragment, React, useContext, useState, useEffect } from "react";
import Topics from "../../../components/Skills/Topic/Topic";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Headers/Header";
import { GlobalState } from "../../../GlobalState";
import { useLocation, useParams } from "react-router-dom";
import { formatData } from "./utilsTopic";
import axios from "axios";

const TopicSpeaking = () => {
  const { levelSlug, topicSlug } = useParams();
  const state = useContext(GlobalState);
  const [data, setdata] = useState([]);
  const location = useLocation();
  const [dataSpeaking] = state.speakingApi.dataSpeaking;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/types/speaking/levels/${levelSlug}/topics/${topicSlug}`
    );

    if (res.data) {
      setdata(res.data);
    }
  };

  return (
    <Fragment>
      <Header />
      {data && <Topics data={data} />}
      <Footer />
    </Fragment>
  );
};

export default TopicSpeaking;
