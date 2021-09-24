import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/" exact="true" style={{ textDecoration: "none" }}>
          <h1>Big Docker</h1>
        </Link>
      </header>
      <div className={classes["main-image"]}></div>
    </React.Fragment>
  );
};

export default Header;
