import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyATBaCJRK2Br8ZR71a1GnaGI-3JbqBCAFc",
  authDomain: "add-web-app-8e246.firebaseapp.com",
  databaseURL: "https://add-web-app-8e246-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "add-web-app-8e246",
  storageBucket: "add-web-app-8e246.firebasestorage.app",
  messagingSenderId: "657660019260",
  appId: "1:657660019260:web:c2fb337707c4ef65a33939"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);