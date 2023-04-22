import { React, Fragment } from "react";
import Header from "../../components/Headers/Header";
import Footer from "../../components/Footer/Footer";
import BookMeetingPages from "../../components/BookingMeeting/BookingMeeting";

export default function BookMeetingPage() {
  return (
    <Fragment>
      <Header />
      <BookMeetingPages />
      <Footer />
    </Fragment>
  );
}
