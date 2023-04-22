import { Container } from "@material-ui/core";
import { Fragment, React, useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Footer from "../Footer/Footer";
import Header from "../Headers/Header";
import styles from "./Dictionnary.module.css";
import HeaderDic from "./DictionnaryHeader/HeaderDic";

const Dictionnary = () => {
  const [LightTheme] = useState(true);

  const state = useContext(GlobalState);
  const [word, setWord] = state.dictionnaryApi.word;
  const [meanings, setMeanings] = state.dictionnaryApi.meanings;
  const [category, setCategory] = state.dictionnaryApi.category;

  return (
    <Fragment>
      <Header />
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <HeaderDic
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          word={word}
          setMeanings={setMeanings}
          LightTheme={LightTheme}
        />
        <div className={styles.meanings}>
          {/* audio---------------------------- */}
          {meanings[0] && word && category === "en" && (
            <div>
              <audio
                style={{ backgroundColor: "#fff", borderRadius: 10 }}
                src={
                  meanings[0].phonetics[0] &&
                  meanings[0].phonetics[0].audio === ""
                    ? meanings[0].phonetics[1] && meanings[0].phonetics[1].audio
                    : meanings[0].phonetics[0] && meanings[0].phonetics[0].audio
                }
                controls
              >
                Your browser does not support the audio element.
              </audio>
              <p style={{ marginLeft: 15 }}>
                {meanings[0].phonetics[0] && meanings[0].phonetics[0].text}
              </p>
            </div>
          )}
          {/* audio---------------------------- */}

          {word === "" ? (
            <span className={styles.subTitle}>
              Start by typing a word in search
            </span>
          ) : (
            meanings.map((mean) =>
              mean.meanings.map((item) =>
                item.definitions.map((def) => (
                  <div
                    className={styles.singleMean}
                    style={{
                      backgroundColor: LightTheme ? "#3b5360" : "white",
                      color: LightTheme ? "white" : "black",
                    }}
                  >
                    <b>{def.definition}</b>
                    <hr style={{ backgroundColor: "black", width: "100%" }} />
                    {def.example && (
                      <span>
                        <b>Example :</b> {def.example}
                      </span>
                    )}
                    {def.synonyms && (
                      <span>
                        <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
                      </span>
                    )}
                  </div>
                ))
              )
            )
          )}
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Dictionnary;
