import React, { useContext, useRef } from "react";
import "../css/Login.css";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";

const Login = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const login = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    ctx.onLogin(email, password);
  };

  if (ctx.isLoggedIn) {
    history.push("/");
  }

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
          <div>{ctx.errorMessage}</div>
          <br />
          <input className="input" type="submit" value="Login" />
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
