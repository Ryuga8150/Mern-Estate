// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env);
// console.log(process.env);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // apiKey: "AIzaSyCoO6NpPjaEaM7E1SRHI7R9si1yO0WnV1g",
  authDomain: "mern-estate-ad390.firebaseapp.com",
  projectId: "mern-estate-ad390",
  storageBucket: "mern-estate-ad390.appspot.com",
  messagingSenderId: "991624583150",
  appId: "1:991624583150:web:f2704f192e03be772ae0ff",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
