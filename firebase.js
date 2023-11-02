// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACPXsAfehKnxmizW4DMcoOpp-i9QqeuCQ",
  authDomain: "sereni-6a1b3.firebaseapp.com",
  databaseURL: "https://sereni-6a1b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sereni-6a1b3",
  storageBucket: "sereni-6a1b3.appspot.com",
  messagingSenderId: "823143049556",
  appId: "1:823143049556:web:2f736ab7c97ea83bcf80c1",
  measurementId: "G-HBVQREWYMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
const firedb = getFirestore(app);

if (auth.currentUser) {
  // User is signed in
} else {
  // Handle the case when the user is not signed in
}

export { db };
export { auth };
export { storage };
export { firedb };