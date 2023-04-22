import { React, Fragment } from "react";
import Header from "../../components/Headers/Header";
import Footer from "../../components/Footer/Footer";
import RegisterComp from "../../components/Register/Register";

export default function Register() {
  return (
    <Fragment>
      <Header />
      <RegisterComp />
      <Footer />
    </Fragment>
  );
}
