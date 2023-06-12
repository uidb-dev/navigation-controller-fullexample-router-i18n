// import React from "react";
// import { Redirect } from "react-router-dom";

//Pages
import HomePage from "../../pages/home";

import Error404 from "../../pages/error404";
import Page2 from "../../pages/page2";
import Page3 from "../../pages/page3";




// const ProjectItem = React.lazy(() => import("pages/our-projects/itemPage"));

const routesWithPatern = [
  // { path: "/login", component: Login1, levelPage: 0 },
  // { path: "/logout", component: () => <Redirect to="/login" />, levelPage: 1 },

  { path: "/home", component: HomePage, levelPage: 0, key: "home" },
  { path: "/page2", component: Page2, levelPage: 1, key: "page2" },
  { path: "/page3", component: Page3, levelPage: 2, key: "page3" },


  {
    path: "/not-found-404",
    component: Error404,
    levelPage: 99,
    key: "not-found-404"
  },

];
const routesWithoutPatern = [

];


export { routesWithPatern, routesWithoutPatern };


