const { initializeApp } = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBuRKMSP4fTYZd-Ct50HAbQFWU3e3Uc-zY",
  authDomain: "bigdocker.firebaseapp.com",
  projectId: "bigdocker",
  storageBucket: "bigdocker.appspot.com",
  messagingSenderId: "289529382507",
  appId: "1:289529382507:web:8f35dd41f2ce3ac385132e",
};
const firebase = initializeApp(firebaseConfig);
test("signUp", () => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword("test3@test.com", "password")
    .then((response) => expect(response).toBeDefined());
});

test("login", () => {
  return firebase
    .auth()
    .signInWithEmailAndPassword("test2@test.com", "password")
    .then((response) => expect(response).toBeDefined());
});
