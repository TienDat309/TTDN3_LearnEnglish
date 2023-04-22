import React, { createContext, useState, useEffect } from "react";

import DictionnaryAPI from "./apiUsers/dictionnaryApi";
import UserAPI from "./apiUsers/userApi";

import ListeningApi from "./apiUsers/listeningApi";
import ReadingApi from "./apiUsers/readingApi";
import SpeakingApi from "./apiUsers/speakingApi";
import WritingApi from "./apiUsers/writingApi";

import GrammarApi from "./apiUsers/grammarApi";
import VocabularyApi from "./apiUsers/vocabularyApi";
import AdminApi from "./admin/apiAdmin/LoginAdminApi";
import UserTotalApi from "./admin/apiAdmin/userApi";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [tokenn, setTokenn] = useState(false);

  useEffect(() => {
    // token login user
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
        const refreshToken = async () =>{
            const res = await axios.post('/user/refresh_token')
            setToken(res.data.access_token)
            setTimeout(() => {
                refreshToken()
            }, 10 * 60 * 1000)
        }
        refreshToken()
    }
    // token login admin
    const adminlogin = localStorage.getItem("AdminLogin");
    if (adminlogin) {
      const refreshToken = async () => {
        const res = await axios.get("/admin/refresh_token");
        setTokenn(res.data.accesstoken);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    userApi: UserAPI(token),
    tokenn: [tokenn, setTokenn],
    adminApi: AdminApi(tokenn),
    dictionnaryApi: DictionnaryAPI(),
    listeningApi: ListeningApi(),
    readingApi: ReadingApi(),
    speakingApi: SpeakingApi(),
    writingApi: WritingApi(),
    grammarApi: GrammarApi(),
    vocabularyApi: VocabularyApi(),
    userTotalApi: UserTotalApi(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
