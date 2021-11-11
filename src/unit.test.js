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
// import file from "./test.data";

test("signUp (email already in use)", () => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword("test3@test.com", "password")
    .then((response) => expect(response).toBeDefined());
});
test("signUp (weak password)", () => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword("test3@test.com", "123")
    .then((response) => expect(response).toBeDefined());
});
test("signUp (invalid email)", () => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword("test3.com", "123")
    .then((response) => expect(response).toBeDefined());
});
test("signUp (successful registration)", () => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword("test5@test.com", "123123")
    .then((response) => expect(response).toBeDefined());
});

// test("login (user does not exist)", () => {
//   return firebase
//     .auth()
//     .signInWithEmailAndPassword("test2@test.com", "password")
//     .then((response) => expect(response).toBeDefined());
// });
// test("login (invalid password)", () => {
//   return firebase
//     .auth()
//     .signInWithEmailAndPassword("test3@test.com", "123")
//     .then((response) => expect(response).toBeDefined());
// });
// test("login (invalid email)", () => {
//   return firebase
//     .auth()
//     .signInWithEmailAndPassword("test3", "123")
//     .then((response) => expect(response).toBeDefined());
// });
// test("login (successful login)", () => {
//   return firebase
//     .auth()
//     .signInWithEmailAndPassword("test3@test.com", "password")
//     .then((response) => expect(response).toBeDefined());
// });
