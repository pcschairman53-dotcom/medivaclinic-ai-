import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// User provided configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIJjYkJs-pz5sw8i3QYjXKKgdWZEe7LCw",
  authDomain: "medivapathology.firebaseapp.com",
  databaseURL: "https://medivapathology-default-rtdb.firebaseio.com",
  projectId: "medivapathology",
  storageBucket: "medivapathology.firebasestorage.app",
  messagingSenderId: "193270851562",
  appId: "1:193270851562:web:2493a5aa21f34c6ff63493",
  measurementId: "G-YXE8WDZBPG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth();
