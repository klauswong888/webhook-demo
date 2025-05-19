// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXCx68-cnKerYM14osxPAb6nsNYFgZrvQ",
  authDomain: "webhook-demo-912cd.firebaseapp.com",
  projectId: "webhook-demo-912cd",
  storageBucket: "webhook-demo-912cd.firebasestorage.app",
  messagingSenderId: "328728261186",
  appId: "1:328728261186:web:3df8aee6aacd22f962b3db",
  measurementId: "G-6YE4K6KFVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;