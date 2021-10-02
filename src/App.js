import React, { useState } from "react";
import Main from "./pages/Main";
import SageCells from "./pages/SageCells";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/SageCells" exact component={SageCells} />
          {/* <Route path="/Help" exact component={Help} />
          <Route path="/Storage" exact component={Storage} />
          <Route path="/Settings" exact component={Settings} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
