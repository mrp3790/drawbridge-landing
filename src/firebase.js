// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFnvhlpSEfdVbW9u5M0WUjH_db8iZUn8g",
  authDomain: "drawbridge-waitlist-c7b19.firebaseapp.com",
  projectId: "drawbridge-waitlist-c7b19",
  storageBucket: "drawbridge-waitlist-c7b19.firebasestorage.app",
  messagingSenderId: "186842377308",
  appId: "1:186842377308:web:811750727b1911db12ca99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
