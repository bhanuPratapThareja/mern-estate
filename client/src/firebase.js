// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jims-estate.firebaseapp.com",
  projectId: "jims-estate",
  storageBucket: "jims-estate.appspot.com",
  messagingSenderId: "636456201439",
  appId: "1:636456201439:web:56fd725d4a88974fefcd6a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);