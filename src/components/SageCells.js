import classes from "../css/Sagecells.module.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCJO9dx2KjDfQvDHkpoxG3kZ49QyeiJGTc",
  authDomain: "bigdocker-csci321.firebaseapp.com",
  databaseURL:
    "https://bigdocker-csci321-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bigdocker-csci321",
  storageBucket: "bigdocker-csci321.appspot.com",
  messagingSenderId: "258512757467",
  appId: "1:258512757467:web:18fd0326ed6097963a62fe",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const SageCells = () => {
  //change this variable to change maximum cells
  const cellLimit = 100;
  const [cellInfos, setCellInfos] = useState([]);
  // useState(1) means default already has 1 cell
  const [cellPos, setCellPos] = useState(1);
  const [update, setUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  let reader;
  const storage = firebase.storage();

  const addCell = () => {
    if (cellPos < cellLimit - 1) {
      // increase the index by 1
      setCellPos(cellPos + 1);
    } else {
      console.log(
        "Can't have more than 100 cells (this is a limitation by us)!"
      );
    }
  };

  const removeCell = () => {
    //If you have more than 1 cell...
    if (cellPos > 1) {
      setCellPos(cellPos - 1);

      document
        .getElementsByClassName("compute")
        [cellPos - 1].getElementsByClassName(
          "sagecell_output_elements"
        )[0].children[0].innerHTML = "";
    } else {
      console.log("Can't remove last cell!");
    }
  };

  const loadCells = (loadAll) => {
    for (let i = 0; i < cellLimit; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "compute");
      div.style.display = loadAll ? "block" : "none";
      document.getElementById("cellHolder").appendChild(div);
    }

    setCellInfos(
      window.sagecell.makeSagecell({
        inputLocation: "div.compute",
        evalButtonText: "Evaluate this cell",
        linked: true,
        hide: ["fullScreen"], //hides the fullscreen button at the side
      })
    );
  };

  const jumpToTop = () => {
    document.documentElement.scrollIntoView({ behavior: "smooth" });
  };

  // consider this a init function
  useEffect(() => {
    loadCells(false);
  }, []); //this is empty so no dependancy

  //this is called whenever cellPos is updated
  useEffect(() => {
    //console.log("I have " + cellPos + " cells");
    let nodes = document.getElementById("cellHolder").children;
    //technically slow implementation luckily its not heavy
    for (let i = 0; i < cellLimit; i++) {
      if (i < cellPos) {
        nodes[i].style.display = "block";
      } else {
        nodes[i].style.display = "none";
        if (cellInfos.array != null) {
          cellInfos.array[i].editorData.setValue("");
          cellInfos.array[i].editorData.clearHistory();
          cellInfos.array[i].editorData.refresh();

          //need to remove sagecell_sessionOutput.sagecell_active only on the bad objects which is heavily nested: weijie pls assist
        }
      }
    }
    //scrolls to last, can comment out to disable the behaviour
    nodes[cellPos].scrollIntoView({ behavior: "smooth" });
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
        document.getElementById("result").value = "received";
        console.log(reader);
        setUpdate(true);
      };
      reader.readAsDataURL(temp[0]);
    };
    input.click();
    setUploading(true);
  };

  const onChangeFile = async () => {
    if (!uploading) {
      document.getElementById("progress").innerHTML =
        "Please select a dataset to upload first.";
      document.getElementById("result").focus();
    } else {
      let task = storage.ref().child(Math.random().toString(36)).put(files[0]);

      const taskProgress = (snapshot) => {
        document.getElementById("progress").innerHTML = `Transferred: ${
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }%`;
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
    }
  };
  const savePostData = (profilefile) => {
    console.log(profilefile);
    document.getElementById("link").innerHTML = profilefile;
  };
  return (
    <React.Fragment>
      <input placeholder="Upload Dataset" onClick={onUpload} id="result" />
      <button onClick={onChangeFile}>Upload Dataset </button>
      <span id="progress"></span>
      <br></br>
      <br></br>
      <span id="link"></span>
      <br></br>
      <br></br>
      Type your own computation below and click “Evaluate”.
      <div className={classes["btn-group"]}>
        <div className={classes["cell-manipulator"]}>
          <button onClick={addCell}>Add new cell</button>
          <button onClick={removeCell}>Remove last cell</button>
          <button onClick={jumpToTop}>Top</button>
        </div>
        <div className={classes["notebook-stuff"]}>
          <button>Open notebook</button>
          <button>Run all</button>
          <button>Export notebook</button>
        </div>
      </div>
      <div className={classes.container} id="cellHolder"></div>
    </React.Fragment>
  );
};

export default SageCells;
