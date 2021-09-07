import React from "react";

export default class SageCells extends React.Component{

  constructor() {
    super();
    this.state = {
      cellPos: 0 //default number of cells??
    }
  }

  spawnCells = (numberOfCells) => {
    for (let i = 0; i < numberOfCells; i++) {
      var div = document.createElement("div");
      div.setAttribute("class", "compute");
      div.style.display = "none";
      document.getElementById("cellHolder").appendChild(div);
    }

    window.sagecell.makeSagecell({inputLocation: 'div.compute',
                        evalButtonText: 'Evaluate',
                        linked: true});
  }

  componentDidMount() {
    this.spawnCells(100);
    var c = document.getElementById("cellHolder").childElementCount;
    console.log("number of cells created: " + c);
  }

  addCell = () => {
    var cellHolder = document.getElementById("cellHolder").children;
    cellHolder[this.state.cellPos].style.display = "block";
    this.setState({cellPos: this.state.cellPos + 1});
  }

  deleteCell = (cellAtPos) => {
      this.setState({cellPos: this.state.cellPos - 1});
      //window.sagecell.deleteSagecell(this.state.cellInfo[cellAtPos]);
      //this.state.cellInfo.splice(cellAtPos, 1);
  }

  render() {
    return (
      <div>
        Start off by clicking "Add new cell" below!
        <br></br>
        <button id="addCell" onClick={this.addCell}>Add new cell</button>
        <div id="cellHolder"></div>
      </div>
    );
  }
};
