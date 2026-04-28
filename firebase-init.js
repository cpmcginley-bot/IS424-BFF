import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let firebaseConfig = {
  apiKey: "AIzaSyCY99HVQsaTBJBDmkfWVJMcbGqqlSIvlWA",
  authDomain: "badgerff.firebaseapp.com",
  projectId: "badgerff",
  storageBucket: "badgerff.firebasestorage.app",
  messagingSenderId: "19842084515",
  appId: "1:19842084515:web:7f52ab2af3013c8e829916",
  measurementId: "G-W6DSY0439R",
};

let app = initializeApp(firebaseConfig);
let auth = getAuth(app);
let db = getFirestore(app);

window.BFFFirebase = { app, auth, db };
