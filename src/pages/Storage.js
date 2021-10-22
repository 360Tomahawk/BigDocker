import React, { useState, useEffect } from "react";
import "../App.css";
import "../css/Storage.css";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { FaCopy, FaTrashAlt } from "react-icons/fa";

const Storage = () => {
  const [summary, setSummary] = useState([]);
  const [valid, setValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSummary([]);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("uploads")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              addSummary(doc.data());
            });
          })
          .then(function () {
            setValid(true);
            setIsLoaded(true);
          });
      } else {
        setValid(false);
        setIsLoaded(true);
      }
    });
  }, []);

  const addSummary = (list) => {
    setSummary((prevList) => {
      return [list, ...prevList];
    });
  };
  const getDate = (date) => {
    if (date === null) {
      return 0;
    } else {
      return new Date(date * 1000).toString().substring(4, 21);
    }
  };

  const onClickLink = (value, id) => {
    document.getElementById(id).innerHTML = "Link Copied!";
    navigator.clipboard.writeText(value);
  };

  const deleteFile = (id, file) => {
    let res = file.split("?alt=");
    res = res[0].split("%2F");

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("uploads")
          .doc(id)
          .delete()
          .then(function () {
            const storage = firebase.storage();
            const ref = storage
              .ref()
              .child("post/" + user.uid + "/" + res[2])
              .delete();
          })
          .then(function () {
            window.location.reload(false);
          });
      }
    });
  };

  const resetToolTipText = (event) => {
    document.getElementById(event).innerHTML = "Click to copy link";
  };

  const getFileName = (link) => {
    let res = link.split("wat2%2F");
    let res2 = res[1].split("?alt=media");
    let replace = res2[0].replaceAll("%20", " ");
    return replace;
  };
  if (!isLoaded) {
    return (
      <div className="page-content">
        <div>Loading . . .</div>
      </div>
    );
  }
  return (
    <div className="page-content">
      {valid ? (
        summary.length === 0 ? (
          <div>
            <h2>My Uploads</h2>
            <br />
            <div>You have not uploaded any files yet.</div>
          </div>
        ) : (
          <div>
            <h2>My Uploads</h2>
            <br />
            <br />
            <table>
              <tbody>
                <tr>
                  <th>File Name</th>
                  <th>Date Added</th>
                  <th>File Size</th>
                  <th>Copy Link</th>
                  <th>Delete File</th>
                </tr>
                {summary.map((data, index) => (
                  <tr key={data.file}>
                    <td className="link " id={data.file}>
                      {getFileName(data.file)}
                    </td>
                    <td>{getDate(data.dateAdded["seconds"])}</td>
                    <td>{data.fileSize} bytes</td>
                    <td className="tdLink">
                      <span className="tooltip">
                        <FaCopy
                          size={24}
                          // onMouseOver={resetToolTipText}
                          onClick={() =>
                            onClickLink(data.file, index + "tooltip")
                          }
                          onMouseOver={() =>
                            resetToolTipText(index + "tooltip")
                          }
                        />
                        <span className="tooltiptext" id={index + "tooltip"}>
                          Click to copy link
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="tooltip">
                        <FaTrashAlt
                          size={24}
                          onClick={() => deleteFile(data.uid, data.file)}
                        />
                        <span className="tooltiptext" id={index + "tooltip"}>
                          Click to delete
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>
          This section is only available for logged in users
          <br />
          <br />
          <Link to="/Login">
            <button className="menuButton">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Storage;
