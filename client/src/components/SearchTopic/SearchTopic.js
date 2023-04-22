import { React, useContext, useEffect, useState } from "react";
import styles from "./SearchTopic.module.css";
import Header from "../../components/Headers/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GlobalState } from "../../GlobalState";

const SearchTopic = () => {
  const state = useContext(GlobalState);
  const [data, setdata] = useState([]);
  const [searchData, setsearchData] = useState([]);
  const [dataLoad, setdataLoad] = useState([]);

  const [grammar] = state.grammarApi.dataGrammar;
  const [vocabulary] = state.vocabularyApi.vocData;
  const [dataListening] = state.listeningApi.dataListening;
  const [dataReading] = state.readingApi.dataReading;
  const [dataSpeaking] = state.speakingApi.dataSpeaking;
  const [dataWriting] = state.writingApi.dataWriting;

  useEffect(() => {
    let array = [];
    array.push(...dataListening);
    array.push(...dataReading);
    array.push(...dataSpeaking);
    array.push(...dataWriting);
    array.push(...grammar);
    array.push(...vocabulary);

    setdata(array);
  }, [
    dataListening,
    dataReading,
    dataSpeaking,
    dataWriting,
    grammar,
    vocabulary,
  ]);

  const onChangesInput = (e) => {
    const { name, value } = e.target;
    setsearchData(value);
  };
  const eventSearch = () => {
    let temp = searchData.toLowerCase();
    var newArray = data.filter((el) =>
      el.level.topic.nameTopic.toLowerCase().includes(temp)
    );
    setdataLoad(newArray);
  };

  return (
    <div>
      <Header />
      <div className="grid wide">
        <div className="row">
          <div className="col l-9 m-12 c-12">
            <div className={styles.container}>
              <div className={styles.heading}>
                <p className={styles.depthLink}>
                  <Link to="/search">Search</Link>
                  <span> {">"} </span>
                </p>
                <div className={styles.line}></div>

                <h1
                  style={{
                    color: "#23085A",
                    margin: "30px 0 0 0",
                    fontSize: 36,
                  }}
                >
                  Search
                </h1>
              </div>

              <div className={styles.search} style={{ paddingBottom: 30 }}>
                <input
                  onChange={onChangesInput}
                  className={styles.srch}
                  type="search"
                  name="search"
                  placeholder="Type to text..."
                />
                <Link to={""}>
                  <button className={styles.btn} onClick={eventSearch}>
                    <FaSearch />
                  </button>
                </Link>
              </div>
            </div>

            {!dataLoad.length ? (
              ""
            ) : (
              <h2
                style={{
                  color: "#23085A",
                  margin: "30px 0 0 0",
                  paddingBottom: 20,
                }}
              >
                Search by {searchData.toLowerCase()}
              </h2>
            )}

            <div className={styles.formSearchResuilt}>
              {!dataLoad.length
                ? ""
                : dataLoad.map((item, index) => (
                    <div key={index}>
                      <h2>
                        {index + 1}.
                        <span>{item?.level?.topic?.nameTopic}</span>
                      </h2>
                      <p>{item?.level?.topic?.contentTopic}</p>
                      <p style={{ color: "#23085a" }}>{item?.type}</p>
                      <p>51 commentaires</p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchTopic;
