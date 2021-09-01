import React from "react";

export default class SageCells extends React.Component{

  constructor() {
    super();
    this.state = {
      numCells: 5
    }
  }

  addCell = () => {
    this.setState({numCells: this.state.numCells + 1});
    console.log("adding cell");
  }

  loadScript(name) { 
    var ns = document.createElement('script'); 
    ns.src=name; 
    document.getElementsByTagName('HEAD').item(0).appendChild(ns); 
  }

  getCells() {
    console.log("drawing cells");
    var cellArray = [];
    for (var i = 0; i < this.state.numCells; i++) {
      cellArray.push(
      <div className="compute" key={Math.random()}>
        <script type="text/x-sage">
        </script>
      </div>
      );
    }
    return cellArray;
  }

  render() {
    return (
      <div>
        <h1>{this.state.numCells}</h1>
        {this.getCells()}
        <button id="addCell" onClick={this.addCell}>Add new cell</button>
      </div>
    );
  }
};
