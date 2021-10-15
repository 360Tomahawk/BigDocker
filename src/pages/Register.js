import React, { useRef, useState } from "react";
import "../css/Login.css";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";

const Register = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const register = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email: email,
            name: name,
          })
          .then(function () {
            setValid(true);
            history.push("/");
          });
        console.log(result);
      });
  };

  return (
    <div className="page-content">
      <div className="auth-container">
        <br />
        <h1>Register</h1>
        <form onSubmit={register}>
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
            type="text"
            placeholder="Name"
            required
            ref={nameRef}
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
            <input className="input" type="submit" value="Register" />
          ) : (
            <div>Loading . . .</div>
          )}
        </form>
        <br />
        <div>
          Have an account?
          <span>
            <Link to="/Login"> Login here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
