import React, { Component } from "react";

/* Bootstarp */
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// custom style
import "./assets/styles/global.scss";
import "./assets/styles/rtl.scss";
import "./assets/styles/ltr.scss";

// # Style for example poject
import "./App.css";

//
// import ReactGA from "react-ga4";
// import { hotjar } from "react-hotjar";

// #Hooks
// import i18n from "./i18n";
import { withTranslation } from "react-i18next";

import UseNavigator from "./hooks/routes/useNavigator";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // didMount: false,
      // direction: i18n.dir(),
      // animationFinish: true,
      // GA: null,
    };

    // this.onSplashFinish = this.onSplashFinish.bind(this);
  }

  componentDidMount() {
    // this.setState({ didMount: true });

    // Google Analytics
    if (this.props.isProduction) {
      // ReactGA.initialize(process.env.REACT_APP_GA);
      // hotjar.initialize(
      //   process.env.REACT_APP_hotjar_hjid,
      //   process.env.REACT_APP_hotjar_hjsv
      // );
      // this.setState({ GA: ReactGA,
      //   //  Hotjar: hotjar
      //    });
    }
  }

  // onSplashFinish = () => {
  //   this.setState({ animationFinish: true });
  // };

  render() {
    return (
      <React.Fragment>
        {/* Splash */}
        {/* <div
          className={`splashscreen-cover${
            this.state.animationFinish && this.state.didMount ? " hide" : ""
          }`}
        >
          <Splash onFinish={this.onSplashFinish} />
        </div> */}
        {/* <Suspense
          fallback={
             <div className={`splashscreen-cover`}>
              <Splash onFinish={this.onSplashFinish} />
             </div>
          }
        > */}
        <main>
          <UseNavigator app={this} {...this.props} />
        </main>
        {/* </Suspense> */}
      </React.Fragment>
    );
  }
}

export default withTranslation()(App);
