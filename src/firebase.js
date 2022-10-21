// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA79H18F49RfTesIOTDwHTSKzxhULvQV5g",
  authDomain: "crud-web2-3a954.firebaseapp.com",
  projectId: "crud-web2-3a954",
  storageBucket: "crud-web2-3a954.appspot.com",
  messagingSenderId: "569322339134",
  appId: "1:569322339134:web:28a29d8b0769e07238ca6f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}