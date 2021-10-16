import React, { useState, useEffect } from "react";
import "../App.css";
import "../css/Storage.css";
import firebase from "firebase";
import { Link } from "react-router-dom";

const Storage = () => {
  const [valid, setValid] = useState(false);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUserRef = firebase.firestore().collection("users");
        currentUserRef
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
          });
      } else {
        setValid(false);
      }
    });
  }, []);

  const addSummary = (list) => {
    setSummary((prevList) => {
      return [list, ...prevList];
    });
  };
  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(4, 21);
  };
  return (
    <div className="page-content">
      {valid ? (
        <div>
          <div>These are the files that you have uploaded</div>
          <br />
          <br />
          <table>
            <tbody>
              <tr>
                <th>File Link</th>
                <th>Date Added</th>
              </tr>
              {summary.map((data) => (
                <tr key={data.file}>
                  <td className="link">{data.file}</td>
                  <td>{getDate(data.dateAdded["seconds"])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>This section is only available for logged in users<br/>
          <Link to="/Login">
                <button className="menuButton">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Storage;
