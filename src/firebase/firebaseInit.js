
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRIjigt7THgzqtJ0GXHp7bsIPd9LNTMvs",
  authDomain: "fireblogsah-4c2c8.firebaseapp.com",
  projectId: "fireblogsah-4c2c8",
  storageBucket: "fireblogsah-4c2c8.appspot.com",
  messagingSenderId: "379161091603",
  appId: "1:379161091603:web:e9fb42ca8c3db72829e9e6",
};

// init firebase
initializeApp(firebaseConfig);

// init & export firestore service
export const db = getFirestore();
// generate & export auth object
export const auth = getAuth();





// import * as firebase from "firebase/app";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBRIjigt7THgzqtJ0GXHp7bsIPd9LNTMvs",
//   authDomain: "fireblogsah-4c2c8.firebaseapp.com",
//   projectId: "fireblogsah-4c2c8",
//   storageBucket: "fireblogsah-4c2c8.appspot.com",
//   messagingSenderId: "379161091603",
//   appId: "1:379161091603:web:e9fb42ca8c3db72829e9e6",
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// // const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// // export { timestamp };
// export default firebaseApp.firestore;
