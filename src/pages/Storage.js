import React, { useState, useEffect } from "react";
import "../App.css";
import "../css/Storage.css";
import firebase from "firebase";
import { Link } from "react-router-dom";

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
  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  const onClickLink = (value) => {
    copyLink(value.target.innerHTML);
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
          <div>You have not uploaded any files yet.</div>
        ) : (
          <div>
            <div>These are the files that you have uploaded</div>
            <br />
            <br />
            <table>
              <tbody>
                <tr>
                  <th>File Link</th>
                  <th>Date Added</th>
                  <th>Delete File</th>
                </tr>
                {summary.map((data) => (
                  <tr key={data.file}>
                    <td className="link hover" onClick={onClickLink}>
                      {data.file}
                    </td>
                    <td>{getDate(data.dateAdded["seconds"])}</td>
                    <td>
                      <button onClick={() => deleteFile(data.uid, data.file)}>
                        Delete
                      </button>
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
