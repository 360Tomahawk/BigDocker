import React, { useRef, useContext } from "react";
import "../css/Login.css";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";
const Register = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const register = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    ctx.onRegister(email, password, name);
  };

  if (ctx.isLoggedIn) {
    history.push("/");
  }

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
          <div>{ctx.errorMessage}</div>
          <br />

          <input className="input" type="submit" value="Register" />
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
