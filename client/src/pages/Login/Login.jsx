import { React, Fragment } from "react";
import Header from "../../components/Headers/Header";
import Footer from "../../components/Footer/Footer";
import LoginComp from "../../components/Login/Login";

export default function Login() {
  return (
    <Fragment>
      <Header />
      <LoginComp />
      <Footer />
    </Fragment>
  );
}
