import * as XLSX from "xlsx";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCJO9dx2KjDfQvDHkpoxG3kZ49QyeiJGTc",
  authDomain: "bigdocker-csci321.firebaseapp.com",
  projectId: "bigdocker-csci321",
  storageBucket: "bigdocker-csci321.appspot.com",
  messagingSenderId: "258512757467",
  appId: "1:258512757467:web:18fd0326ed6097963a62fe",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const upload = () => {
    console.log("test");
    firebase.firestore().collection("users").doc("data").set({
      test: "sample data",
    });
  };


  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];

          readExcel(file);
        }}
      />
      <input type="button" onClick={upload} />
    </div>
  );
}

export default App;
