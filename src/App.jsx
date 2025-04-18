import React from "react";
import { Outlet } from "react-router";

import Navigation from "./pages/Navigation/Navigation";
import Projects from "./pages/Projects/Projects";
// import Main from "./pages/Main/Main";

const App = () => {
  return (
    <>
      <div className="fixed flex h-full w-full font-exo-2">
        <Navigation />
        <Projects />
        {/* <Main /> */}
        <Outlet />
      </div>
    </>
  );
};

export default App;
