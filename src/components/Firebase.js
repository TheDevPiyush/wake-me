// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0gAiD6R3Fie_9VbIB9z87uT8283yDj-8",
  authDomain: "wake-upp.firebaseapp.com",
  projectId: "wake-upp",
  storageBucket: "wake-upp.appspot.com",
  messagingSenderId: "567247535603",
  appId: "1:567247535603:web:eb2efb02259b6feb802686",
  measurementId: "G-5P7ZH960CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);