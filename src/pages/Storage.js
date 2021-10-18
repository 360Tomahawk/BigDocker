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
