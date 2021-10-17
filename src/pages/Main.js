import React, { useState, useEffect } from "react";
import "../App.css";
import "../css/Main.css";
import { FaReact, FaDocker, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

import {Tour, Step} from "react-rtg";
import "react-rtg/build/index.css";

import firebase from "firebase";

const TourGuide = ({isOpen, setOpen}) => {
  return (
      <Tour isOpen={isOpen} 
            onClose={setOpen.bind(null, false)} 
            onOpen={setOpen.bind(null, true)}>
          <Step placement="center">
              <p>Welcome to BigDocker!</p>
          </Step>
          <Step selector=".darkmodeStuff" placement="bottom">
              <p>Here you can toggle dark mode</p>
          </Step>
          <Step selector=".loginButton" placement="right">
              <p>We recommend logging in for the best user experience</p>
          </Step>
          <Step selector=".btnHelp" placement="right">
              <p>Need help with coding? Click here!</p>
          </Step>
          <Step selector=".btnSandbox" placement="right">
              <p>Ready to start coding? Click here!</p>
          </Step>
          <Step placement="center">
              <p>Have a great time!</p>
          </Step>
      </Tour>
  )
};

const Main = () => {
  const [valid, setValid] = useState(false);
  const [user, setUser] = useState([]);
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setValid(true);
        const currentUserRef = firebase.firestore().collection("users");
        currentUserRef
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUser(doc.data());
            }
          });
      }
    });

    return () => {
      setUser([]);
    };
  }, []); // leave dependency empty

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setValid(false);
      });
  };
  
  return (
    <div className="page-content">
      <TourGuide isOpen={isTourOpen} setOpen={setIsTourOpen}/>
      <div className="mainText">
        <h1>Welcome to BigDocker</h1>
        <br />
        <p>New to the app?</p>
        <button className="menuButton" onClick={setIsTourOpen.bind(null, true)}>Get Started</button>
      </div>
      <div className="mainText">
        <br />
        {!valid ? (
          <div>
            <p>Have an account?</p>
            <Link to="/Login">
              <button className="menuButton loginButton">Login</button>
            </Link>
          </div>
        ) : (
          <div>
            <div>Welcome, {user.name}</div>
            <button className="menuButton" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
      <div className="poweredBy">
        Powered by
        <div className="iconHolder">
          <a
            href="https://www.docker.com/"
            target="_blank"
            rel="noreferrer"
            className="icon"
          >
            <FaDocker size={64} color="DodgerBlue" />
            <p>Docker</p>
          </a>
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noreferrer"
            className="icon"
          >
            <FaReact size={64} color="Cyan" />
            <p>React</p>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="icon"
          >
            <FaGithub size={64} />
            <p>Github</p>
          </a>
          <a
            href="https://www.sagemath.org/"
            target="_blank"
            rel="noreferrer"
            className="icon"
          >
            <img
              src="https://github.com/sagemath/website/blob/master/src/pix/icon_only/sagemath-icon-64.png?raw=true"
              alt="Sagemath"
            />
            <p>Sagemath</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
