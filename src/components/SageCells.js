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
  }

  //TODO REPLACE THIS FUNCTION
  renderCells() {
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

  componentDidUpdate() {
    // //run makeSageCell here
    // DONT FORGET TO CALL window. THIS GIVES ACCESS TO THE WHOLE SAGECELL SCRIPT

    window.sagecell.makeSagecell({inputLocation: 'div.compute',
                         evalButtonText: 'Evaluate',
                         linked: true});
  }

  render() {
    return (
      <div>
        <h1>{this.state.numCells}</h1>
        {/* TODO REPLACE THIS FUNCTION */}
        {this.renderCells()}
        <button id="addCell" onClick={this.addCell}>Add new cell</button>
      </div>
    );
  }
};
