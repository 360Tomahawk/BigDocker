import classes from "../css/Main.module.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDKQCkNcBA69C2G8ExWfyxz7UKGSp71YeQ",
  authDomain: "test-app-aedea.firebaseapp.com",
  projectId: "test-app-aedea",
  storageBucket: "test-app-aedea.appspot.com",
  messagingSenderId: "714129659570",
  appId: "1:714129659570:web:838d2cb8d64b11b8ab1bab",
  measurementId: "G-ZFDQVT7QXN",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const SageCells = () => {
  // useState(2) means the initialised value is 2
  const [cellPos, setCellPos] = useState(2);
  const [update, setUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  let reader;
  const storage = firebase.storage();

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

  const onUpload = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      console.log("selected image");
      let temp = e.target.files;
      setFiles(temp);
      console.log(temp);
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("result").src = reader.result;
        console.log("image loaded");
        setUpdate(true);
      };
      reader.readAsDataURL(temp[0]);
    };
    input.click();
  };

  const onChangePicture = async () => {
    setUploading(true);
    const uri = files[0];
    console.log(uri);

    console.log("change picture");
    // const childPath = `post/${userid}/${Math.random().toString(36)}`;

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
  const savePostData = (profilePicture) => {
    console.log(profilePicture);
    document.getElementById("link").innerHTML = profilePicture;
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(userid)
    //   .set({ profilePicture }, { merge: true })
    //   .then(function () {
    //     setUpdate(false);
    //   });
  };
  return (
    <React.Fragment>
      <input placeholder="Upload Dataset" onClick={onUpload} id="result" />
      <button onClick={onChangePicture}>Upload Dataset </button>
      <br></br>
      <br></br>
      <span id="link"></span>
      <br></br>
      <br></br>
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
