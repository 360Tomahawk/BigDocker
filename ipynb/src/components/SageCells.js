import classes from "../css/Main.module.css";
import React, { useState } from "react";

const SageCells = () => {

  const [cells, setCells] = useState(1);
  const cell = () => {
    for (let i = 0; i < cells; i++) {
      return (
        <div className="compute">
          <script type="text/x-sage"></script>
        </div>
      );
    }
  };
  const add = () => {
    setCells((cells) => cells + 1);
    console.log(cells);
  };
  return (
    <div id="test">
      Type your own Sage computation below and click “Evaluate”.
      <div className="compute">
        <script type="text/x-sage"></script>
      </div>
      <div className="compute">
        <script type="text/x-sage">
          @interact def f(n=(0,10)): print(2^n)
        </script>
      </div>
      <div>{cell()}</div>
      <br></br>
      <button onClick={add}>Add new cell</button>
    </div>
  );
};

export default SageCells;
