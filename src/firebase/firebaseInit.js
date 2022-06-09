
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref as refStorage } from "firebase/storage";

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

export const storage = getStorage(initializeApp(firebaseConfig));

export const storageRef = refStorage(storage);
