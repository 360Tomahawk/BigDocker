import classes from "../css/Sagecells.module.css";
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
  // useState(1) means default already has 1 cell
  const [cellPos, setCellPos] = useState(1);
  const [update, setUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  let reader;
  const storage = firebase.storage();

  const addCell = () => {
    if (cellPos < 99) {
      // increase the index by 1
      setCellPos(cellPos + 1);
    }
    else {
      console.log("Can't have more than 100 cells (this is a limitation by us)!");
    }
  };

  const removeCell = () => {
    //If you have more than 1 cell...
    if(cellPos > 1) {
      setCellPos(cellPos - 1);
    }
    else {
      console.log("Can't remove last cell!");
    }
  };

  const loadCells = (numberOfCells) => {
    for (let i = 0; i < numberOfCells; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "compute");
      if(i === 0) {
        div.style.display = "block";
      }
      else {
        div.style.display = "none";
      }
      document.getElementById("cellHolder").appendChild(div);
    }

    window.sagecell.makeSagecell({
      inputLocation: "div.compute",
      evalButtonText: "Evaluate",
      linked: true,
    });
  };

  const jumpToLast = () => {
    console.log("Jumping to cell number..." + (cellPos - 1) + ". Recall that cells start from 0!");
    let nodes = document.getElementById("cellHolder").children;
    nodes[cellPos - 1].scrollIntoView({behavior:'smooth'});
  };

  const jumpToTop = () => {
    document.documentElement.scrollIntoView({behavior:'smooth'});
  };

  // consider this a init function
  useEffect(() => {
    loadCells(100);
  }, []); //this is empty so no dependancy


  //this is called whenever cellPos is updated
  useEffect(() => {
    console.log("I have " + cellPos + " cells");
    let nodes = document.getElementById("cellHolder").children;
    //technically slow implementation luckily its not heavy
    for(let i = 0; i < 100; i++) {
      if (i <= cellPos) {
        nodes[i].style.display = "block";
      }
      else {
        nodes[cellPos].style.display = "none";
      }
    };
  },[cellPos]);


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
      <span id="link"></span>
      <br></br>
      Type your own computation below and click “Evaluate”.
      <div class="btn-group">
        <div class="cell-manipulator">
          <button onClick={addCell}>Add new cell</button>
          <button onClick={removeCell}>Remove last cell</button>
          <button onClick={jumpToLast}>Jump to last cell</button>
        </div>
        <div class="notebook-stuff">
          <button>Open notebook</button>
          <button>Run all</button>
          <button>Export notebook</button>
        </div>
      </div>
      <div className={classes.container}id="cellHolder"></div>
      <button onClick={jumpToTop}>Top</button>
    </React.Fragment>
  );
};

export default SageCells;
