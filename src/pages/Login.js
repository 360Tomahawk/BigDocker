import React, { useRef, useState } from "react";
import "../css/Login.css";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";

const Login = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const login = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    setLoading(true);
    setErrorMessage("");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setValid(true);
        history.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/wrong-password":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/too-many-requests":
            setErrorMessage(
              "Too many incorrect attempts, please try again later."
            );
            break;
          default:
            setErrorMessage(error.code);
            break;
        }
      })
      .then(function () {
        setLoading(false);
      });
  };

  return (
    <div className="page-content">
      <div className="auth-container">
        <br />
        <h1>Login</h1>
        <form onSubmit={login}>
          <br />
          <input
            className="input"
            type="email"
            placeholder="E-Mail"
            required
            ref={emailRef}
          />
          <br />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <br />
          <br />
          <div>{errorMessage}</div>
          <br />

          {!loading ? (
            <input className="input" type="submit" value="Login" />
          ) : (
            <div>Loading . . .</div>
          )}
        </form>
        <br />
        <div>
          Don't have an account?{" "}
          <span>
            <Link to="/Register">Register here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
