import "../css/Sagecells.css";
import "../App.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { FaCaretDown } from "react-icons/fa";
import { ImArrowUp } from "react-icons/im";

const SageCells = () => {
  if (document.getElementById("link")) {
    document.getElementById("link").innerHTML = "";
  }
  if (document.getElementById("progress")) {
    document.getElementById("progress").innerHTML = "";
  }
  //change this variable to change maximum cells
  const cellLimit = 100;
  const [cellInfos, setCellInfos] = useState([]);
  // useState(1) means default already has 1 cell
  const [cellPos, setCellPos] = useState(1);

  //pagenav
  const [showScroll, setShowScroll] = useState(false);

  //file upload stuff
  // const [update, setUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState("");
  const [fileSize, setfileSize] = useState("");
  const [user, setUser] = useState([]);
  let reader;
  const storage = firebase.storage();

  const addCell = () => {
    if (cellPos < cellLimit - 1) {
      // increase the index by 1
      setCellPos(cellPos + 1);
    } else {
      alert(
        "Can't have more than " +
          cellLimit +
          " cells (this is a limitation by us)!"
      );
    }
  };

  const removeCell = () => {
    //If you have more than 1 cell...
    if (cellPos > 1) {
      setCellPos(cellPos - 1);
    } else {
      console.log("Can't remove first cell, clearing it instead");
      clearCell(0);
    }
  };

  const clearCell = (index) => {
    if (cellInfos.array != null) {
      let nodes = document.getElementById("cellHolder").children;
      cellInfos.array[index].editorData.setValue("");
      cellInfos.array[index].editorData.clearHistory();
      nodes[index].getElementsByClassName(
        "sagecell_output_elements"
      )[0].children[0].innerHTML = "";
      cellInfos.array[index].editorData.refresh();
    }
  };

  const loadCells = () => {
    for (let i = 0; i < cellLimit; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "compute");
      div.style.display = "none";
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
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    loadCells();
    window.addEventListener("scroll", () => {
      //arbitary value for now
      setShowScroll(window.scrollY > 100);
    });
  }, []); //this is empty so no dependancy

  //this is called whenever cellPos is updated
  useEffect(() => {
    let nodes = document.getElementById("cellHolder").children;
    //technically slow implementation luckily its not heavy
    for (let i = 0; i < cellLimit; i++) {
      if (i < cellPos) {
        nodes[i].style.display = "block";
      } else {
        nodes[i].style.display = "none";
        clearCell(i);
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
      console.log(temp);
      setNewFileName(temp[0].name);
      setfileSize(temp[0].size);
      setFiles(temp);
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("result").src = reader.result;
        document.getElementById("result").value = temp[0].name;
        console.log(reader);
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
      let task = "";
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("user is logged in");
          const childPath = `post/${
            firebase.auth().currentUser.uid
          }/${newFileName}`;
          task = storage.ref().child(childPath).put(files[0]);
          const taskProgress = (snapshot) => {
            if (document.getElementById("progress")) {
              document.getElementById("progress").innerHTML = `Transferred: ${
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              }%`;
              // console.log(`transferred: ${snapshot.bytesTransferred}`);
            }
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
        } else {
          console.log("user is not logged in");
          task = storage.ref().child(Math.random().toString(36)).put(files[0]);
          const taskProgress = (snapshot) => {
            if (document.getElementById("progress")) {
              document.getElementById("progress").innerHTML = `Transferred: ${
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              }%`;
              // console.log(`transferred: ${snapshot.bytesTransferred}`);
            }
          };

          const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
              savePostData(snapshot);
            });
          };
          const taskError = (snapshot) => {
            console.log(snapshot);
          };
          task.on("state_changed", taskProgress, taskError, taskCompleted);
        }
      });
    }
  };

  const savePostData = (file) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let key = generateKey();
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("uploads")
          .doc(key)
          .set({
            file: file,
            dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
            uid: key,
            fileSize: fileSize,
          })
          .then(function () {
            if (document.getElementById("link"))
              document.getElementById("link").innerHTML = file;
          });
      } else {
        if (document.getElementById("link"))
          document.getElementById("link").innerHTML = file;
      }
    });
  };

  const generateKey = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let autoId = "";
    for (let i = 0; i < 30; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  };

  return (
    <div className="page-content">
      <div className="editor-nav">
        <div className="dropdown">
          <button className="dropbtn">
            File
            <FaCaretDown />
          </button>
          <div className="dropdown-content">
            <button>Open notebook</button>
            <button>Export notebook</button>
            <button>Run all</button>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            Cells
            <FaCaretDown />
          </button>
          <div className="dropdown-content">
            <button onClick={addCell}>Add new cell</button>
            <button onClick={removeCell}>Remove last cell</button>
          </div>
        </div>
      </div>
      {user === null || user.length === 0 ? (
        <div>You have to be authenticated in order to use Firebase Storage</div>
      ) : (
        <div>
          <input placeholder="Upload Dataset" onClick={onUpload} id="result" />
          <button onClick={onChangeFile}>Upload Dataset </button>
          <span id="progress"></span>
          <br></br>
          <span id="link"></span>
        </div>
      )}
      <br></br>
      <br></br>
      Type your own computation below and click “Evaluate”.
      <div className="cellContainer" id="cellHolder"></div>
      {showScroll && (
        <button onClick={jumpToTop} className="btn_scrollTop">
          <ImArrowUp />
        </button>
      )}
    </div>
  );
};

export default SageCells;
