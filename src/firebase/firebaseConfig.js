// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnZDyINPWhHthw1jEUpSPesAxKqK4ICtQ",
  authDomain: "exploramas-5d967.firebaseapp.com",
  projectId: "exploramas-5d967",
  storageBucket: "exploramas-5d967.firebasestorage.app",
  messagingSenderId: "1077989007041",
  appId: "1:1077989007041:web:e1e361d33a0f84c768be40"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };