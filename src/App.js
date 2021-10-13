import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import Main from "./pages/Main";
import SageCells from "./pages/SageCells";
import Help from "./pages/Help";
import Storage from "./pages/Storage";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/Sandbox" exact component={SageCells} />
          <Route path="/Help" exact component={Help} />
          <Route path="/Storage" exact component={Storage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
