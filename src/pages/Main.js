import React, { useState, useEffect } from "react";
import "../App.css";
import "../css/Main.css";
import { FaReact, FaDocker, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

import firebase from "firebase";

const Main = () => {
  const [valid, setValid] = useState(false);
  const [user, setUser] = useState([]);

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
      <div className="mainText">
        <h1>Welcome to BigDocker</h1>
        <br />
        <p>New to the app?</p>
        <button className="menuButton">Get Started</button>
      </div>
      <div className="mainText">
        <br />

        {!valid ? (
          <div>
            <p>Have an account?</p>
            <Link to="/Login">
              <button className="menuButton">Login</button>
            </Link>
          </div>
        ) : (
          <div>
            <div>Welcome, {user.name}</div>
            <button className="menuButton" onClick={logout}>
              Logout
            </button>
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
