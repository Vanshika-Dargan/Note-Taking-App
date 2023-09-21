// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTYBdASNbvlpW-n_qsYehzcxmElk39cm8",
  authDomain: "oauthapp-a68af.firebaseapp.com",
  projectId: "oauthapp-a68af",
  storageBucket: "oauthapp-a68af.appspot.com",
  messagingSenderId: "778148225119",
  appId: "1:778148225119:web:2208ddd59f7da1441b3bea",
  measurementId: "G-N91HSYRNTJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth  = getAuth(app);