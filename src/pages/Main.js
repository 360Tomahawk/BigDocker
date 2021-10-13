import "../App.css";
import "../css/Main.css";
import {FaReact, FaDocker} from "react-icons/fa";

const Main = () => {
  return (
    <div className="page-content">
        <div className="mainText">
          <h1>Welcome to BigDocker!</h1>
          <p>New to the app?</p>
          <button className="getStarted">Get Started</button>
        </div>
        <div className="poweredBy">
          This app is powered by:
          <div className="iconHolder">
            <a href="https://www.docker.com/" target="_blank" rel="noreferrer" className="icon">
              <FaDocker size={64} color="DodgerBlue"/>
              <p>Docker</p>
            </a>
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer" className="icon">
              <FaReact size={64} color="Cyan"/>
              <p>React</p>
            </a>
            <a href="https://www.sagemath.org/" target="_blank" rel="noreferrer" className="icon">
              <img src="https://github.com/sagemath/website/blob/master/src/pix/icon_only/sagemath-icon-64.png?raw=true" alt="Sagemath"/>
              <p>Sagemath</p>
            </a>
          </div>
        </div>

    </div>
  );
};

export default Main;
