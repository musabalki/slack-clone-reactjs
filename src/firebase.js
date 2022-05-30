
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg6nKcYrf4ph-NgK3MZsqB5r-z-tjT7nc",
  authDomain: "slack-clone-yt-f82dd.firebaseapp.com",
  projectId: "slack-clone-yt-f82dd",
  storageBucket: "slack-clone-yt-f82dd.appspot.com",
  messagingSenderId: "784221892969",
  appId: "1:784221892969:web:5590bb626237f6e792cdf8"
};

// Initialize Firebase
 const firebaseApp  = initializeApp(firebaseConfig);
 const db = getFirestore(firebaseApp);
 const auth = getAuth(firebaseApp);
 // const provider = new firebase.auth.GoogleAuthProvider()
 const provider = new GoogleAuthProvider();

export {auth,db,provider,firebaseApp};