// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuS-INEBbQeR8jCWXVt1qr_f9dzrCh5uY",
  authDomain: "react-demo-38cb3.firebaseapp.com",
  projectId: "react-demo-38cb3",
  storageBucket: "react-demo-38cb3.appspot.com",
  messagingSenderId: "659030951822",
  appId: "1:659030951822:web:b20b4f69c48084409a86df",
  measurementId: "G-4KFK02MR7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);