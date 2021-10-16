import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import firebase from "firebase";

import Main from "./pages/Main";
import SageCells from "./pages/SageCells";
import Help from "./pages/Help";
import Storage from "./pages/Storage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const firebaseConfig = {
  // apiKey: "AIzaSyCJO9dx2KjDfQvDHkpoxG3kZ49QyeiJGTc",
  // authDomain: "bigdocker-csci321.firebaseapp.com",
  // databaseURL:
  //   "https://bigdocker-csci321-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "bigdocker-csci321",
  // storageBucket: "bigdocker-csci321.appspot.com",
  // messagingSenderId: "258512757467",
  // appId: "1:258512757467:web:18fd0326ed6097963a62fe",

  apiKey: "AIzaSyDKQCkNcBA69C2G8ExWfyxz7UKGSp71YeQ",
  authDomain: "test-app-aedea.firebaseapp.com",
  databaseURL:
    "https://test-app-aedea-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-app-aedea",
  storageBucket: "test-app-aedea.appspot.com",
  messagingSenderId: "714129659570",
  appId: "1:714129659570:web:838d2cb8d64b11b8ab1bab",
  measurementId: "G-ZFDQVT7QXN",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

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
          <Route path="/Login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
