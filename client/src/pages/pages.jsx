import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeAdmin from '../admin/components/HomeAdmin/HomeAdmin';
import LoginAdmin from '../admin/components/LoginAdmin/LoginAdmin';
import UpdateTopic from '../admin/components/UpdateTopic/UpdateTopic';
import { GlobalState } from '../GlobalState';
import CallPage from '../pages/CallPage/CallPageGGMeet';
import Dictionnary from '../pages/Dictionnary/Dictionnary';
import Home from '../pages/Home/Home';
import HomeGGMeet from '../pages/HomeGGMeet/GGMeet';
import DetailSkillListening from '../pages/Skills/DetailSkill/DetailSkillListening';
import DetailSkillReading from '../pages/Skills/DetailSkill/DetailSkillReading';
import DetailSkillSpeaking from '../pages/Skills/DetailSkill/DetailSkillSpeaking';
import DetailSkillWriting from '../pages/Skills/DetailSkill/DetailSkillWriting';
import DetailLevelListen from '../pages/Skills/DetailTopic/DetailLevelListen';
import DetailLevelReading from '../pages/Skills/DetailTopic/DetailLevelReading';
import DetailLevelSpeaking from '../pages/Skills/DetailTopic/DetailLevelSpeaking';
import DetailLevelWriting from '../pages/Skills/DetailTopic/DetailLevelWriting';
import NotFound from '../utils/not_found/NotFound';
import DetailTopic from './Grammar/DetailTopic/DetailTopic';
import Grammars from './Grammar/Grammars';
import TopicGrammar from './Grammar/Topic/Topic';
import Login from './Login/Login';
import BookMeetingPage from './BookMeetingPage/BookMeetingPage';
import Register from './Register/Register';
import Skill from './Skills/skill';
import TopicListening from './Skills/Topic/TopicListening';
import TopicReading from './Skills/Topic/TopicReading';
import TopicSpeaking from './Skills/Topic/TopicSpeaking';
import TopicWriting from './Skills/Topic/TopicWriting';
import Voccabulary from './Voccabulary/voc';
import VocBTPI from './Voccabulary/VocBTPI';
import VoccabularyLesson from './Voccabulary/VoccabularyLesson/VoccabularyLesson';
import SearchTopic from '../components/SearchTopic/SearchTopic';
import Verification from '../components/Verification/ActivationEmail';
import TypeTable from '../admin/components/TypeData';
import TypeForm from '../admin/components/TypeData/form';
import LevelTable from '../admin/components/LevelData';
import LevelForm from '../admin/components/LevelData/form';
import TopicTable from '../admin/components/TopicData';
import TopicForm from '../admin/components/TopicData/form';
import ProfilePage from './ProfilePage/ProfilePage';
import SchedulePage from './SchedulePage/SchedulePage';

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogin] = state.userApi.isLogged;
  const [isLoginAdmin] = state.adminApi.isLoginAdmin;
  // console.log(isLoginAdmin)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dictionnary' element={<Dictionnary />} />
      <Route path='/grammar' element={<Grammars />} />
      <Route path='/vocabulary' element={<Voccabulary />} />
      <Route path='/skill' element={<Skill />} />
      <Route path='/search' element={<SearchTopic />} />
      <Route path='/booking' element={<BookMeetingPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route
        path='/user/activate/:activation_token'
        element={<Verification />}
      />

      {/* detail level skill */}
      <Route path='/skill/listening' element={<DetailSkillListening />} />
      <Route path='/skill/reading' element={<DetailSkillReading />} />
      <Route path='/skill/speaking' element={<DetailSkillSpeaking />} />
      <Route path='/skill/writing' element={<DetailSkillWriting />} />
      {/* detail level skill */}

      {/* detail topic by level */}
      <Route
        path='/skill/listening/:levelSlug'
        element={<DetailLevelListen />}
      />
      <Route
        path='/skill/listening/:levelSlug/:topicSlug'
        element={<TopicListening />}
      />
      <Route
        path='/skill/reading/:levelSlug'
        element={<DetailLevelReading />}
      />
      <Route
        path='/skill/reading/:levelSlug/:topicSlug'
        element={<TopicReading />}
      />
      <Route
        path='/skill/speaking/:levelSlug'
        element={<DetailLevelSpeaking />}
      />
      <Route
        path='/skill/speaking/:levelSlug/:topicSlug'
        element={<TopicSpeaking />}
      />
      <Route
        path='/skill/writing/:levelSlug'
        element={<DetailLevelWriting />}
      />
      <Route
        path='/skill/writing/:levelSlug/:topicSlug'
        element={<TopicWriting />}
      />
      {/* detail topic by level */}

      {/* detail listening topic */}
      {/* <Route
        path='/skill/listening/beginnera1/:id'
        element={<TopicListening />}
      />
      <Route
        path='/skill/listening/pre-intermediate-a2/:id'
        element={<TopicListening />}
      />
      <Route
        path='/skill/listening/Intermediate-B1/:id'
        element={<TopicListening />}
      />
      <Route
        path='/skill/listening/Upper-intermediate-B2/:id'
        element={<TopicListening />}
      />
      <Route
        path='/skill/listening/Advanced-C1/:id'
        element={<TopicListening />}
      /> */}
      {/* detail listening topic */}

      {/* detail reading topic */}
      {/* <Route path='/skill/reading/beginnera1/:id' element={<TopicReading />} />
      <Route
        path='/skill/reading/pre-intermediate-a2/:id'
        element={<TopicReading />}
      />
      <Route
        path='/skill/reading/Intermediate-B1/:id'
        element={<TopicReading />}
      />
      <Route
        path='/skill/reading/Upper-intermediate-B2/:id'
        element={<TopicReading />}
      />
      <Route path='/skill/reading/Advanced-C1/:id' element={<TopicReading />} /> */}
      {/* detail reading topic */}

      {/* detail speaking topic */}
      {/* <Route
        path='/skill/speaking/beginnera1/:id'
        element={<TopicSpeaking />}
      />
      <Route
        path='/skill/speaking/pre-intermediate-a2/:id'
        element={<TopicSpeaking />}
      />
      <Route
        path='/skill/speaking/Intermediate-B1/:id'
        element={<TopicSpeaking />}
      />
      <Route
        path='/skill/speaking/Upper-intermediate-B2/:id'
        element={<TopicSpeaking />}
      />
      <Route
        path='/skill/speaking/Advanced-C1/:id'
        element={<TopicSpeaking />}
      /> */}
      {/* detail speaking topic */}

      {/* detail writing topic */}
      {/* <Route path='/skill/writing/beginnera1/:id' element={<TopicWriting />} />
      <Route
        path='/skill/writing/pre-intermediate-a2/:id'
        element={<TopicWriting />}
      />
      <Route
        path='/skill/writing/Intermediate-B1/:id'
        element={<TopicWriting />}
      />
      <Route
        path='/skill/writing/Upper-intermediate-B2/:id'
        element={<TopicWriting />}
      />
      <Route path='/skill/writing/Advanced-C1/:id' element={<TopicWriting />} /> */}
      {/* detail writing topic */}

      {/* detail level grammar */}
      <Route path='/grammar/:levelSlug' element={<TopicGrammar />} />
      <Route path='/grammar/:levelSlug/:topicSlug' element={<DetailTopic />} />
      {/* detail level grammar */}

      {/* detail level grammar */}
      {/* <Route
        path='/grammar/beginner-to-pre-intermediate/:id'
        element={<DetailTopic />}
      />
      <Route
        path='/grammar/Intermediate-to-upper-intermediate/:id'
        element={<DetailTopic />}
      /> */}
      {/* detail level grammar */}

      {/* detail level voccabulary */}
      <Route path='/vocabulary/:levelSlug' element={<VocBTPI />} />
      <Route
        path='/vocabulary/:levelSlug/:topicSlug'
        element={<VoccabularyLesson />}
      />
      {/* <Route
        path='/voccabulary/beginner-to-pre-intermediate/:id'
        element={<VoccabularyLesson />}
      />
      <Route
        path='/voccabulary/Intermediate-to-upper-intermediate/:id'
        element={<VoccabularyLesson />}
      /> */}

      {/* <Route path='/meeting/:roomId' element={<CallPage />} /> */}
      <Route path='/meeting-room' element={<CallPage />} />
      <Route path='/meeting' element={<HomeGGMeet />} />
      <Route path='/schedule' element={<SchedulePage />} />
      <Route path='/Login' element={isLogin ? <NotFound /> : <Login />} />
      <Route path='/Register' element={isLogin ? <NotFound /> : <Register />} />

      {/* admin page */}
      <Route
        path='/admin'
        element={isLoginAdmin ? <NotFound /> : <LoginAdmin />}
      />
      <Route
        path='/dashboard'
        element={isLoginAdmin ? <HomeAdmin /> : <NotFound />}
        // element={<HomeAdmin />}
      />
      {/* <Route path='/update' element={<UpdateTopic />} /> */}
      <Route
        path='/types'
        element={isLoginAdmin ? <TypeTable /> : <NotFound />}
      />
      <Route
        path='/types/:slug'
        element={isLoginAdmin ? <TypeForm /> : <NotFound />}
      />
      <Route
        path='/types/:typeSlug/levels'
        element={isLoginAdmin ? <LevelTable /> : <NotFound />}
      />
      <Route
        path='/types/:typeSlug/levels/:slug'
        element={isLoginAdmin ? <LevelForm /> : <NotFound />}
      />
      <Route
        path='/types/:typeSlug/levels/:levelSlug/topics'
        element={isLoginAdmin ? <TopicTable /> : <NotFound />}
      />
      <Route
        path='/types/:typeSlug/levels/:levelSlug/topics/:slug'
        element={isLoginAdmin ? <TopicForm /> : <NotFound />}
      />
      <Route
        path='/types/:typeSlug/levels/:levelSlug/topics/:slug/tasks'
        element={isLoginAdmin ? <TopicForm /> : <NotFound />}
      />

      {/* admin page */}
    </Routes>
  );
};

export default Pages;
