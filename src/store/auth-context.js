import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

const firebaseConfig = {
  // apiKey: "AIzaSyCJO9dx2KjDfQvDHkpoxG3kZ49QyeiJGTc",
  // authDomain: "bigdocker-csci321.firebaseapp.com",
  // databaseURL:
  //   "https://bigdocker-csci321-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "bigdocker-csci321",
  // storageBucket: "bigdocker-csci321.appspot.com",
  // messagingSenderId: "258512757467",
  // appId: "1:258512757467:web:18fd0326ed6097963a62fe",

  apiKey: "AIzaSyDKQCkNcBA69C2G8ExWfyxz7UKGSp71YeQ",
  authDomain: "test-app-aedea.firebaseapp.com",
  databaseURL:
    "https://test-app-aedea-default-rtdb.asia-southeast1.firebasedatabase.app",
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

const AuthContext = React.createContext({
  isLoggedIn: "",
  isLoaded: "",
  errorMessage: "",
  loading: "",
  userID: "",
  currentUser: [],
  userFiles: [],
  uploading: "",
  onLogout: () => {},
  onLogin: (email, password) => {},
  onRegister: (email, password, name) => {},
  onSavePost: (file, key, fileSize) => {},
  onFileDelete: (id, file, fileName) => {},
  setUploading: (bool) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const history = useHistory();

  // runs only one time when web page is loaded
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
        setIsLoaded(true);
        console.log("not logged in");
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((userObject) => {
            if (userObject.exists) {
              setCurrentUser(userObject.data());
              setIsLoggedIn(true);
              setIsLoaded(true);

              // get all files uploaded by current user (data is retrieve on real time)
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .collection("uploads")
                .onSnapshot((querySnapshot) => {
                  let prodArr = [];
                  querySnapshot.forEach((data) => {
                    prodArr.push(data.data());
                  });
                  setUserFiles(prodArr);
                });
            }
          });
      }
    });
  }, []);

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setIsLoggedIn(false);
      });
  };

  const loginHandler = (email, password) => {
    console.log("inside context loginHandler");
    setErrorMessage("");
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setErrorMessage("");
        history.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/wrong-password":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid Username/Password");
            break;
          default:
            break;
        }
      })
      .then((result) => {
        setLoading(false);
      });
  };

  const registerHandler = (email, password, name) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email: email,
            name: name,
          })
          .then(function () {
            setErrorMessage("");
            setIsLoggedIn(true);
          });
        console.log(result);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            setErrorMessage(error.message);
            break;
          case "auth/email-already-in-use":
            setErrorMessage(error.message);
            break;
          default:
            console.log(error.code);
            break;
        }
      });
  };

  const onDeleteFileHandler = (id, fileName) => {
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
            storage
              .ref()
              .child("post/" + user.uid + "/" + fileName)
              .delete();
          });
      }
    });
  };
  const onSavePostHandler = (file, key, fileSize) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("uploads")
          .doc(key)
          .set({
            file: file,
            dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
            uid: key,
            fileSize: fileSize,
          })
          .then(function () {
            // let confirm = window.confirm("Copy the file link to clipboard?");
            // if (confirm) {
            //   console.log(file);
            //   copyFile(file);
            if (document.getElementById("link")) {
              document.getElementById("result").value = "";
              document.getElementById("result").innerHTML = "";
              console.log("test", file);
              document.getElementById("link").value = file;
              setUploading(false);
            }
            // } else {
            //   setTimeout(() => {
            //     if (document.getElementById("link")) {
            //       document.getElementById("link").innerHTML = file;
            //     }
            //   }, 4000);
            // }
          });
      } else {
        // if (document.getElementById("link")) {
        //   document.getElementById("link").innerHTML = file;
        //   window.confirm("Please copy the file link provided below - ", file);
        // }
      }
    });
  };

  // const copyFile = (file) => {
  //   navigator.clipboard.writeText(file);
  // };

  const setUploadingHandler = (bool) => {
    setUploading(bool);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoaded: isLoaded,
        errorMessage: errorMessage,
        loading: loading,
        currentUser: currentUser,
        userFiles: userFiles,
        uploading: uploading,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: registerHandler,
        onSavePost: onSavePostHandler,
        onFileDelete: onDeleteFileHandler,
        setUploading: setUploadingHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
