import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2hdGEe2KqxXmHpxFgJap4DIRgsS-AsrU",
  authDomain: "kl-sahyoga-app.firebaseapp.com",
  projectId: "kl-sahyoga-app",
  storageBucket: "kl-sahyoga-app.firebasestorage.app",
  messagingSenderId: "138622568473",
  appId: "1:138622568473:web:1d9617530c03a43eba0288",
  measurementId: "G-L2BR8LZKZT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
