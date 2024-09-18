// Import the functions needed from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyANa7luOTAlmq0oRH6N6wtuse6E-wP3x-k",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "innovaportfolio.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "innovaportfolio",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "innovaportfolio.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "841901515202",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:841901515202:web:cab78f2b77dbf84060f65b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
export { auth };
