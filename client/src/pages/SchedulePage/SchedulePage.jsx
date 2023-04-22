import { React, Fragment } from "react";
import Header from "../../components/Headers/Header";
import Footer from "../../components/Footer/Footer";
import Schedule from "../../components/Schedule/Schedule";

export default function SchedulePage() {
  return (
    <Fragment>
      <Header />
      <Schedule />
      <Footer />
    </Fragment>
  );
}
