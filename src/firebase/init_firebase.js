// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYPBNhHoVnqY79rFnk_RbnN6j-CiEPY-U",
  authDomain: "studied-reason-296216.firebaseapp.com",
  databaseURL: "https://studied-reason-296216-default-rtdb.firebaseio.com",
  projectId: "studied-reason-296216",
  storageBucket: "studied-reason-296216.appspot.com",
  messagingSenderId: "841681756188",
  appId: "1:841681756188:web:764d6655fab1be493bbfd9"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export default app;

