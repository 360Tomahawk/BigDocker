import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

import useDarkMode from "use-dark-mode";
import ToggleSwitch from "../components/ToggleSwitch";

import { IoMdMoon } from "react-icons/io";
import { FaUserCircle, FaDocker } from "react-icons/fa";

import { NavbarData } from "./NavbarData";
import "../css/Navbar.css";

import firebase from "firebase";

function Navbar() {
  const darkMode = useDarkMode(false);

  const [valid, setValid] = useState(false);
  const [user, setUser] = useState([]);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setValid(false);
      });
  };

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

  return (
    <>
      <IconContext.Provider value={{ color: "#fff", className: "iconstyle" }}>
        <div className="headerbar">
          <Link to="/" className="app-title">
            <FaDocker size={"2rem"} />
            BigDocker
          </Link>
          <div className="mainText">
            {!valid ? (
              <div>
                Have an account?
                <Link to="/Login">
                  <button className="menuButton loginButton">Login</button>
                </Link>
              </div>
            ) : (
              <div>
                <FaUserCircle/> Welcome, {user.name}
                <button className="menuButton" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
          <div className="darkmodeStuff">
            <IoMdMoon/>
            <ToggleSwitch
              id="darkmodetoggle"
              optionLabels={[]}
              small={true}
              checked={darkMode.value}
              onChange={darkMode.toggle}
            />
          </div>
        </div>
        <nav className="nav-menu">
          {/* Hide the sidebar if anything is clicked */}
          <ul className="nav-menu-items">
            {NavbarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className={"btn" + item.title}>
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
