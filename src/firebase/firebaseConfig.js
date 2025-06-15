// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // 👈 nuevo

const firebaseConfig = {
  apiKey: "AIzaSyBnZDyINPWhHthw1jEUpSPesAxKqK4ICtQ",
  authDomain: "exploramas-5d967.firebaseapp.com",
  projectId: "exploramas-5d967",
  storageBucket: "exploramas-5d967.firebasestorage.app",
  messagingSenderId: "1077989007041",
  appId: "1:1077989007041:web:e1e361d33a0f84c768be40"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // 👈 nuevo
const provider = new GoogleAuthProvider(); // 👈 nuevo

export { db, auth, provider }; // 👈 exportás todo lo necesario
