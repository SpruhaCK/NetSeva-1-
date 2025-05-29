import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// const analytics = getAnalytics(app);
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALwgtdT-4AuXug69JFMuOF6D3qnkhhZ3k",
  authDomain: "netseva-fd9c8.firebaseapp.com",
  projectId: "netseva-fd9c8",
  storageBucket: "netseva-fd9c8.firebasestorage.app",
  messagingSenderId: "224786850515",
  appId: "1:224786850515:web:ead0c4285646bbbe5faa26",
  measurementId: "G-8D72G15KHN"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
