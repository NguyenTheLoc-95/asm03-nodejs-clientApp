// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth,FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcLhrlm_Q4QiCEt98Zqjq-gi5eEnh4Kl8",
  authDomain: "asm03-nodejs-clientapp.firebaseapp.com",
  databaseURL: "https://asm03-nodejs-clientapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asm03-nodejs-clientapp",
  storageBucket: "asm03-nodejs-clientapp.appspot.com",
  messagingSenderId: "459402461741",
  appId: "1:459402461741:web:e80d0b09fee7153a88aea4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new FacebookAuthProvider();

const provider2 = new GoogleAuthProvider();

const provider3 = new GithubAuthProvider();
provider3.setCustomParameters({
  'login_hint': 'user@example.com'
});

export {auth, provider, provider2, provider3}

