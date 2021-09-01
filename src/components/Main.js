import { Redirect, Link } from "react-router-dom";
import classes from "../css/Main.module.css";
const Main = () => {
  return (
    <div className={classes.container}>
      <div className="content">
        <div className={classes.help}>Guide</div>
        <h1>Big Docker</h1>
        <button className={classes.defaultButton}>Read .ipynb file</button>
        <Link to="/SageCells" exact="true">
          <button className={classes.defaultButton}>Code yourself</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
