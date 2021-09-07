import classes from "../css/Main.module.css";
import React, { useState, useEffect } from "react";

const SageCells = () => {
  // useState(2) means the initialised value is 2
  const [cellPos, setCellPos] = useState(2);

  const add = () => {
    let nodes = document.getElementById("mainDiv").children;
    // set the display to block based on the index
    nodes[cellPos].style.display = "block";
    // increase the index by 1
    setCellPos(cellPos + 1);
  };

  const loadCells = () => {
    console.log("creating 100 cells");
    for (let i = 0; i < 100; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "compute");
      div.style.display = "none";
      document.getElementById("mainDiv").appendChild(div);
    }

    window.sagecell.makeSagecell({
      inputLocation: "div.compute",
      evalButtonText: "Evaluate",
      linked: true,
    });
  };

  // should only load this function once
  useEffect(() => {
    loadCells();

    // not sure why the initial value will be 102, thats why i set the cellPos to 2
    var c = document.getElementById("mainDiv").childElementCount;
    console.log("number of cells created: " + c);
  }, []);

  return (
    <React.Fragment>
      <button onClick={add}>Add new cell</button>
      <div id="mainDiv">
        Type your own Sage computation below and click “Evaluate”.
        <div class="compute"></div>
        <br></br>
      </div>
    </React.Fragment>
  );
};

export default SageCells;
