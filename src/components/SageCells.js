import classes from "../css/Main.module.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCJO9dx2KjDfQvDHkpoxG3kZ49QyeiJGTc",
  authDomain: "bigdocker-csci321.firebaseapp.com",
  databaseURL: "https://bigdocker-csci321-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bigdocker-csci321",
  storageBucket: "bigdocker-csci321.appspot.com",
  messagingSenderId: "258512757467",
  appId: "1:258512757467:web:18fd0326ed6097963a62fe"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const SageCells = () => {
  // useState(2) means the initialised value is 2
  const [cellPos, setCellPos] = useState(0);
  const [update, setUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  let reader;
  const storage = firebase.storage();

  const addCell = () => {
    let nodes = document.getElementById("mainDiv").children;
    // set the display to block based on the index
    nodes[cellPos].style.display = "block";
    // increase the index by 1
    setCellPos(cellPos + 1);
  };

  const loadCells = (numberOfCells) => {
    for (let i = 0; i < numberOfCells; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "compute");
      div.style.display = "none";
      document.getElementById("cellHolder").appendChild(div);
    }

    let cells = window.sagecell.makeSagecell({
      inputLocation: "div.compute",
      evalButtonText: "Evaluate",
      linked: true,
    });
    console.log(cells);
  };

  // should only load this function once
  useEffect(() => {
    loadCells(100);

    // not sure why the initial value will be 102, thats why i set the cellPos to 2
    let cellHolder = document.getElementById("cellHolder")

    let nodes = cellHolder.children;
    nodes[0].style.display = "block";
    // increase the index by 1
    setCellPos(cellPos + 1);
  }, [cellPos]);

  const onUpload = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      let temp = e.target.files;
      setFiles(temp);
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("result").src = reader.result;
        setUpdate(true);
      };
      reader.readAsDataURL(temp[0]);
    };
    input.click();
  };

  const onChangeFile = async() => {
    setUploading(true);
    let task = storage.ref().child(Math.random().toString(36)).put(files[0]);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  const savePostData = (profilefile) => {
    console.log(profilefile);
    document.getElementById("link").innerHTML = profilefile;
  };
  return (
    <React.Fragment>
      <input placeholder="Upload Dataset" onClick={onUpload} id="result" />
      <button onClick={onChangeFile}>Upload Dataset </button>
      <br></br>
      <br></br>
      <span id="link"></span>
      <br></br>
      <button onClick={addCell}>Add new cell</button>
      <br></br>
      Type your own Sage computation below and click “Evaluate”.
      <br></br>
      <div className = {classes.container} id="cellHolder"></div>
    </React.Fragment>
  );
};

export default SageCells;
