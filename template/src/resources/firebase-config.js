import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(firebaseApp); // Auth for authentication
export const database = getDatabase(firebaseApp); // Real-time database
export const firestore = getFirestore(firebaseApp); // Firestore

export const userRef = collection(firestore, 'Users');
export const homesRef = collection(firestore, 'Homes');

export default firebaseApp;