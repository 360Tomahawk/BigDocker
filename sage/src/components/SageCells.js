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
    div.setAttribute("id", "testing");
    document.getElementById("test").appendChild(div);
  };
  useEffect(() => {
    let down = document.getElementById("testing");
    down.innerhtml = "";
    down.removeAttribute("class");
    down.setAttribute("class", "compute");
    document.getElementById("test").appendChild(down);

    window.sagecell.makeSagecell({
      inputLocation: "div.compute",
      evalButtonText: "Evaluate",
      linked: true,
    });
    console.log("called");
    
    down.innerhtml = "";
  }, [cells]);

  return (
    <React.Fragment>
      <div id="test">
        Type your own Sage computation below and click “Evaluate”.
        <div class="compute" id="testing"></div>
        <div class="compute" id="testing"></div>
      </div>
      <button onClick={add}>Add new cell</button>
    </React.Fragment>
  );
};

export default SageCells;
