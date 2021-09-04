import React, { useState } from "react";
import Main from "./components/Main";
import SageCells from "./components/SageCells";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>

      <Route path="/SageCells">
        <SageCells />
      </Route>
    </Switch>
  );
}

export default App;
