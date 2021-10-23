import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

// components
import Main from "./pages/Main";
import SageCells from "./pages/SageCells";
import Help from "./pages/Help";
import Storage from "./pages/Storage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/Sandbox" exact component={SageCells} />
        <Route path="/Help" exact component={Help} />
        <Route path="/Storage" exact component={Storage} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
