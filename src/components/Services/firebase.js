// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6EQ502yOnZqUb-D84V7I6NPHTcMO2wbA",
    authDomain: "aw-gioia-agustin.firebaseapp.com",
    databaseURL: "https://aw-gioia-agustin-default-rtdb.firebaseio.com",
    projectId: "aw-gioia-agustin",
    storageBucket: "aw-gioia-agustin.firebasestorage.app",
    messagingSenderId: "406720255064",
    appId: "1:406720255064:web:20dedaeaa199d06d46662d",
    measurementId: "G-K4KMTKQEYZ"
};

const app = initializeApp(firebaseConfig);

// Servicios
const auth = getAuth(app);
const db = getFirestore(app); // <-- inicializa Firestore

export { auth, db, onAuthStateChanged }; // <-- exporta db también
