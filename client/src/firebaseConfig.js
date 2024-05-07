// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG7wsmGfpvrqHNMTq2t_OgGjEhVJeTDEk",
  authDomain: "yoke-call.firebaseapp.com",
  projectId: "yoke-call",
  storageBucket: "yoke-call.appspot.com",
  messagingSenderId: "48302699480",
  appId: "1:48302699480:web:a4a970243eedd4645838ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export
const auth = getAuth(app);
export default auth;
