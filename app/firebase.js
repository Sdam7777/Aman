import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// INI CONFIG LU YANG TADI
const firebaseConfig = {
  apiKey: "AIzaSyBN_Naogrc5GLB7uA4RWd4sIBjw2hWqCqk",
  authDomain: "modern-news-web.firebaseapp.com",
  projectId: "modern-news-web",
  storageBucket: "modern-news-web.firebasestorage.app",
  messagingSenderId: "861937760330",
  appId: "1:861937760330:web:06611d13bc12f2ab0a4eb3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
