import React, { useState, useEffect } from "react";

const SageCells = () => {
  const [cellPos, setCellPos] = useState(0);

  const addCell = () => {
    let nodes = document.getElementById("cellHolder").children;
    // set the display to show based on the current cellpos
    nodes[cellPos].style.display = "block";
    // increase the index by 1
    setCellPos(cellPos + 1);
  };

  const deleteCell = (cellInfo) => {
    //TODO: PROPERLY GET THE CELLINFO
  };

  const loadCells = (numberOfCells) => {
    for (let i = 0; i < numberOfCells; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "compute");
      div.style.display = "none";
      document.getElementById("cellHolder").appendChild(div);
    }

    let cellStuff = window.sagecell.makeSagecell({
      inputLocation: "div.compute",
      evalButtonText: "Evaluate",
      linked: true
    });
    console.log(cellStuff);
  };

  // this is similar to page onload, runs only once on the page
  useEffect(() => {
    loadCells(100);

    //set first cell to show
    var cellHolderDiv = document.getElementById("cellHolder");
    cellHolderDiv.children[0].style.display = "block";
    setCellPos(cellPos + 1);

    var childCount = cellHolderDiv.childElementCount;
    console.log("number of cells created: " + childCount);
  }, []);

  return (
    <React.Fragment>
      <div>Type your own Sage computation below and click “Evaluate”.
      <br></br>
      <button onClick={addCell}>Add new cell</button>
      </div>
      
      <div id="cellHolder"></div>

    </React.Fragment>
  );
};

export default SageCells;
