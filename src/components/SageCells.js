import React from "react";

export default class SageCells extends React.Component{

  constructor() {
    super();
    this.state = {
      numCells: 0, //default number of cells??
    }
  }

  addCell = () => {
    
    var div = document.createElement("div");
    div.setAttribute("class", "compute");
    document.getElementById("cellHolder").appendChild(div);

    window.sagecell.makeSagecell({inputLocation: 'div.compute',
                        evalButtonText: 'Evaluate',
                        linked: true});

    this.setState({numCells: this.state.numCells + 1});
  }

  deleteCell = (cellAtPos) => {
      this.setState({numCells: this.state.numCells - 1});
      window.sagecell.deleteSagecell(this.state.cellInfo[cellAtPos]);
      this.state.cellInfo.splice(cellAtPos, 1);
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
