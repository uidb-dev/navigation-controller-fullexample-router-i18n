import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import i18n from 'i18next';

export default function Layout(props) {
  return (
    <>
      {props.withLayout && <Header {...props} />}
      {/* {!props.withOutContactAlert && <ContactAlert {...props} />} */}
      <div className={`${i18n.dir()}`}>    {props.children}</div>
      {props.withLayout && <Footer {...props} />}

    </>
  );
}
