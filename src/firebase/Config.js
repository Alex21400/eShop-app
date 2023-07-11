// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "eshop-109b2.firebaseapp.com",
  projectId: "eshop-109b2",
  storageBucket: "eshop-109b2.appspot.com",
  messagingSenderId: "485192607123",
  appId: "1:485192607123:web:dc006cf08d7b905dc4b466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

//krimiusma0@gmail.com -- firebase email
