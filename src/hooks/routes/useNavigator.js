import React, { useEffect, useState } from "react";
import Navigator from "navigation-controller";
import ColoredLinearProgress from "../../components/common/LineProgress";

// Import all routes
import {
  routesWithPatern as _routesWithPatern,
  routesWithoutPatern as _routesWithoutPatern,
} from "./navigatorRoutes";

// Layout
import Layout from "../../components/layout";

// #Hooks
import {
  BrowserRouter,
  Route,
  useParams,
  useLocation,
  Navigate as Redirect,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import i18n from "../i18n";

// Router
const history = createBrowserHistory();

const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
if (path) {
  history.replace(path);
}

if (path) {
  history.replace(path); //path);
}

// fix Router with history bug
const rawListen = history.listen;
history.listen = (rawListener) => {
  return rawListen.call(history, ({ location }) => rawListener(location));
};

const UseRouter = (props) => {
  let Router = BrowserRouter;
  return (
    <Router history={history}>
      <Routes>
        {[
          "/:language/:key/:id",
          "/:key/:id",
          // "/:language/:key",
          "/:key",
          // ":/language",
          "/",
          "*",
        ].map((path, index) => (
          <Route
            key={index}
            path={path}
            element={<UseNavigator {...props} />}
          ></Route>
        ))}
      </Routes>
    </Router>
  );
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UseNavigator = (props) => {
  const [showLinearProgress, setShowLinearProgress] = useState(false);

  //   init navigator ref
  const homePageKey = "home";
  const errorPageKey = "not-found-404";
  const [navigatorRef, setnavigatorRef] = useState(undefined);
  let { language, key, id } = useParams();
  // const originalParams = { language, pageKey: key, id };
  // console.log(JSON.stringify(originalParams));

  // chack if is "/:language/:key" or "/:language"
  if (!language && props.i18n.options.resources[key]) {
    language = key;
    if (id) {
      key = id;
      id = undefined;
    } else {
      key = undefined;
    }
  }
  if (
    language &&
    props.i18n.options.resources[language] &&
    props.i18n.language !== language
  ) {
    localStorage.setItem("I18N_LANGUAGE", language);
    props.i18n.changeLanguage(language);
  }
  const activePageKey = key ? (id ? key + "-id" : key) : homePageKey;

  const routesWithPatern = _routesWithPatern.filter(
    (_route) => (_route.key = _route.key ?? _route.path.replace("/", ""))
  );
  const routesWithoutPatern = _routesWithoutPatern.filter(
    (_route) => (_route.key = _route.key ?? _route.path.replace("/", ""))
  );

  // if you use query like ?id=1    =>
  let query = useQuery();

  const allPagesProps = {
    // alwaysLive:true,
    app: props.app,
    activePageKey,
    navigatorRef,
    backgroundColor: "#fff",
    transitionIn: i18n.dir() === "ltr" ? "fadeInRight" : "fadeInLeft",
    transitionOut: i18n.dir() === "ltr" ? "fadeOutRight" : "fadeOutLeft",
    history,
    id,
    query: query,
    // timeAnimationInMS={1}
    t: (t) => {
      // // # helper to create local translate
      // if (!window.mapTranslate) window.mapTranslate = {};
      // window.mapTranslate[t]=t ;
      return props.t(t.trim());
    },
    i18n: props.i18n,
    tReady: props.tReady,
    isAuthProtected: true,
  };

  const [showLayout, setShowLayout] = useState(
    activePageKey
      ? routesWithPatern.find((x) => x.key && x.key === activePageKey) !==
          undefined
      : true
  );
  useEffect(() => {
    setShowLayout(
      routesWithPatern.find((x) => x.key && x.key === activePageKey) !==
        undefined
    );
    // Google Analytics
    props.app.state.GA?.send({
      hitType: activePageKey,
      page: routesWithoutPatern
        .concat(routesWithPatern)
        .find((x) => x.key && x.key === activePageKey),
    });
    // Update SPA state
    // HotjarForExample?.stateChange(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, key, id, activePageKey]);

  // console.log(activePageKey !== navigatorRef?.nowPage || showLinearProgress);

  return (
    <React.Fragment>
      {// activePageKey !== navigatorRef?.nowPage ||
      showLinearProgress 
      && false // remove to use showLinearProgress
      && <ColoredLinearProgress />
      }
      {routesWithoutPatern
        .concat(routesWithPatern)
        .find((x) => x.key && x.key === activePageKey) === undefined  ? (
        <Redirect to={`/${errorPageKey}`} />
      ) : (
        <div className={i18n.dir()}>
          {/* <Redirects301 {...originalParams} /> */}

          <Layout
            {...props}
            activePageKey={activePageKey}
            routes={routesWithoutPatern.concat(routesWithPatern)}
            withLayout={showLayout}
          >
            <Navigator
              ref={(ref) => {
                // TODO: save to global states
                setnavigatorRef(ref);
              }}
              // beforBack={(beckToPage) => {
              //   history.go(`/${beckToPage}`);
              //   return false;
              // }}
              homePageKey={homePageKey}
              routeKey={id ? key + "-id" : key}
              changeRoute={false}
              onError={(error) => {
                // console.error(error);
              }}
              errorPageKey={errorPageKey}
              beforChangePage={(goToPageKey) => {
                setShowLinearProgress(true);
                // setTimeout(() => {
                //   setShowLinearProgress(false);
                // }, 3000);
              }}
              onChangePage={(nowPageKey) => {
                setShowLinearProgress(false);
                //
              }}
            >
              {routesWithoutPatern
                .concat(routesWithPatern)
                .map((route, idx) => (
                  <route.component
                    path={route.path}
                    levelPage={route.levelPage}
                    component={route.component}
                    key={route.key ?? route.path.replace("/", "")}
                    // key={route.path}
                    isAuthProtected={true}
                    exact
                    {...allPagesProps}
                    {...route}
                  />
                ))}
            </Navigator>
          </Layout>
        </div>
      )}
    </React.Fragment>
  );
};

export default UseRouter;