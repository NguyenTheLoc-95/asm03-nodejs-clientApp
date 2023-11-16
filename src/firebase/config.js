// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth,FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH5k9Qq6TGSpqhm10hIk0dNZ3nAStfxDk",
  authDomain: "test-for-test-8a55a.firebaseapp.com",
  projectId: "test-for-test-8a55a",
  storageBucket: "test-for-test-8a55a.appspot.com",
  messagingSenderId: "1059293840407",
  appId: "1:1059293840407:web:24ffd8f87bcd7e1c508852"
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

