// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoXMW3IM-YzjXM45d5WN2eRdqnzQCZDlA",
  authDomain: "e-cell-smart-connect.firebaseapp.com",
  databaseURL: "https://e-cell-smart-connect-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "e-cell-smart-connect",
  storageBucket: "e-cell-smart-connect.firebasestorage.app",
  messagingSenderId: "895166155852",
  appId: "1:895166155852:web:25aac7be5a3138511cb8e9",
};

// ✅ Initialize Firebase App and Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Export db and useful database functions
export { db, ref, set, onValue };
