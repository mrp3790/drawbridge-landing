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

// Simple helper function to add emails to waitlist
const addEmailToWaitlist = async (email) => {
  try {
    // Importing here to reduce bundle size
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    
    // Create a simpler document structure
    const docData = {
      email: email,
      date: new Date().toISOString(),
      createdAt: serverTimestamp()
    };
    
    // Add with explicit collection path
    const docRef = await addDoc(collection(db, "waitlist"), docData);
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  }
};

export { db, addEmailToWaitlist };
