import { React, Fragment } from "react";
import Header from "../../components/Headers/Header";
import Footer from "../../components/Footer/Footer";
import Profile from "../../components/Profile/Profile";

export default function ProfilePage() {
  return (
    <Fragment>
      <Header />
      <Profile />
      <Footer />
    </Fragment>
  );
}
