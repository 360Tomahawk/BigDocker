import classes from "../css/Main.module.css";
import React, { useState, useEffect } from "react";

const SageCells = () => {
  const [cells, setCells] = useState(1);

  const add = () => {
    setCells((cells) => cells + 1);
    cell();
    console.log(cells);
  };
  const cell = () => {
    var div = document.createElement("div");
    div.setAttribute("class", "compute");
    document.getElementById("test").appendChild(div);
  };
  useEffect(() => {
    window.sagecell.makeSagecell({
      inputLocation: "div.compute",
      evalButtonText: "Evaluate",
      linked: true,
    });
    console.log("called");
  }, [cells]);

  return (
    <React.Fragment>
      <div id="test">
        Type your own Sage computation below and click “Evaluate”.
        <div class="compute">
        </div>
        <br></br>
      </div>
      <button onClick={add}>Add new cell</button>
    </React.Fragment>
  );
};

export default SageCells;
