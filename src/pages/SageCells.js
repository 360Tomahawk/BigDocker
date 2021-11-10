import "../css/Sagecells.css";
import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { FaCaretDown } from "react-icons/fa";
import { ImArrowUp } from "react-icons/im";
import { IoIosHelpCircle } from "react-icons/io";
import { SandboxGuide } from "../components/TourSteps";

import AuthContext from "../store/auth-context";
const SageCells = () => {
  const ctx = useContext(AuthContext);

  if (document.getElementById("link")) {
    document.getElementById("link").innerHTML = "";
  }
  if (document.getElementById("progress")) {
    document.getElementById("progress").innerHTML =
      "Select a dataset from the drop down to upload";
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
  const [files, setFiles] = useState([]);
  // const [newFileName, setNewFileName] = useState("");
  // const [fileSize, setfileSize] = useState("");
  let reader;
  const storage = firebase.storage();

  //TOUR GUIDE
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [auth, setAuth] = useState(false);

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
    if (cellInfos.array && cellInfos.array[index].editorData) {
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
    console.log("Loading cells");
    for (let i = 0; i < cellLimit; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "compute");
      div.style.display = "none";
      document.getElementById("cellHolder").appendChild(div);
    }

    (async () => {
      while (!window.hasOwnProperty("sagecell")) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      setCellInfos(
        window.sagecell.makeSagecell({
          inputLocation: "div.compute",
          evalButtonText: "Evaluate this cell",
          linked: true,
          hide: ["fullScreen"], //hides the fullscreen button at the side
        })
      );
      console.log("Loaded sagecell");
    })();
  };

  const updateCells = () => {
    console.log("updating cells");
    let nodes = document.getElementById("cellHolder").children;
    //technically slow implementation luckily its not heavy
    if (nodes) {
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
    }
  };

  const jumpToTop = () => {
    document.documentElement.scrollIntoView({ behavior: "smooth" });
  };

  // consider this a init function

  useEffect(() => {
    window.addEventListener("scroll", () => {
      //arbitary value for now
      setShowScroll(window.scrollY > 100);
    });
    loadCells();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //this is called whenever cellPos is updated
  useEffect(() => {
    updateCells();
  }, [cellPos]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        ctx.user.forEach((doc) => {
          if (doc.id === user.uid) {
            console.log(doc.id);
          }
        });
      }
    });
  }, [ctx.user]);
  const onUpload = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      let temp = e.target.files;
      console.log(temp);
      // setNewFileName(temp[0].name);
      nfn = temp[0].name;
      // setfileSize(temp[0].size);
      fs = temp[0].size;
      setFiles(temp);
      nf = temp;
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("result").src = reader.result;
        document.getElementById("result").value = temp[0].name;
        console.log(reader);
        ctx.setUploading(true);
        ch = true;
        document.getElementById("link").value = "";
      };
      reader.readAsDataURL(temp[0]);
      setTimeout(function () {
        console.log("test");
        onChangeFile();
      }, 2000);
    };
    input.click();
  };
  let nf = "";
  let ch = false;
  let nfn = "";
  let fs = "";
  const float2int = (value) => {
    return value | 0;
  };
  const onChangeFile = async () => {
    console.log(ctx.uploading);
    if (!ch) {
      document.getElementById("progress").innerHTML =
        "Please select a dataset to upload first.";
      document.getElementById("result").focus();
    } else {
      let task = "";
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(nfn);
          const childPath = `post/${firebase.auth().currentUser.uid}/${nfn}`;
          task = storage.ref().child(childPath).put(nf[0]);
          const taskProgress = (snapshot) => {
            if (document.getElementById("progress")) {
              document.getElementById(
                "progress"
              ).innerHTML = `Uploading: ${float2int(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )}%`;
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
    let key = generateKey();
    ctx.onSavePost(file, key, fs);
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

  const verifyEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(function () {
        // Verification email sent.
        alert("E-mail has been sent, please check your junk mail");
      })
      .catch(function (error) {
        alert(
          "An email has been sent, please check your junk mail or try again later"
        );
      });

    let interval = setInterval(function () {
      firebase
        .auth()
        .currentUser.reload()
        .then((ok) => {
          if (firebase.auth().currentUser.emailVerified) {
            setAuth(true);
            clearInterval(interval);
            ctx.setAuthenticated(true);
            document.getElementById("progress").innerHTML =
              "Select a dataset from the drop down to upload";
          }
        });
    }, 2000);
  };

  return (
    <div className="page-content">
      <SandboxGuide isOpen={isTourOpen} setOpen={setIsTourOpen} />
      <div className="editor-nav">
        <div className="dropdown">
          <button className="dropbtn filedropdown">
            File
            <FaCaretDown />
          </button>
          <div className="dropdown-content">
            <a href="http://localhost:3001">
              <button>Open notebook</button>
            </a>
            {!ctx.authenticated ? (
              <button>Upload file</button>
            ) : (
              <button onClick={onUpload}>Upload file</button>
            )}
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn cellsdropdown">
            Cells
            <FaCaretDown />
          </button>
          <div className="dropdown-content">
            <button onClick={addCell}>Add new cell</button>
            <button onClick={removeCell}>Remove last cell</button>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={setIsTourOpen.bind(null, true)}>
            Help
            <IoIosHelpCircle />
          </button>
        </div>
      </div>
      {!ctx.isLoggedIn ? (
        <div>You have to be authenticated in order to use Firebase Storage</div>
      ) : (
        <div>
          {!ctx.authenticated && !auth ? (
            <div>
              You have to verify your e-mail address first in order to upload
              <button className="menuButton" onClick={verifyEmail}>
                Verify
              </button>
            </div>
          ) : (
            <div>
              <input id="result" disabled hidden />
              {/* <button onClick={onChangeFile}>Upload Dataset </button> */}
              <span id="progress"></span>
              <br></br>
              <input disabled id="link" className={"input-link"} />
            </div>
          )}
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
