// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjsQ47CqoxN6iI9mRfrUmYg6a9kmgKeHs",
  authDomain: "test-ef18f.firebaseapp.com",
  projectId: "test-ef18f",
  storageBucket: "test-ef18f.appspot.com",
  messagingSenderId: "881822133409",
  appId: "1:881822133409:web:f3726cf426eaa5772054e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);